export interface IAudioCallStat {
  betterSeries: number;
  correctAnswer: number;
  currentNewWords: string[];
}

interface IOptional {
  audioCall: IAudioCallStat;
}
export interface IDate {
  [key: number]: IOptional
}

export default IOptional;
