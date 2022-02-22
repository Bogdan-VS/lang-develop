import IOptional from './interface';

const optional: IOptional = {
    audioCall: {
      betterSeries: 0,
      correctAnswer: 0,
      currentNewWords: [],
    },
};

export const dailyStats: Record<number, IOptional> = {};

export default optional;
