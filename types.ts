export type Language = 'en' | 'zh';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Choice {
  text: LocalizedText;
  nextScene: string;
  hopeEffect?: number; // How this choice affects the hidden "Hope" score
  unlocksOpenWorld?: boolean; // New flag to trigger open world mode
}

export interface Scene {
  text: LocalizedText;
  imagePrompt: string;
  choices: Choice[];
  isEndingScene?: boolean; // Flag for the final free-text scene
}

export interface StoryGraph {
  [key: string]: Scene;
}

export interface CompanionState {
    silvyr: { present: boolean; status: 'healthy' | 'wounded' };
    kaelen: { present: boolean; status: 'healthy' | 'wounded' | 'incapacitated' };
}

export type GameMode = 'story' | 'openWorld';

export interface GameState {
  currentSceneId: string;
  hope: number;
  storyStack: string[]; // To handle narrative branches and returns
  companions: CompanionState;
  gameMode: GameMode;
}
