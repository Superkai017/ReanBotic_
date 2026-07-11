export type PageType =
  | 'landing'
  | 'auth'
  | 'path-selection'
  | 'dashboard'
  | 'courses'
  | 'level-1'
  | 'lesson'
  | 'simulator'
  | 'code-editor'
  | 'projects'
  | 'leaderboard'
  | 'profile';

export interface UserState {
  name: string;
  email: string;
  xp: number;
  gems: number;
  streak: number;
  hearts: number; // Max 5 hearts
  level: number;
  educationLevel: 'University' | 'High School' | null;
  completedLessons: string[]; // List of lesson IDs completed
  completedProjects: string[]; // List of project IDs completed
  unlockedLevels: number[]; // List of unlocked levels, e.g. [1]
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpRequired: number;
  isUnlocked: boolean;
  rewardGems: number;
}

export interface CourseLevel {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estTime: string;
  xpReward: number;
  isUnlocked: boolean;
  modulesCount: number;
}

export interface LearningModule {
  id: string;
  levelId: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estTime: string;
  progress: number; // 0 to 100
  lessonsCount: number;
  isCompleted: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'word-arrangement' | 'fill-blank' | 'true-false';
  prompt: string;
  options: string[];
  correctAnswer: string | string[]; // For word arrangement, it's an array of ordered words
  hint: string;
  explanation: string;
}

export interface LessonContent {
  id: string;
  moduleId: string;
  title: string;
  conceptTitle: string;
  introduction: string;
  whatIsIt: string;
  whyUseIt: string;
  howItWorks: string;
  realWorldApp: string;
  commonMistakes: string;
  visualType: 'led' | 'resistor' | 'breadboard' | 'voltage' | 'multimeter';
  quiz: QuizQuestion;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface SimItem {
  id: string;
  type: 'arduino' | 'breadboard' | 'led' | 'resistor' | 'button' | 'wire' | 'buzzer' | 'battery';
  name: string;
  x: number;
  y: number;
  color?: string;
  resistance?: number; // for resistor
}

export interface Connection {
  id: string;
  fromId: string;
  fromPin: string;
  toId: string;
  toPin: string;
  color: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Hard';
  xp: number;
  requiredLessons: string[];
  schematicUrl?: string;
  sampleCode: string;
}
