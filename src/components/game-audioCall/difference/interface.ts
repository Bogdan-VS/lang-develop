import { IWord } from '../../../utils/api/interfaces';

interface ICountPageToChepter {
  min: number;
  max: number;
  wordsOrder: number[];
  minCountWords: number;
  maxCountWords: number;
  link: string;
}

export interface IAudioCall {
  newWords: IWord[];
  correctAnswer: number;
  betterSeries: number;
}

export default ICountPageToChepter;
