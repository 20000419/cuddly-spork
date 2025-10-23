import React, { useState, useEffect, useCallback } from 'react';
import { Language, GameState, Choice, Scene, CompanionState, GameMode } from './types';
import { story } from './story/story';
import { generateImage, determineEnding, generateOpenWorldTurn } from './services/geminiService';
import SceneDisplay from './components/SceneDisplay';
import StoryUI from './components/StoryUI';
import LanguageSwitcher from './components/LanguageSwitcher';

const initialCompanionState: CompanionState = {
    silvyr: { present: false, status: 'healthy' },
    kaelen: { present: false, status: 'healthy' },
};

const initialGameState: GameState = {
  currentSceneId: 'start',
  hope: 0,
  storyStack: [],
  companions: initialCompanionState,
  gameMode: 'story',
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [lang, setLang] = useState<Language>('en');
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openWorldScene, setOpenWorldScene] = useState<Scene | null>(null);

  const currentScene = gameState.gameMode === 'openWorld' 
    ? openWorldScene || story[gameState.currentSceneId]
    : story[gameState.currentSceneId];

  const loadSceneImage = useCallback(async (imagePrompt: string) => {
    try {
      const imageUrl = await generateImage(imagePrompt);
      setCurrentImageUrl(imageUrl);
    } catch (error) {
      console.error("Failed to load scene image:", error);
      setCurrentImageUrl("https://picsum.photos/1280/720?grayscale");
    }
  }, []);

  const handleOpenWorldAction = useCallback(async (action: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const newStoryStack = [...gameState.storyStack, action];
    const turnData = await generateOpenWorldTurn(newStoryStack, action);
    
    const newScene: Scene = {
        text: turnData.text,
        imagePrompt: turnData.imagePrompt,
        choices: turnData.choices.map(c => ({ text: c.text, nextScene: '' })),
    };

    setGameState(prevState => ({ ...prevState, storyStack: [...newStoryStack, newScene.text[lang]] }));
    setOpenWorldScene(newScene);
    
    await loadSceneImage(newScene.imagePrompt);
    setIsLoading(false);
  }, [isLoading, gameState.storyStack, lang, loadSceneImage]);

  useEffect(() => {
    const manageScene = async () => {
      if (gameState.gameMode === 'openWorld' && gameState.currentSceneId === 'openWorldStart' && !openWorldScene) {
        // Handle transition TO open world mode.
        setIsLoading(true);
        const transitionScene = story['openWorldStart'];
        await loadSceneImage(transitionScene.imagePrompt);
        await handleOpenWorldAction(lang === 'en' ? "Let's begin our journey." : "让我们开始旅程吧。");
      } else if (gameState.gameMode === 'story') {
        // Handle standard STORY mode scene loading.
        setIsLoading(true);
        const sceneToLoad = story[gameState.currentSceneId];
        if (sceneToLoad) {
          await loadSceneImage(sceneToLoad.imagePrompt);
        }
        setIsLoading(false);
      }
    };
    manageScene();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.currentSceneId, gameState.gameMode]);

  const handleChoice = (choice: Choice) => {
    if (isLoading) return;

    if (choice.nextScene === 'start') {
        setGameState(initialGameState);
        setOpenWorldScene(null);
        setCurrentImageUrl(null);
        return;
    }

    if (choice.unlocksOpenWorld) {
        setGameState(prevState => ({
            ...prevState,
            gameMode: 'openWorld',
            currentSceneId: choice.nextScene,
            hope: prevState.hope + (choice.hopeEffect || 0),
            storyStack: [story[choice.nextScene].text[lang]],
        }));
        return;
    }

    setGameState(prevState => {
      const newHope = prevState.hope + (choice.hopeEffect || 0);
      return {
        ...prevState,
        currentSceneId: choice.nextScene,
        hope: newHope,
      };
    });
  };

  const handleEndingSubmit = async (input: string) => {
      if (!currentScene || !currentScene.isEndingScene) return;
      setIsLoading(true);

      const endingId = await determineEnding(input, gameState.hope);
      
      const endingSceneMap: { [key: string]: string } = {
          "ENDING_A": "endingA",
          "ENDING_B": "endingB",
          "ENDING_C": "endingC",
      };

      const nextSceneId = endingSceneMap[endingId] || "endingA";

      setGameState(prevState => ({
          ...prevState,
          currentSceneId: nextSceneId,
      }));
  }

  const switchLanguage = () => {
    setLang(prevLang => (prevLang === 'en' ? 'zh' : 'en'));
  };

  const StatusBar = () => (
    <div className="w-full max-w-6xl mx-auto mb-4 bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-lg p-3 flex justify-around text-center shadow-lg">
      <div>
        <span className="text-sm text-gray-400 uppercase tracking-wider">{lang === 'en' ? 'Hope' : '希望'}</span>
        <p className="text-2xl font-bold text-yellow-300">{gameState.hope}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen font-serif flex flex-col items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/dndbg/1920/1080')", filter: 'blur(8px) brightness(0.4)'}}></div>
        <div className="w-full max-w-6xl z-10 mx-auto">
            <header className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-200 tracking-wider" style={{ textShadow: '0 0 10px #00e5ff, 0 0 20px #00e5ff' }}>
                {lang === 'en' ? 'Song of Silverhair' : '银发之歌'}
            </h1>
            </header>
            
            <StatusBar />

            <main className="flex flex-col gap-6">
                <SceneDisplay imageUrl={currentImageUrl} isLoading={isLoading} />
                {currentScene && (
                    <StoryUI
                        text={currentScene.text}
                        choices={currentScene.choices}
                        onChoice={handleChoice}
                        lang={lang}
                        gameState={gameState}
                        isEndingScene={currentScene.isEndingScene}
                        onEndingSubmit={handleEndingSubmit}
                        onOpenWorldAction={handleOpenWorldAction}
                        isLoading={isLoading}
                    />
                )}
            </main>
        </div>
        <LanguageSwitcher currentLang={lang} onSwitch={switchLanguage} />
    </div>
  );
}

export default App;
