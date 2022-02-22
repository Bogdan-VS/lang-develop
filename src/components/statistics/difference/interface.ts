export interface IAudioCallStat {
  betterSeries: number;
  correctAnswer: number;
  currentNewWords: string[];
}

interface IOptional {
  audioCall: IAudioCallStat;
}

export default IOptional;
