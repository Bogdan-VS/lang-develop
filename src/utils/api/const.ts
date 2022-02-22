import { IDataWords, IStatistics, IToken } from './interfaces';

export const dataWords: IDataWords = {
  id: null,
  words: null,
};

export const currentToken: IToken = {
  token: null,
  id: null,
};

export const generalStatistics: IStatistics = {
  learnedWords: 0,
  optional: null,
};
