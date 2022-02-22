import Api from '../../server/api';
import { currentToken, generalStatistics } from '../../utils/api/const';
import { IStatistics } from '../../utils/api/interfaces';
import { audioCall } from '../game-audioCall/difference/const';
import optional, { dailyStats } from './difference/const';
import UtilsStatistics from './utils';

class Statistics {
  static currentNewWords: string[] = [];

  static currentDay = new Date().getDate();

  statisticsPage: HTMLElement;

  statisticsBtn: HTMLElement;

  statisticsWrapper: HTMLElement;

  audioCallNewWords: HTMLElement;

  audioCallAnswers: HTMLElement;

  audioCallLongSeries: HTMLElement;

  audioCallStatisticsItemBtn: HTMLButtonElement;

  statMessage: HTMLElement;

  api: Api;

  constructor() {
    this.statisticsWrapper = document.getElementById(
      'statistics-game__container'
    );
    this.audioCallStatisticsItemBtn = document.getElementById(
      'audio-call__statistics-item'
    ) as HTMLButtonElement;
    this.statisticsPage = document.getElementById('main-statistics');
    this.api = new Api();
  }

  init() {
    this.addStartPage();
    this.audioCallNewWords = document.getElementById('audio-call__new-words');
    this.audioCallLongSeries = document.getElementById(
      'audio-call__long-series'
    );
    this.audioCallAnswers = document.getElementById('audio-call__answers');
    this.statMessage = document.getElementById('stat-message');
    this.audioCallLongSeries = document.getElementById(
      'audio-call__long-series'
    );

    this.audioCallStatisticsItemBtn.addEventListener(
      'click',
      this.openStatisticsPage.bind(this)
    );
  }

  static async getStatus() {
    const statistics = await Api.getStatistics(currentToken.id);

    if (typeof statistics === 'number' && currentToken.id) {
      Statistics.addCorrectData();
      Statistics.addStatistics();
    } else {
      const stat = statistics as IStatistics;
      Statistics.addStatistics();
      // Statistics.calculateStatistics(stat);
      dailyStats[Statistics.currentDay] = optional;
    }
  }

  async getStatistics() {
    const stat = await Api.getStatistics(currentToken.id);

    if (typeof stat !== 'number') {
      console.log(stat);
      this.drawCurrentData(stat);
    }

    console.log(1);
  }

  static async calculateStatistics(stats: IStatistics) {
    const statistics = (await Api.getStatistics(
      currentToken.id
    )) as IStatistics;

    if (statistics.optional[Statistics.currentDay].audioCall.betterSeries < audioCall.betterSeries) {
      optional.audioCall.betterSeries = audioCall.betterSeries;
    }

    optional.audioCall.correctAnswer =
      (statistics.optional[Statistics.currentDay].audioCall.correctAnswer + audioCall.correctAnswer) /
      2;

    optional.audioCall.currentNewWords =
      statistics.optional[Statistics.currentDay].audioCall.currentNewWords;

    if (audioCall.newWords === null) {
      Statistics.currentNewWords = stats.optional[Statistics.currentDay].audioCall.currentNewWords;
    } else {
      console.log(1);
      UtilsStatistics.getNewWords(
        audioCall.newWords,
        Statistics.currentNewWords
      );
    }

    Statistics.currentNewWords.forEach((element) => {
      if (!optional.audioCall.currentNewWords.includes(element)) {
        optional.audioCall.currentNewWords.push(element);
      }
    });

    console.log(optional);
  }

  openStatisticsPage() {
    this.getStatistics();
  }

  addStartPage() {
    this.statisticsWrapper.innerHTML = UtilsStatistics.renderGameStatistics();
  }

  static async addStatistics() {

    // dailyStats = optional;
    generalStatistics.optional = dailyStats;
    await Api.upsertStatistics(currentToken.id, generalStatistics);
    console.log(generalStatistics.optional);
  }

  drawCurrentData(stat: IStatistics) {
    console.log(stat.optional[Statistics.currentDay].audioCall.betterSeries);
    this.audioCallAnswers.textContent = `${String(
      stat.optional[Statistics.currentDay].audioCall.correctAnswer
    )}`;
    this.audioCallLongSeries.textContent = `${String(
      stat.optional[Statistics.currentDay].audioCall.betterSeries
    )}`;
    this.audioCallNewWords.textContent = `${String(
      stat.optional[Statistics.currentDay].audioCall.currentNewWords.length
    )}`;
  }

  static addCorrectData() {
    UtilsStatistics.getNewWords(audioCall.newWords, Statistics.currentNewWords);

    dailyStats[Statistics.currentDay].audioCall.betterSeries = audioCall.betterSeries;
    dailyStats[Statistics.currentDay].audioCall.correctAnswer = audioCall.correctAnswer;
    dailyStats[Statistics.currentDay].audioCall.currentNewWords = Statistics.currentNewWords;
  }
}

export default Statistics;
