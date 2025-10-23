import React from 'react';
import { Choice, Language, LocalizedText, GameState } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface StoryUIProps {
  text: LocalizedText;
  choices: Choice[];
  onChoice: (choice: Choice) => void;
  lang: Language;
  gameState: GameState;
  isEndingScene?: boolean;
  onEndingSubmit: (input: string) => void;
  onOpenWorldAction: (action: string) => void;
  isLoading: boolean;
}

const StoryUI: React.FC<StoryUIProps> = ({
  text,
  choices,
  onChoice,
  lang,
  gameState,
  isEndingScene,
  onEndingSubmit,
  onOpenWorldAction,
  isLoading,
}) => {
  const [freeformInput, setFreeformInput] = React.useState('');

  const handleFreeformSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeformInput.trim() || isLoading) return;

    if (gameState.gameMode === 'openWorld') {
        onOpenWorldAction(freeformInput);
    } else if (isEndingScene) {
        onEndingSubmit(freeformInput);
    }
    setFreeformInput('');
  };
  
  const getPlaceholder = () => {
    if (gameState.gameMode === 'openWorld') {
        return lang === 'en' ? "What do you do next?" : "接下来做什么？";
    }
    if (isEndingScene) {
        return lang === 'en' ? "Your final words..." : "你最后的话语...";
    }
    return lang === 'en' ? "Your action..." : "你的行动...";
  };

  return (
    <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-2xl text-gray-200 flex flex-col h-full">
      <div className="prose prose-invert prose-lg overflow-y-auto flex-grow mb-4 custom-scrollbar">
        <p className="whitespace-pre-wrap">{text[lang]}</p>
      </div>
      <div className="mt-auto pt-4 border-t border-gray-700">
        {gameState.gameMode === 'openWorld' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {choices.map((choice, index) => (
                  <button
                      key={index}
                      onClick={() => onOpenWorldAction(choice.text[lang])}
                      disabled={isLoading}
                      className="bg-gray-800 text-left text-gray-300 px-4 py-3 rounded-md hover:bg-cyan-700 hover:text-white transition-all duration-200 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
                  >
                      {choice.text[lang]}
                  </button>
              ))}
            </div>
            <form onSubmit={handleFreeformSubmit} className="mt-4 flex gap-2">
              <input
                type="text"
                value={freeformInput}
                onChange={(e) => setFreeformInput(e.target.value)}
                placeholder={getPlaceholder()}
                className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={isLoading}
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : (lang === 'en' ? 'Act' : '行动')}
              </button>
            </form>
          </>
        ) : isEndingScene ? (
           <form onSubmit={handleFreeformSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={freeformInput}
              onChange={(e) => setFreeformInput(e.target.value)}
              placeholder={getPlaceholder()}
              className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : (lang === 'en' ? 'Act' : '行动')}
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {choices.map((choice, index) => (
              <button
                  key={index}
                  onClick={() => onChoice(choice)}
                  disabled={isLoading}
                  className="bg-gray-800 text-left text-gray-300 px-4 py-3 rounded-md hover:bg-cyan-700 hover:text-white transition-all duration-200 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
              >
                  {choice.text[lang]}
              </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryUI;
