import SprintModel from './sprintModel';
import SprintView from './sprintView';
import { IToken, IWord } from '../../utils/api/interfaces';
import { currentToken } from '../../utils/api/const';
import SprintLink from './enum';
import countPageToChepter from '../game-audioCall/difference/const';
import Learned from '../learned';
import WorkBook from '../workBook';

export default class SprintController {
  baseUrl: string;

  sprintView: SprintView;

  sprintModel: SprintModel;

  level: string;

  page: string;

  step: number;

  wordCount: number;

  wordControl: boolean;

  trueArray: IWord[];

  isCorrect: boolean;

  currentToken: IToken;

  intervalLoaderTime: number;

  loadTime: number;

  roundTime: number;

  seconds: number;

  correctCount: number;

  progressArray: IWord[];

  score: number;

  factor: number;

  answered: Set<IWord['wordTranslate']>;

  audioList: Record<string, string>;

  audio: HTMLAudioElement;

  isMuted: boolean;

  isPaused: boolean;

  prevTranslate: Array<IWord['wordTranslate']>;

  learned: Learned;

  constructor() {
    this.currentToken = currentToken;
    this.sprintModel = new SprintModel();
    this.sprintView = new SprintView(this);
    this.answered = new Set();
    this.level = '0';
    this.page = '0';
    this.step = 0;
    this.loadTime = 3;
    this.trueArray = [];
    this.progressArray = [];
    this.prevTranslate = [];
    this.isCorrect = true;
    this.isPaused = false;
    this.intervalLoaderTime = 0;
    this.roundTime = 0;
    this.seconds = 30;
    this.correctCount = 0;
    this.score = 0;
    this.factor = 1;
    this.audio = new Audio();
    this.audioList = {
      correct: SprintLink.correctAudio,
      error: SprintLink.errorAudio,
    };
    this.isMuted = false;
    this.learned = new Learned()
  }

  init() {
    this.sprintView.addListeners();
  }

  activate(): void {
    this.sprintView.startScreen.classList.remove('hide');
    this.chooseLvl();

    const keyDownCb = this.keyPress.bind(this);
    document.addEventListener('keydown', keyDownCb);
    this.sprintView.close.addEventListener('click', () => {
      clearInterval(this.roundTime);
    });
  }

  chooseLvl() {
    document.querySelectorAll('.radio').forEach((elem) => {
      elem.addEventListener('click', () => {
        this.level = elem.id.slice(5);
        this.wordControl = false;
        return this.level;
      });
    });
  }

  async makeGameArray(group: string, page: string) {
    if (page) {
      this.trueArray = await this.sprintModel.getWorkBookWords(group, page);
      this.trueArray = this.trueArray.filter(i => this.learned.isLearned(i) === 0);
    }
    else {
      this.trueArray = await this.sprintModel.getSomeWords(group);
    }
    this.makeQuestion();
    return this.trueArray;
  }

  static translateCheck(
    word: IWord['wordTranslate'],
    wrongTranslate: Array<IWord['wordTranslate']>
  ) {
    const result = wrongTranslate.filter((e) => e !== word);
    return result;
  }

  prevTranslateCheck(wrongTranslate: IWord['wordTranslate']) {
    this.prevTranslate.push(wrongTranslate);
    if (this.prevTranslate.length === 2) {
      this.prevTranslate.shift();
    }
  }

  makeQuestion() {

    let rand = Math.floor(Math.random() * 2);
    if (
      this.prevTranslate.includes(this.trueArray[this.step].wordTranslate) &&
      this.answered.size === this.trueArray.length - 1
    ) {
      rand = 0;
    }
    if (this.answered.size === this.trueArray.length - 1) {
      rand = 1;
    }
    if (rand) {
      this.sprintView.getTrueCouple(
        this.trueArray[this.step],
        this.trueArray[this.step]
      );
      this.isCorrect = true;
    } else {
      const filteredArr = SprintController.translateCheck(
        this.trueArray[this.step].wordTranslate,
        this.sprintModel.gameFalseWords
      );
      const shuffledArr = this.sprintModel.shuffleArray(filteredArr);

      while (
        this.answered.has(shuffledArr[0]) ||
        this.prevTranslate.includes(shuffledArr[0])
      ) {
        const reshuffledArr = this.sprintModel.shuffleArray(filteredArr);
        shuffledArr[this.step] = reshuffledArr[this.step];
      }
      this.sprintView.getFalseCouple(this.trueArray[this.step], shuffledArr[0]);
      this.prevTranslateCheck(shuffledArr[0]);

      this.isCorrect = false;
    }
  }

  addGameTimer() {
    clearInterval(this.roundTime);
    this.roundTime = window.setInterval(this.onTick.bind(this), 1000);
    this.onTick();
  }

  onTick() {
    this.sprintView.addTimer(this.seconds.toString());
    this.seconds -= 1;
    if (this.seconds === -1) {
      this.sprintView.restartGameTimer();
      clearInterval(this.roundTime);
      this.seconds = 30;
      this.sprintView.addTimer(' ');
      this.sprintView.showPopupResult(this.progressArray);
    }
  }

  addLoadTimer() {
    this.intervalLoaderTime = window.setInterval(() => {
      this.sprintView.getLoaderTime(this.loadTime);
      this.loadTime -= 1;
      if (this.loadTime === -1) {
        this.addGameTimer();
        clearInterval(this.intervalLoaderTime);
        this.loadTime = 3;
      }
    }, 1000);
  }

  async startRound(data: {page: string, category: string}) {
    this.clearScore();
    if (data) {
      this.level = data.category;
      this.page = data.page;
      await this.makeGameArray(this.level, this.page);
    }
    else {
      await this.makeGameArray(this.level, null);
    }
    this.sprintView.getPreloader();
    this.addLoadTimer();
    }


  checkAnswer(target: string) {
    if (!this.isPaused) {
      if (
        (this.isCorrect && target === 'trueBtn') ||
        (!this.isCorrect && target === 'falseBtn')
      ) {
        this.answered.add(this.trueArray[this.step].wordTranslate);
        this.correctCount += 1;
        this.bonusCounter();
        this.playAudio('correct');
        this.trueArray[this.step].correct = true;
        this.progressArray.push(this.trueArray[this.step]);
        this.progressArray[this.step].correct = true;
        this.score += 10 * this.factor;
        this.sprintView.getScore(this.score);
        this.sprintView.getBonusCheck(this.correctCount);
        this.sprintView.changeBorderCorrect();
        this.step += 1;
        this.nextQuestionCheck();
        this.makeQuestion();
      } else {
        if (this.learned.isLearned(this.trueArray[this.step])) {
          const index = WorkBook.learnedArr.indexOf(this.trueArray[this.step]);
          WorkBook.learnedArr.splice(index, 1)
        }
        this.playAudio('error');
        this.correctCount = 0;
        this.trueArray[this.step].correct = false;
        this.progressArray.push(this.trueArray[this.step]);
        this.clearBonus();
        this.sprintView.changeBorderIncorrect();
        this.step += 1;
        this.nextQuestionCheck();
        this.makeQuestion();
        this.factor = 1;
        this.removeBonusStar();
        this.sprintView.hideBonus();
      }
    }
  }

  nextQuestionCheck() {
    if (this.step === this.trueArray.length) {
      this.seconds = 0;
      this.step -= this.step;
      this.isPaused = true;
      this.addGameTimer();
    }
  }

  addBonusStar() {
    switch (this.factor) {
      case 2:
        this.sprintView.getBonusStar(2);
        break;
      case 4:
        this.sprintView.getBonusStar(3);
        break;
      case 8:
        this.sprintView.getBonusStar(4);
        break;

      default:
        break;
    }
  }

  bonusCounter() {
    if (this.correctCount === 4 && this.factor < 16) {
      this.factor *= 2;
      this.sprintView.showBonus(this.factor);
      this.addBonusStar();
      this.sprintView.getScore(this.score);
      setTimeout(() => {
        this.clearBonus();
      }, 300);
      this.correctCount = 0;
    }
  }

  clearBonus() {
    this.sprintView.currentBonus.forEach((elem) => {
      elem.classList.remove('filled');
    });
  }

  removeBonusStar() {
    for (
      let i = this.sprintView.currentFactor.length;
      i > this.factor;
      i -= 1
    ) {
      if (this.sprintView.currentFactor[i - 1].classList.contains(`item${i}`)) {
        this.sprintView.currentFactor[i - 1].classList.remove(`item${i}`);
      }
    }
  }

  togglePlay() {
    if (this.sprintView.timer.innerHTML === '||') {
      this.addGameTimer();
      this.isPaused = false;
      this.sprintView.timerCircle.style.animationPlayState = 'running';
    } else {
      this.sprintView.timer.innerHTML = '||';
      clearInterval(this.roundTime);
      this.isPaused = true;
      this.sprintView.timerCircle.style.animationPlayState = 'paused';
    }
  }

  toggleVolume() {
    if (this.isMuted) {
      this.isMuted = false;
    } else {
      this.isMuted = true;
    }
    this.sprintView.soundBtn.classList.toggle('game__sprint__btn-sound-muted');
  }

  playAudio(sound: string) {
    if (!this.isMuted) {
      this.audio.src = this.audioList[sound];
      this.audio.play().catch(() => this.audio.currentTime);
    }
  }

  playWord(src: string, target: Element) {
    clearTimeout();
    target.classList.add('pulse');
    setTimeout(() => target.classList.remove('pulse'), 1000);
    const audio = new Audio();
    audio.src = `${countPageToChepter.link}${src}`;
    audio.play();
  }

  resultWordOnClick(elem: HTMLElement) {
    const word = elem.closest('.resultPopup__word') as HTMLElement;
    if (word) {
      const soundIco = word.firstElementChild as HTMLElement;
      this.playWord(
        this.trueArray[parseInt(word.dataset.id, 10)].audio,
        soundIco
      );
    }
  }

  keyPress(event: KeyboardEvent) {
    if (event.code === 'ArrowLeft' && !this.isPaused) {
      this.checkAnswer('falseBtn');
      return;
    }
    if (event.code === 'ArrowRight' && !this.isPaused) {
      this.checkAnswer('trueBtn');
    }
  }

  getScore() {
    return this.answered.size;
  }

  closeResultPopup() {
    this.sprintView.resultPopup.classList.remove('active');
    this.isPaused = true;
  }

  clearScore() {
    this.answered.clear();
    this.step = 0;
    this.loadTime = 3;
    this.trueArray = [];
    this.progressArray = [];
    this.prevTranslate = [];
    this.isCorrect = true;
    this.isPaused = false;
    this.intervalLoaderTime = 0;
    this.roundTime = 0;
    this.seconds = 30;
    this.correctCount = 0;
    this.score = 0;
    this.factor = 1;
    this.sprintView.getScore(this.score);
    this.removeBonusStar();
    this.clearBonus();
    this.sprintView.bonusNote.innerHTML = ' ';
  }

  restartGame() {
    this.clearScore();
    this.sprintView.toggleStartScreen();
    this.sprintView.toggleGameScreen();
  }
}
