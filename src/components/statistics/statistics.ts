import Api from '../../server/api';
import { currentToken, generalStatistics } from '../../utils/api/const';
import { IStatistics } from '../../utils/api/interfaces';
import { audioCall } from '../game-audioCall/difference/const';
import optional, { currentDay, dailyStats } from './difference/const';
import { IAudioCallStat } from './difference/interface';
import UtilsStatistics from './utils';

class Statistics {
  static currentNewWords: string[] = [];

  statisticsPage: HTMLElement;

  statisticsBtn: HTMLElement;

  statisticsWrapper: HTMLElement;

  audioCallNewWords: HTMLElement;

  audioCallAnswers: HTMLElement;

  audioCallLongSeries: HTMLElement;

  uadioCallStatisticsItemBtn: HTMLButtonElement;

  statMessage: HTMLElement;

  api: Api;

  constructor() {
    this.statisticsWrapper = document.getElementById(
      'statistics-game__container'
    );
    this.uadioCallStatisticsItemBtn = document.getElementById(
      'audio-call__statistics-item'
    ) as HTMLButtonElement;
    this.statisticsPage = document.getElementById('main-statistics');
    this.api = new Api();
  }

  init() {
    this.addStartPage();
    this.audioCallNewWords = document.getElementById('audio-call__new-words');
    this.audioCallAnswers = document.getElementById('audio-call__answers');
    this.statMessage = document.getElementById('stat-message');
    this.audioCallLongSeries = document.getElementById(
      'audio-call__long-series'
    );

    this.uadioCallStatisticsItemBtn.addEventListener(
      'click',
      this.openStatisticsPage.bind(this)
    );
  }

  openStatisticsPage() {
    if (currentToken.id) {
      this.getStatisticsById();
    } else {
      this.statMessage.classList.add('');
    }
    this.addCorrectData();
    if (currentToken.id) {
      this.statMessage.classList.remove('start-message__active');
      this.getStatisticsById();
    } else {
      this.statMessage.classList.add('start-message__active');
    }
  }

  addStartPage() {
    this.statisticsWrapper.innerHTML = UtilsStatistics.renderGameStatistics();
  }

  async addStatistics() {
    dailyStats[currentDay] = optional;
    generalStatistics.optional = dailyStats[currentDay];
    await this.api.apsertStatistics(currentToken.id, generalStatistics);
  }

  async getStatisticsById() {
    const statistics = await this.api.getStatistics(currentToken.id);

    if (typeof statistics === 'number') {
      if (optional.audioCall.currentNewWords.length > 0) {
        this.addCorrectData();
        this.addStatistics();
        const stat = await this.api.getStatistics(currentToken.id);

        const result = stat as IStatistics;
        this.drawCurrentData(result.optional.audioCall);
      } else {
        this.drawCurrentData(optional.audioCall);
      }
    } else {
      const result: IStatistics = statistics;

      if (audioCall.newWords === null) {
        UtilsStatistics.getWordsFromServer(
          result.optional.audioCall.currentNewWords,
          Statistics.currentNewWords
        );

        optional.audioCall.betterSeries =
          result.optional.audioCall.betterSeries;
        optional.audioCall.correctAnswer =
          result.optional.audioCall.correctAnswer;
        optional.audioCall.currentNewWords =
          result.optional.audioCall.currentNewWords;
        this.drawCurrentData(optional.audioCall);
      } else {
        this.addCorrectData();
        this.drawCurrentData(optional.audioCall);
      }
    }
  }

  drawCurrentData(data: IAudioCallStat) {
    this.audioCallAnswers.textContent = `${String(data.correctAnswer)}`;
    this.audioCallLongSeries.textContent = `${String(data.betterSeries)}`;
    this.audioCallNewWords.textContent = `${String(
      data.currentNewWords.length
    )}`;
  }

  addCorrectData() {
    UtilsStatistics.getNewWords(audioCall.newWords, Statistics.currentNewWords);

    optional.audioCall.betterSeries = audioCall.betterSeries;
    optional.audioCall.correctAnswer = audioCall.correctAnswer;
    optional.audioCall.currentNewWords = Statistics.currentNewWords;
  }
}

export default Statistics;
