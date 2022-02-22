import IOptional from './interface';

const optional: IOptional = {
  audioCall: {
    betterSeries: 0,
    correctAnswer: 0,
    currentNewWords: [],
  },
};

export const currentDay = new Date().getDate();
export const dailyStats: Record<number, IOptional> = {};

export default optional;
