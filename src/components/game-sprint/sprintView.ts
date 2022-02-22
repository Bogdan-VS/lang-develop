import { IWord } from '../../utils/api/interfaces';
import { wordsPage } from '../../utils/workBook/const';
import { IGamesController } from './Interface';

export default class SprintView {
  main: HTMLElement;

  sprintController: IGamesController;

  timer: HTMLElement;

  gameLevels: number;

  gameTime: number;

  preloader: HTMLElement;

  preloadCounter: HTMLElement;

  loader: HTMLElement;

  loadCounter: HTMLElement;

  currentWord: HTMLElement;

  currentTranslation: HTMLElement;

  timeoutLoaderHide: number;

  startBtn: HTMLButtonElement;

  gameController: IGamesController;

  startScreen: HTMLElement;

  gameField: HTMLElement;

  gameArea: HTMLElement;

  trueBtn: HTMLElement;

  falseBtn: HTMLElement;

  scoreElem: HTMLElement;

  bonusNote: HTMLElement;

  currentBonus: NodeListOf<HTMLElement>;

  currentFactor: NodeListOf<HTMLElement>;

  soundIcon: NodeListOf<HTMLElement>;

  soundBtn: HTMLButtonElement;

  timerCircle: HTMLElement;

  close: HTMLElement;

  successBlock: HTMLElement;

  failBlock: HTMLElement;

  resultPopup: HTMLElement;

  successBlockCorrect: HTMLElement;

  failBlockErrors: HTMLElement;

  popupCloseBtn: HTMLButtonElement;

  restartGameBtn: HTMLButtonElement;

  sprintBeginBtn: HTMLElement;

  gameScreen: HTMLElement;

  workBookSprintBtn: HTMLElement;

  prevBtn: HTMLElement;

  static gameLevels = 6;

  constructor(gameController: IGamesController) {
    this.sprintController = gameController;
    this.main = document.getElementById('mainPage') as HTMLElement;
    this.sprintBeginBtn = document.getElementById('sprint-game') as HTMLElement;
    this.timeoutLoaderHide = 0;
    this.gameTime = 30;
  }

  static renderSoundIcon(color: string) {
    return `
    <span class="sound-icon" style="width: 33px; height: 33px; color: rgb(125, 145, 159);">
    <svg svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32">
      <path fill="${color}"
        d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z"
        fill-rule="evenodd"></path>
    </svg>
  </span>`;
  }

  static renderLevels() {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', 'levels');
    wrapperElement.className = 'levels';
    const titleElement = document.createElement('div');
    titleElement.className = 'levels__title';
    titleElement.innerHTML = 'Сложность';
    const levelElements = document.createElement('div');
    levelElements.className = 'levels__wrap';
    wrapperElement.append(titleElement);
    wrapperElement.append(levelElements);
    for (let i = 0; i < SprintView.gameLevels; i += 1) {
      levelElements.append(SprintView.renderRadioLevel(i));
    }
    return wrapperElement.innerHTML;
  }

  static renderRadioLevel(i: number): HTMLLabelElement {
    const radioElement = document.createElement('label');
    radioElement.id = `radio${i}`;
    radioElement.className = 'radio';
    const spanElement = document.createElement('span');
    spanElement.className = 'radio__decor';
    spanElement.classList.add('bouncy');
    const InputElement = document.createElement('input');
    InputElement.className = 'radio__input';
    InputElement.value = i.toString();
    InputElement.type = 'radio';
    InputElement.name = 'group';
    if (i === 0) InputElement.setAttribute('checked', 'true');
    radioElement.append(InputElement);
    radioElement.append(spanElement);
    return radioElement;
  }

  showPopupResult(words: IWord[]) {
    this.sprintController.progressArray = words;
    const score = this.sprintController.getScore();
    const count = words.length;

    this.successBlock.innerHTML = '';
    this.failBlock.innerHTML = '';

    this.failBlockErrors.textContent = (count - score).toString();
    this.successBlockCorrect.textContent = score.toString();
    this.sprintController.progressArray.forEach((word, key) => {
      const objWord = { word, key };
      if (word.correct) {
        this.createPopupResult(objWord, this.successBlock);
      } else {
        this.createPopupResult(objWord, this.failBlock);
      }
    });

    this.resultPopup.classList.add('active');
  }

  createPopupResult(objWord: { word: IWord; key: number }, block: HTMLElement) {
    const listItem = document.createElement('div') as HTMLElement;
    listItem.className = 'resultPopup__word';
    listItem.dataset.id = objWord.key.toString();
    listItem.innerHTML = `
      ${SprintView.renderSoundIcon('#37383c')}
      <div class="text word">${objWord.word.word}</div>
      <div class="text">${objWord.word.transcription}</div>
      <div class="text">${objWord.word.wordTranslate}</div>
    `;
    block.append(listItem);
  }

  async addListeners() {
    this.gameScreen = document.querySelector('.game__sprint') as HTMLElement;
    this.startBtn = document.getElementById('startGame') as HTMLButtonElement;
    this.currentWord = document.querySelector(
      '.game__sprint__word'
    ) as HTMLElement;
    this.timer = document.querySelector('.circle-text') as HTMLElement;
    this.timerCircle = document.querySelector('.circle') as HTMLElement;
    this.preloader = document.querySelector('.game__preloader') as HTMLElement;
    this.preloadCounter = document.querySelector(
      '.game__loader__count'
    ) as HTMLElement;
    this.loader = document.querySelector(
      '.game__sprint__loader'
    ) as HTMLElement;
    this.loadCounter = document.querySelector(
      '.game__loader__count'
    ) as HTMLElement;
    this.currentWord = document.querySelector(
      '.game__sprint__word'
    ) as HTMLElement;
    this.currentTranslation = document.querySelector(
      '.game__sprint__translation'
    ) as HTMLElement;
    this.gameField = document.querySelector('.game__sprint') as HTMLElement;
    this.startScreen = document.querySelector(
      '.game__startScreen'
    ) as HTMLElement;
    this.trueBtn = document.querySelector('.btn-true') as HTMLButtonElement;
    this.falseBtn = document.querySelector('.btn-false') as HTMLButtonElement;
    this.scoreElem = document.querySelector(
      '.game__sprint__score'
    ) as HTMLElement;
    this.bonusNote = document.querySelector(
      '.game__sprint__bonus_note'
    ) as HTMLElement;
    this.currentBonus = document.querySelectorAll(
      '.game__sprint__bonus__check .empty'
    ) as NodeListOf<HTMLElement>;
    this.currentFactor = document.querySelectorAll(
      '.game__sprint__bonus__area__count .game__sprint__bonus__item'
    ) as NodeListOf<HTMLElement>;
    this.gameArea = document.querySelector(
      '.game__sprint__wrap'
    ) as HTMLElement;
    this.soundIcon = document.querySelectorAll(
      '.sound-icon'
    ) as NodeListOf<HTMLElement>;
    this.close = document.querySelector('.close') as HTMLElement;
    this.soundBtn = document.querySelector(
      '.game__sprint__btn-sound'
    ) as HTMLButtonElement;
    this.successBlock = document.querySelector(
      '.resultPopup__success'
    ) as HTMLElement;
    this.failBlock = document.querySelector(
      '.resultPopup__fail'
    ) as HTMLElement;
    this.successBlockCorrect = document.querySelector(
      '.resultPopup__correct'
    ) as HTMLElement;
    this.failBlockErrors = document.querySelector(
      '.resultPopup__errors'
    ) as HTMLElement;
    this.resultPopup = document.querySelector('.resultPopup') as HTMLElement;
    this.popupCloseBtn = document.getElementById(
      'closePopup'
    ) as HTMLButtonElement;
    this.restartGameBtn = document.getElementById(
      'restartGame'
    ) as HTMLButtonElement;
    this.workBookSprintBtn = document.getElementById('sprint-Btn') as HTMLElement;
    this.prevBtn = document.querySelector('.prevBtn') as HTMLElement;
    this.gameField.addEventListener('click', (event) =>
      this.clickHandler(event)
    );
    this.sprintBeginBtn.addEventListener('click', () =>
      this.sprintController.activate()
    );
    this.startBtn.addEventListener('click', () =>
      this.sprintController.startRound(null)
    );
    this.popupCloseBtn.addEventListener('click', () => {
      this.sprintController.closeResultPopup();
    });
    this.restartGameBtn.addEventListener('click', () => {
      this.sprintController.closeResultPopup();
      this.sprintController.restartGame();
    });
    this.resultPopup.addEventListener('click', (e: MouseEvent) => {
      this.sprintController.resultWordOnClick(<HTMLElement>e.target);
    });
    this.close.addEventListener('click', () => this.toggleGameScreen());
    this.prevBtn.addEventListener('click', () => this.toggleStartScreen());
    this.workBookSprintBtn.addEventListener('click', () => this.sprintController.startRound(wordsPage));
  }

  clickHandler(event: MouseEvent) {
    const target = <HTMLElement>event.target;
    if (target.id === 'falseBtn' || target.id === 'trueBtn') {
      this.sprintController.checkAnswer(target.id);
    }
    if (target.classList.contains('start_timer')) {
      this.sprintController.togglePlay();
    }
    if (target.classList.contains('game__sprint__sound')) {
      this.sprintController.playWord(
        this.sprintController.trueArray[this.sprintController.step].audio,
        target
      );
    }
    if (target.classList.contains('game__sprint__btn-sound')) {
      this.sprintController.toggleVolume();
    }
  }

  renderBonus = (color: string): string => `
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 1000 1000"
      enable-background="new 0 0 1000 1000"
      xml:space="preserve"
    >
      <metadata>Svg Vector Icons : http://www.onlinewebfonts.com/icon</metadata>
      <g fill="${color}" stroke="none">
        <path
          d="M759.5,990c-11.3,0-22.6-2.9-32.7-8.5L506.4,859.3c-4-2.2-8.8-2.2-12.8,0L273.3,
          981.4c-27.9,15.5-64.1,8.5-84.5-15.5c-12.8-15.1-18.3-35-15.1-54.8l43-264.7c0.7-4.2-0.7-8.5-3.6-11.5L29.3,
          445.8c-17.8-18.3-23.8-44.8-15.7-69c8.1-24.2,28.8-41.6,54-45.5L318.1,293c4.4-0.7,8.1-3.5,10-7.5L438.7,
          49C450,25,473.4,10,500,10c26.6,0,50.1,15,61.3,39.1L672,285.5c1.9,4,5.6,6.9,10,7.5l250.5,38.4c25.2,3.9,
          45.8,21.3,53.9,45.4c8.1,24.3,2.1,50.7-15.7,69l-183.8,189c-2.9,3-4.3,7.3-3.6,11.5l43,264.8c3.2,19.7-2.3,
          39.7-15.2,54.8C798.2,981.2,779.3,990,759.5,990z M500,803.2c11.5,0,22.8,2.9,32.8,8.5l220.3,122.2c5.8,3.2,
          12.5,1.6,16.6-3.2c2.6-3,3.5-6.6,2.9-10.8l-43-264.7c-3.4-21.1,3.4-42.9,18.3-58.3l183.8-189c5.1-5.3,3.9-11.4,
          3.1-13.7c-0.8-2.3-3.4-7.8-10.6-9l-250.5-38.4c-22.4-3.4-41.5-17.7-51.1-38.3L512,72.1c-3.2-6.9-9.4-7.6-12-7.6c-2.5,
          0-8.8,0.7-12,7.7L377.4,308.5c-9.6,20.5-28.7,34.8-51.1,38.3L75.8,385.2c-7.2,1.1-9.8,6.6-10.6,9c-0.8,2.3-2.1,
          8.4,3.1,13.7l183.8,189c14.9,15.3,21.8,37.1,18.3,58.3l-43.1,264.7c-0.7,4.1,0.3,7.8,2.9,10.8c4.1,4.8,10.8,6.4,
          16.6,3.2l220.3-122.1C477.2,806.1,488.6,803.2,500,803.2z"
        />
      </g>
    </svg>
  `;

  getBonusCheck(i: number) {
    if (i) {
      document
        .querySelector(`.game__sprint__bonus__area__${i}`)
        .classList.add('filled');
    }
  }

  getBonusStar(i: number) {
    const parrot = document.getElementById(
      `game__sprint__bonus__item${i}`
    ) as HTMLElement;
    parrot.classList.add(`item${i}`);
  }

  showBonus(factor: number): void {
    this.bonusNote.innerHTML = `Умножение очков на ${factor}!`;
  }

  hideBonus() {
    let answerTimer;
    if (answerTimer) {
      clearTimeout(answerTimer);
    }
    this.bonusNote.innerHTML = 'Серия прервана!';
    answerTimer = setTimeout(() => {
      this.bonusNote.innerHTML = ' ';
    }, 2000);
  }

  startTimer() {
    this.timerCircle.classList.add('start_timer');
    return this.timer;
  }

  addTimer(second: string) {
    this.timer.innerHTML = `${second}`;
  }

  getTrueCouple(trueword: IWord, truetranslate: IWord) {
    this.currentWord.textContent = `${trueword.word}`;
    this.currentTranslation.textContent = `${truetranslate.wordTranslate}`;
  }

  getFalseCouple(trueword: IWord, falsetranslate: IWord['wordTranslate']) {
    this.currentWord.innerHTML = `${trueword.word}`;
    this.currentTranslation.innerHTML = `${falsetranslate}`;
  }

  startGameTimer() {
    document.querySelector('.circle').classList.add('start_timer');
    return this.timer;
  }

  restartGameTimer() {
    if (document.querySelector('.circle').classList.contains('start_timer')) {
      document.querySelector('.circle').classList.remove('start_timer');
    }
    return this.timer;
  }

  getPreloader() {
    this.preloader.classList.remove('hide__loader');
    this.timeoutLoaderHide = window.setTimeout(() => {
      if (!this.preloader.classList.contains('hide__loader')) {
        clearInterval(this.timeoutLoaderHide);
        this.preloader.classList.add('hide__loader');
        this.startGameTimer();
        this.toggleGameControls();
      }
    }, 4000);
  }

  getLoaderTime(timeItem: number) {
    this.loadCounter.innerHTML = `${timeItem}`;
  }

  toggleStartScreen() {
    this.startScreen.classList.toggle('hide');
  }

  toggleGameScreen() {
    this.gameScreen.classList.toggle('hide');
  }

  toggleGameControls() {
    this.gameField.classList.toggle('hide');
  }

  getScore(score: number): void {
    this.scoreElem.textContent = `${score}`;
  }

  changeBorderCorrect() {
    this.gameArea.classList.add('correct');
    setTimeout(() => {
      this.gameArea.classList.remove('correct');
    }, 300);
  }

  changeBorderIncorrect() {
    this.gameArea.classList.add('incorrect');
    setTimeout(() => {
      this.gameArea.classList.remove('incorrect');
    }, 300);
  }
}
