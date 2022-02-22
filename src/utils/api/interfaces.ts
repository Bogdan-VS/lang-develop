import IOptional from '../../components/statistics/difference/interface';

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  correct?: boolean;
}

export interface IWords {
  words: IWord[];
}

export interface IDataWords {
  id?: string;
  words?: IWord[] | null;
}

export interface IUserData {
  name?: string;
  email: string;
  id?: string;
  password?: string;
  token?: string;
}

export interface IUserToken {
  message?: string;
  token?: string;
  refreshToken?: string;
  userId?: string;
  name?: string;
  status?: number;
}

export interface IUsersAllWords {
  difficulty: string;
  optional: {};
}

export interface IToken {
  token: string;
  id: string;
}

export interface IStatistics {
  learnedWords: number;
  optional: IOptional;
  status?: number;
}

export interface ISettings {
  wordsPerDays: number;
  optional: {};
}
