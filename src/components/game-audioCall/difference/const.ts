import ICountPageToChepter, { IAudioCall } from './interface';

const countPageToChepter: ICountPageToChepter = {
  min: 0,
  max: 29,
  wordsOrder: null,
  minCountWords: 0,
  maxCountWords: 19,
  link: 'https://rslang-learnwords.herokuapp.com/',
};

export const startGame = {
  start: false,
};

export const renderBtn = {
  next: false,
};

export const repeatGameState = {
  page: '0',
  chapter: '0',
};

export const stateWorkBook = {
  display: 'none',
};

export const audioCall: IAudioCall = {
  newWords: null,
  correctAnswer: null,
  betterSeries: null,
};

export const series = {
  general: 0,
  current: 0,
};

export const amount = ['1', '2', '3', '4', '5'];

export default countPageToChepter;
