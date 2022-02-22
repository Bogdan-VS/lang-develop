import Api from '../../server/api';
import { IWord } from '../../utils/api/interfaces';
import { wordsPage } from '../../utils/workBook/const';
import countPageToChepter, {
  amount,
  renderBtn,
  repeatGameState,
  startGame,
  audioCall,
  series,
} from './difference/const';
import ProgressBar from './progress-bar';
import Statistic from './statistic';
import Utils from './utils';
import Learned from '../learned';
import WorkBook from '../workBook';

class AudioCall {
  static currentWordsCollection: IWord[];

  static numbersCollection: number[] = [];

  static counter = 0;

  static correctWordsCollection: string[] = [];

  static progress = 0;

  body: HTMLBodyElement;

  audioCallContainer: HTMLElement;

  audioCallBeginBtn: HTMLElement;

  audioCallClose: HTMLElement;

  audioCallStartBtn: HTMLButtonElement;

  startContainer: HTMLElement;

  playContainer: HTMLElement;

  audioCallSettings: HTMLElement;

  audioCallSettingsBtn: HTMLButtonElement;

  audioCallRegulation: HTMLElement;

  audioCallRegulationBtn: HTMLButtonElement;

  audioCallRegulationImgBtn: HTMLElement;

  audioCallDiscription: HTMLElement;

  audioCallSettingsChapter: HTMLElement;

  audioCallSettingsBtnImg: HTMLElement;

  chapterCollection: NodeListOf<HTMLInputElement>;

  api: Api;

  applySettingsBtn: HTMLButtonElement;

  audioCallCollectionItem: NodeListOf<Element>;

  audioCallPlayBtn: HTMLButtonElement;

  track: HTMLAudioElement;

  audioCallStatistic: HTMLElement;

  audioCallRepeatBtn: HTMLButtonElement;

  sucssesWordImg: HTMLImageElement;

  audioCallCollection: HTMLElement;

  audioCallRepeatText: HTMLElement;

  audioCallRepeatSucssesContainer: HTMLElement;

  audioCallSubtitleRepeatBtn: HTMLButtonElement;

  audioCallPlayArrow: HTMLElement;

  audioCallCanvas: HTMLCanvasElement;

  audioCallCanvasProcent: HTMLSpanElement;

  audioCallStatisticsStudied: HTMLElement;

  audioCallStatisticsNotStudies: HTMLElement;

  audioCallStatisticsTitle: HTMLElement;

  audioCallSwipeContainer: HTMLElement;

  audioCallStatisticsPage1: HTMLDivElement;

  audioCallStatisticsPage2: HTMLDivElement;

  audioCallStatisticsWordOrigin: NodeListOf<HTMLSpanElement>;

  audioCallStatisticsMark: NodeListOf<HTMLSpanElement>;

  audioCallStatisticsPageWrapper: NodeListOf<HTMLElement>;

  audioCallStatisticsBtnEnd: HTMLButtonElement;

  audioCallStatisticsBtnRepeat: HTMLButtonElement;

  audioCallPreloader: HTMLElement;

  workBookPage: HTMLElement;

  learned: Learned;

  mainStatistics: HTMLElement;

  audioCallBtn: HTMLButtonElement;

  constructor() {
    this.body = document.querySelector('body');
    this.api = new Api();
    this.applySettingsBtn = document.getElementById(
      'audio-call__ok-btn'
    ) as HTMLButtonElement;
    this.audioCallBtn = document.getElementById(
      'audioCall-Btn'
    ) as HTMLButtonElement;
    this.audioCallContainer = document.getElementById('audio-call');
    this.workBookPage = document.getElementById('workBookPage');
    this.mainStatistics = document.getElementById('main-statistics');
    this.audioCallRegulationBtn = document.getElementById(
      'audio-call__regulation-btn'
    ) as HTMLButtonElement;
    this.audioCallRegulation = document.getElementById('audio-call-regulation');
    this.audioCallStatisticsBtnEnd = document.getElementById(
      'statistics-btn-end'
    ) as HTMLButtonElement;
    this.audioCallDiscription = document.getElementById(
      'audio-call-discription'
    );
    this.audioCallRegulationImgBtn = document.getElementById(
      'audio-call__regulation-arrow'
    );
    this.audioCallPreloader = document.getElementById('preloader-page');
    this.audioCallStatisticsBtnRepeat = document.getElementById(
      'statistics-btn-repeat'
    ) as HTMLButtonElement;
    this.audioCallStatisticsNotStudies = document.getElementById(
      'call-statistics__not-studied'
    );
    this.audioCallStatisticsPage1 = document.querySelector(
      '.statistics__page-1'
    );
    this.audioCallStatisticsPage2 = document.querySelector(
      '.statistics__page-2'
    );
    this.audioCallStatisticsStudied = document.getElementById(
      'call-statistics__studied'
    );
    this.audioCallCanvas = document.getElementById(
      'audio-call__canvas'
    ) as HTMLCanvasElement;
    this.audioCallCanvasProcent = document.getElementById(
      'audio-call__canvas-procent'
    ) as HTMLSpanElement;
    this.audioCallSubtitleRepeatBtn = document.getElementById(
      'audio-call__subtitle-repeat-btn'
    ) as HTMLButtonElement;
    this.audioCallRepeatSucssesContainer = document.getElementById(
      'repeat-sucsses-container'
    );
    this.audioCallRepeatText = document.querySelector(
      '.audio-call__repeat-text'
    );
    this.sucssesWordImg = document.querySelector('.repeat-word-img');
    this.audioCallPlayArrow = document.querySelector('.audio-call__play-arrow');
    this.audioCallStatistic = document.getElementById('audio-call__statistics');
    this.audioCallSubtitleRepeatBtn.addEventListener(
      'click',
      this.repeatedWord.bind(this)
    );
    this.track = document.getElementById(
      'audio-call__track'
    ) as HTMLAudioElement;
    this.audioCallCollection = document.querySelector(
      '.audio-call__collection'
    );
    this.audioCallCollectionItem = document.querySelectorAll(
      '.audio-call__collection-item'
    );
    this.startContainer = document.getElementById('game-start-cont');
    this.audioCallSwipeContainer = document.querySelector('.swipe-container');
    this.audioCallStatisticsTitle = document.querySelector(
      '.call__statistics-title'
    );
    this.playContainer = document.getElementById('game-play-cont');
    this.audioCallStatisticsPageWrapper = document.querySelectorAll(
      '.statistics-page__wrapper-item'
    );
    this.audioCallRepeatBtn = document.getElementById(
      'audio-call__repeat-btn'
    ) as HTMLButtonElement;
    this.chapterCollection = document.querySelectorAll(
      '.settings-chapter__container-item'
    );
    this.audioCallSettingsBtnImg = document.querySelector('.audio-call__arrow');
    this.audioCallStatisticsWordOrigin = document.querySelectorAll(
      '.statistics-word__origin'
    );
    this.audioCallStatisticsMark =
      document.querySelectorAll('.statistics-mark');
    this.audioCallSettingsChapter = document.querySelector(
      '#audio-call__settings-chapter'
    );
    this.audioCallSettingsBtn = document.querySelector(
      '#audio-call__settings-btn'
    ) as HTMLButtonElement;
    this.audioCallSettings = document.getElementById('audio-call__setting');
    this.audioCallBeginBtn = document.getElementById(
      'callAudio-game'
    ) as HTMLElement;
    this.audioCallPlayBtn = document.getElementById(
      'audio-call__play-btn'
    ) as HTMLButtonElement;
    this.audioCallStartBtn = document.getElementById(
      'audio-call__start-btn'
    ) as HTMLButtonElement;
    this.audioCallClose = document.getElementById('audio-call__close');

    this.learned = new Learned();
  }

  init = () => {
    this.audioCallBeginBtn.addEventListener('click', this.openGame.bind(this));
    this.audioCallBtn.addEventListener('click', this.openGame.bind(this));
    this.audioCallClose.addEventListener('click', this.closeGame.bind(this));
    this.audioCallStatisticsBtnEnd.addEventListener(
      'click',
      this.closeGame.bind(this)
    );
    this.audioCallStatisticsBtnRepeat.addEventListener(
      'click',
      this.repeatGame.bind(this)
    );
    this.audioCallRegulationBtn.addEventListener(
      'click',
      this.openRegulation.bind(this)
    );
    document.addEventListener('keydown', this.checkKeyDown.bind(this));
    document.addEventListener('keydown', this.skipAnswer.bind(this));
    document.addEventListener('keydown', this.repeatAudio.bind(this));
    this.audioCallStartBtn.addEventListener('click', this.startGame.bind(this));
    this.audioCallCollection.addEventListener(
      'click',
      this.getAnswerToQuestion.bind(this)
    );
    this.audioCallStatisticsPage2.addEventListener(
      'click',
      this.playStatisticsSound.bind(this)
    );
    this.audioCallRepeatBtn.addEventListener(
      'click',
      this.repeatedWord.bind(this)
    );
    this.audioCallPlayBtn.addEventListener(
      'click',
      this.openNextRound.bind(this)
    );
    this.applySettingsBtn.addEventListener(
      'click',
      this.applySetting.bind(this)
    );
    this.audioCallSettingsBtn.addEventListener(
      'click',
      this.openChapter.bind(this)
    );
    this.audioCallSwipeContainer.addEventListener(
      'click',
      this.renderStatisticsPage.bind(this)
    );
  };

  openGame() {
    Utils.renderPage(this.startContainer, this.audioCallPreloader);
    setTimeout(() => {
      this.body.style.overflow = 'hidden';
      this.audioCallContainer.classList.remove('hide');
    }, 2000);
    if (this.workBookPage.classList.contains('hide')) {
      this.getWordsToPlay();
    } else {
      this.formationListWords(wordsPage.page, wordsPage.category, true);
      Utils.addAnimationWordsCollection(
        this.audioCallSettings,
        'audio-call__settings-disabled'
      );
    }

    startGame.start = true;
  }

  closeGame() {
    this.body.style.overflow = 'auto';
    this.audioCallContainer.classList.add('hide');
    Utils.addAnimationWordsCollection(
      this.audioCallSettings,
      'audio-call__settings-disabled'
    );

    if (
      this.audioCallRegulation.classList.contains(
        'audio-call__regulation-disabled'
      )
    ) {
      this.audioCallRegulation.classList.remove(
        'audio-call__regulation-disabled'
      );
    }

    if (
      this.audioCallCollection.classList.contains(
        'audio-call__collection-disabled'
      )
    ) {
      this.audioCallCollection.classList.remove(
        'audio-call__collection-disabled'
      );
    }

    if (this.audioCallPlayArrow.classList.contains('arrow-active')) {
      this.audioCallPlayArrow.classList.remove('arrow-active');
    }

    startGame.start = false;
    AudioCall.cleanDataGame();
  }

  static cleanDataGame() {
    AudioCall.correctWordsCollection.splice(
      0,
      AudioCall.correctWordsCollection.length
    );
    AudioCall.counter = 0;
    AudioCall.currentWordsCollection.splice(
      0,
      AudioCall.currentWordsCollection.length
    );
    AudioCall.numbersCollection.splice(0, AudioCall.numbersCollection.length);
    AudioCall.progress = 0;
  }

  repeatGame() {
    this.formationListWords(
      repeatGameState.page,
      repeatGameState.chapter,
      false
    );
    Utils.renderPage(this.playContainer, this.audioCallPreloader);

    setTimeout(() => {
      this.generationWord();

      Utils.updateStyleToGame(
        this.audioCallRepeatBtn,
        this.audioCallCollection,
        this.audioCallPlayArrow,
        this.audioCallRepeatSucssesContainer,
        this.audioCallPlayBtn
      );
    }, 2000);
    AudioCall.correctWordsCollection = [];
  }

  startGame() {
    Utils.renderPage(this.playContainer, this.audioCallPreloader);
    setTimeout(() => {
      if (this.workBookPage.classList.contains('hide')) {
        Utils.addAnimationWordsCollection(
          this.audioCallSettings,
          'audio-call__settings-disabled'
        );
        Utils.addAnimationWordsCollection(
          this.audioCallRegulation,
          'audio-call__regulation-disabled'
        );
      } else {
        Utils.addAnimationWordsCollection(
          this.audioCallRegulation,
          'audio-call__regulation-disabled'
        );
      }

      this.generationWord();
    }, 2000);
  }

  openChapter() {
    Utils.renderChapterState(
      this.audioCallSettingsChapter,
      this.audioCallSettingsBtnImg
    );
  }

  openRegulation() {
    Utils.addAnimationWordsCollection(
      this.audioCallDiscription,
      'audio-call__discription-active'
    );
    Utils.addAnimationWordsCollection(
      this.audioCallRegulationImgBtn,
      'audio-call__regulation-arrow-active'
    );
  }

  repeatAudio(event: KeyboardEvent) {
    if (event.code === 'KeyR' && startGame.start) {
      this.repeatedWord();
    }
  }

  async repeatedWord() {
    const audio = await Utils.getAudioTrack(
      AudioCall.currentWordsCollection[
        AudioCall.numbersCollection[AudioCall.counter - 1]
      ].audio
    );

    this.track.src = `${audio}`;
    this.track.play();
  }

  skipAnswer(event: KeyboardEvent) {
    if (event.code === 'Space' && startGame.start) {
      this.openNextRound();
    }
  }

  openNextRound() {
    if (AudioCall.counter < AudioCall.currentWordsCollection.length) {
      if (renderBtn.next) {
        Utils.addAnimationWordsCollection(
          this.audioCallPlayArrow,
          'arrow-active'
        );

        Utils.addAnimationWordsCollection(
          this.audioCallCollection,
          'audio-call__collection-disabled'
        );

        renderBtn.next = false;
      }

      Utils.addAnimationToRepeatWord(
        this.audioCallRepeatBtn,
        this.audioCallRepeatSucssesContainer
      );
      Utils.resetStyleAnswer();
      Utils.addAnimationWordsCollection(
        this.audioCallCollection,
        'audio-call__collection-active'
      );
      this.audioCallPlayBtn.style.color = '#fff';
      setTimeout(() => {
        this.generationWord();
        Utils.addAnimationWordsCollection(
          this.audioCallCollection,
          'audio-call__collection-active'
        );
      }, 1000);
    } else {
      Utils.addAnimationWordsCollection(
        this.audioCallPlayArrow,
        'arrow-active'
      );

      Utils.addAnimationWordsCollection(
        this.audioCallCollection,
        'audio-call__collection-disabled'
      );

      renderBtn.next = false;

      AudioCall.progress = Utils.getCorrectAnswer(
        AudioCall.correctWordsCollection,
        AudioCall.currentWordsCollection
      );

      AudioCall.counter = 0;
      Statistic.getStatisticToCorrectWors(
        this.audioCallStatisticsStudied,
        this.audioCallStatisticsNotStudies,
        this.audioCallStatisticsTitle,
        AudioCall.progress,
        AudioCall.correctWordsCollection,
        AudioCall.currentWordsCollection
      );
      Utils.renderPage(this.audioCallStatistic, this.audioCallPreloader);
      ProgressBar.progressMove(
        this.audioCallCanvas,
        this.audioCallCanvasProcent,
        AudioCall.progress
      );

      Statistic.removeStatisticsPage();
      Statistic.drawStatisticPage(
        this.audioCallStatisticsPage2,
        AudioCall.currentWordsCollection,
        AudioCall.correctWordsCollection
      );

      audioCall.betterSeries = series.general;
      audioCall.newWords = [...AudioCall.currentWordsCollection];
    }
  }

  applySetting() {
    this.getWordsToPlay();
    this.openChapter();
  }

  checkKeyDown(event: KeyboardEvent) {
    if (amount.includes(event.key) && startGame.start) {
      const wordElement = document.querySelectorAll(
        '.audio-call__collection-item'
      )[+event.key - 1] as HTMLElement;
      const word = wordElement.dataset.audioword;
      this.choseEvent();
      Utils.getAnswer(
        word,
        AudioCall.currentWordsCollection[
          AudioCall.numbersCollection[AudioCall.counter - 1]
        ].word,
        wordElement,
        this.track,
        AudioCall.correctWordsCollection,
        AudioCall.currentWordsCollection[
          AudioCall.numbersCollection[AudioCall.counter - 1]
        ]
      );
    }
  }

  getAnswerToQuestion(event: Event) {
    const target = (event.target as HTMLElement).closest(
      '.audio-call__collection-item'
    ) as HTMLElement;
    const word = target.dataset?.audioword;

    if (word) {
      this.choseEvent();
      Utils.getAnswer(
        word,
        AudioCall.currentWordsCollection[
          AudioCall.numbersCollection[AudioCall.counter - 1]
        ].word,
        target,
        this.track,
        AudioCall.correctWordsCollection,
        AudioCall.currentWordsCollection[
          AudioCall.numbersCollection[AudioCall.counter - 1]
        ]
      );
    }
  }

  choseEvent() {
    renderBtn.next = true;
    this.getSucssesWord();
    Utils.addAnimationWordsCollection(
      this.audioCallCollection,
      'audio-call__collection-disabled'
    );
    this.audioCallPlayBtn.style.color = '#fff0';
    this.audioCallPlayBtn.prepend(this.audioCallPlayArrow);
    Utils.addAnimationWordsCollection(this.audioCallPlayArrow, 'arrow-active');
  }

  playStatisticsSound(event: Event) {
    const target = (event.target as HTMLElement).closest(
      '.statistics-page2__btn'
    ) as HTMLElement;
    const track = target.dataset.statbtn;

    if (track) {
      Utils.repeatedWord(
        AudioCall.currentWordsCollection[+track].audio,
        this.track
      );
    }
  }

  async getSucssesWord() {
    const wordImgSrc = await Utils.getWordImg(
      AudioCall.currentWordsCollection[
        AudioCall.numbersCollection[AudioCall.counter - 1]
      ].image
    );

    this.audioCallRepeatText.textContent = `${
      AudioCall.currentWordsCollection[
        AudioCall.numbersCollection[AudioCall.counter - 1]
      ].word
    }`;
    this.sucssesWordImg.style.background = `top 0 left 0 / 100% 100% url(${wordImgSrc})`;

    Utils.addAnimationToRepeatWord(
      this.audioCallRepeatSucssesContainer,
      this.audioCallRepeatBtn
    );
  }

  renderStatisticsPage(event: Event) {
    const target = event.target as HTMLElement;
    const page = target.dataset.statistic;

    if (page) {
      Statistic.renderStatisticPage(
        page,
        this.audioCallStatisticsPage1,
        this.audioCallStatisticsPage2
      );
      Utils.drawSwipeItem(target);
    }
  }

  async getWordsToPlay() {
    const currentChapter = Utils.getCurrentChapter(this.chapterCollection);
    const currentPage = Utils.getRandomNumber(
      countPageToChepter.min,
      countPageToChepter.max
    );

    repeatGameState.page = String(currentPage);
    repeatGameState.chapter = currentChapter;
    this.formationListWords(String(currentPage), currentChapter, false);
  }

  async formationListWords(
    currPage: string,
    currChapter: string,
    wbState?: boolean
  ) {
    AudioCall.currentWordsCollection = await this.api.getWords(
      currPage,
      currChapter
    );
    if (wbState) {
      AudioCall.currentWordsCollection =
        AudioCall.currentWordsCollection.filter(
          (i) => this.learned.isLearned(i) === 0
        );
    }

    Utils.getRandomNumbers(
      AudioCall.numbersCollection,
      AudioCall.currentWordsCollection.length,
      AudioCall.currentWordsCollection
    );
  }

  async generationWord() {
    const activeCollectionNumber = [
      AudioCall.numbersCollection[AudioCall.counter],
    ];
    const activeNumbers = Utils.getRandomNumbers(
      activeCollectionNumber,
      5,
      AudioCall.currentWordsCollection
    ).sort((a, b) => a - b);

    this.audioCallCollectionItem.forEach((element, index) => {
      const num = document.createElement('span');
      num.classList.add('call-number');
      num.textContent = `${index + 1}`;
      element.textContent = `${
        AudioCall.currentWordsCollection[activeNumbers[index]].wordTranslate
      }`;
      element.prepend(num);

      element.setAttribute(
        'data-audioword',
        `${AudioCall.currentWordsCollection[activeNumbers[index]].word}`
      );
      element.setAttribute('data-number', `${index + 1}`);
    });

    const audio = await Utils.getAudioTrack(
      AudioCall.currentWordsCollection[
        AudioCall.numbersCollection[AudioCall.counter]
      ].audio
    );

    this.track.src = `${audio}`;
    this.track.play();

    AudioCall.counter += 1;
  }
}
export default AudioCall;
