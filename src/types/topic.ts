export interface ITopic {
  topic: string;
  description: string;
  chapters: Chapter[];
}

interface Chapter {
  chapter: string;
  narration: string;
  questions: IQuestion[];
}

export interface IQuestion {
  question: string;
  options: string[];
  answer: string;
}
