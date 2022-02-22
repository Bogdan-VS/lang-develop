import Api from '../server/api';
import { IUserToken, IWord } from '../utils/api/interfaces';
import Render from './render';
import { colorThemes, bgGradient } from '../utils/workBook/enums';
import Display from '../utils/baseEnums';
import { hardButtonTextContent, wordsPage } from '../utils/workBook/const';
import Learned from './learned';
import Burger from './burgerMenu';

class WorkBook {
  private api: Api;

  private words: IWord[];

  private currentPage: number;

  private wordsGroup: string;

  private hardBtn: NodeListOf<HTMLTemplateElement>;

  private hardIndicator: NodeListOf<HTMLTemplateElement>;

  private learnedIndicator: NodeListOf<HTMLTemplateElement>;

  private hardLevel: HTMLTemplateElement;

  static hardArr: IWord[];

  private hardStatus: boolean;

  static learnedArr: IWord[];

  private pageNum: HTMLTemplateElement;

  private learned: Learned;

  private burger: Burger;


    constructor(words?: IWord[]) {
    WorkBook.hardArr = [];
    WorkBook.learnedArr = [];
    this.hardStatus = false;
    this.hardBtn = document.querySelectorAll('.word-card__button');
    this.hardLevel = document.querySelector('.hard-button');
    this.hardIndicator = document.querySelectorAll(
      '.word-card__hard-indicator'
    );
    this.learnedIndicator = document.querySelectorAll(
      '.word-card__learned-indicator'
    );
    this.words = words;
    this.api = new Api();
    this.burger = new Burger()
    this.listen();
    this.currentPage = 1;
    this.wordsGroup = colorThemes.a1.wordsGroup;
    wordsPage.color = colorThemes.a1.color;
    this.learned = new Learned()
  }

  static renderWordCard = (word: IWord, color: string) =>
    `
          <div class="word-card studied-word">
          <div class="word-card__hard-indicator" id="hard-indicator-${
            word.id
          }" style="display: ${
      WorkBook.hardArr.filter((i) => i.id === word.id).length ? 'block' : 'none'
    }">
         ${WorkBook.renderRibbonImg(color)}
          </div>
          <div class="word-card__learned-indicator ${
            WorkBook.learnedArr.filter((i) => i.id === word.id).length
              ? 'word-card__hard-indicator_active'
              : 'word-card__hard-indicator_inactive'
          }" id="learned-btn-${word.id}" style="display: ${
      WorkBook.checkAuthWorkBook() ? 'block' : 'none'
    }"></div>
          <div class="word-card__img" style="background: url('https://raw.githubusercontent.com/SashaLado/react-rslang-be/main/${
            word.image
          }') center/cover"></div>
          <div class="word-card__text-block">
            <h3 class="word-card__title">${word.word}</h3>
            <div class="word-card__translation text">${word.wordTranslate}</div>
            <div class="word-card__transcript-wrapper">
              <div class="word-card__transcript-text text">${
                word.transcription
              }</div>
              <div class="word-card__transcript-icon" id="${word.id}"></div>
            </div>
            <div class="word-card__usage-block">
              <p class="text">${word.textMeaning}</p>
              <p class="text text_translation">${word.textMeaningTranslate}</p>
            </div>
            <div class="word-card__usage-block">
              <p class="text">${word.textExample}</p>
              <p class="text text_translation">${word.textExampleTranslate}</p>
            </div>
            <button class="button word-card__button" id="hardBtn-${
              word.id
            }" style="display: ${
      WorkBook.checkAuthWorkBook() ? 'block' : 'none'
    }">${
      WorkBook.hardArr.filter((i) => i.id === word.id).length
        ? hardButtonTextContent.removeToHard.text
        : hardButtonTextContent.addToHard.text
    }</button>
          </div>
          <audio class="audio" id="audio1-${
            word.id
          }" src="https://raw.githubusercontent.com/SashaLado/react-rslang-be/main/${
      word.audio
    }"></audio>
          <audio class="audio" id="audio2-${
            word.id
          }" src="https://raw.githubusercontent.com/SashaLado/react-rslang-be/main/${
      word.audioExample
    }"></audio>
          <audio class="audio" id="audio3-${
            word.id
          }" src="https://raw.githubusercontent.com/SashaLado/react-rslang-be/main/${
      word.audioMeaning
    }"></audio>
        </div>`;

  static renderRibbonImg = (color: string) =>
    `<?xml version="1.0" ?><svg fill="${color}" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M98.78,0H29.22A7.21,7.21,0,0,0,22,7.19V120.8a7.08,7.08,0,0,0,4.42,6.63,7.22,7.22,0,0,0,7.87-1.5L63.14,97.59a1.23,1.23,0,0,1,1.72,0l28.86,28.33a7.21,7.21,0,0,0,7.87,1.5A7.08,7.08,0,0,0,106,120.8V7.19A7.21,7.21,0,0,0,98.78,0ZM100,120.8a1.14,1.14,0,0,1-.74,1.09,1.17,1.17,0,0,1-1.34-.25h0L69.06,93.31a7.26,7.26,0,0,0-10.13,0L30.08,121.64a1.18,1.18,0,0,1-1.34.25A1.14,1.14,0,0,1,28,120.8V7.19A1.21,1.21,0,0,1,29.22,6H98.78A1.21,1.21,0,0,1,100,7.19Z"/></svg>`;

  async updateStateWords(page: string, group: string) {
    this.words = await this.api.getWords(page, group);
    return this.words;
  }

  changeColorThem(
    { color, wordsGroup }: { color: string; wordsGroup: string },
    target: HTMLButtonElement
  ) {
    document.getElementById('workBookPage').style.background = color;
    const wordsContainer = document.querySelector('.words-container');
    if (wordsContainer) {
      this.wordsGroup = wordsGroup;
      this.updateStateWords('0', wordsGroup).then((r) => {
        wordsContainer.innerHTML = Render.renderWordsContainer(r, color);
        const transcriptElements: NodeListOf<HTMLTemplateElement> =
          document.querySelectorAll('.word-card__transcript-text');
        transcriptElements.forEach((el) => {
          el.style.backgroundColor = color;
        });
        this.currentPage = 1;
        wordsPage.color = color;
        this.checkPage();
      });
      wordsPage.category = wordsGroup;
    }
  }

  changePage(id: HTMLButtonElement) {
    if (id.classList.contains('next')) {
      this.currentPage += 1;
      id.disabled = this.currentPage === 30;
    } else if (id.classList.contains('prev')) {
      this.currentPage -= 1;
      id.disabled = this.currentPage === 1;
    }
    const page = (this.currentPage - 1).toString();
    const wordsContainer = document.querySelector('.words-container');
    if (wordsContainer) {
      this.updateStateWords(page, this.wordsGroup).then((r) => {
        wordsContainer.innerHTML = Render.renderWordsContainer(r);
        this.checkPage();
      });
    }
    wordsPage.page = page;
  }

  checkPage() {
    const pageNum = document.querySelector('.page-num');
    const workBookPage = document.getElementById('workBookPage');
    const gamesButtons = document.querySelectorAll(
      '.games__item'
    ) as unknown as HTMLButtonElement[];
    const { color } = wordsPage;
    const specialWords: IWord[] = [];
    const wordsLimit = 20;
    const arr = this.words;
    let disabled = false;

    pageNum.textContent = this.currentPage.toString();
    arr.forEach((word) => {
      if (
        WorkBook.hardArr.filter((i) => i.id === word.id).length ||
        WorkBook.learnedArr.filter((i) => i.id === word.id).length
      ) {
        specialWords.push(word);
      }
    });
    if (specialWords.length === wordsLimit) {
      pageNum.classList.add('page_special');
      workBookPage.style.background = bgGradient.background;
      workBookPage.style.animation = bgGradient.animation;
      disabled = true;
    } else {
      pageNum.classList.remove('page_special');
      workBookPage.style.background = color;
      workBookPage.style.animation = 'none';
      disabled = false;
    }

    gamesButtons.forEach((button) => {
      button.disabled = disabled;
    });
  }

  playSound(id: string) {
    const audios = document.querySelectorAll(
      'audio'
    ) as unknown as HTMLAudioElement[];
    audios.forEach((audio) => {
      audio.pause();
    });
    const sound1 = document.getElementById(
      `audio1-${id}`
    ) as unknown as HTMLAudioElement;
    const sound2 = document.getElementById(
      `audio2-${id}`
    ) as unknown as HTMLAudioElement;
    const sound3 = document.getElementById(
      `audio3-${id}`
    ) as unknown as HTMLAudioElement;

    sound1.play();
    sound1.onended = function () {
      sound2.play();
      sound2.onended = function () {
        sound3.play();
      };
    };
  }

  showWorkBook() {
    const mainPage = document.getElementById('mainPage');
    const workBookPage = document.getElementById('workBookPage');

    //   mainPage.style.display = Display.none;
    //   workBookPage.style.display = Display.block;
  }

  static checkAuthWorkBook() {
    const learnedButton: NodeListOf<HTMLTemplateElement> =
      document.querySelectorAll('.word-card__learned-indicator');
    const hardButton: NodeListOf<HTMLTemplateElement> =
      document.querySelectorAll('.word-card__button');
    const hardLevel: HTMLTemplateElement =
      document.querySelector('.hard-button');

    if (localStorage.getItem('session')) {
      if (hardLevel) {
        hardLevel.style.display = Display.block;
        hardLevel.onclick = () => {
          const wordsContainer = document.querySelector('.words-container');
          wordsContainer.innerHTML = Render.renderWordsContainer(
            WorkBook.hardArr
          );
          document.getElementById('workBookPage').style.backgroundColor =
            colorThemes.hard.color;
          const transcriptElements: NodeListOf<HTMLTemplateElement> =
            document.querySelectorAll('.word-card__transcript-text');
          transcriptElements.forEach((el) => {
            el.style.backgroundColor = colorThemes.hard.color;
          });
        };
      }
      return true;
    }
    if (hardLevel) {
      hardLevel.style.display = Display.none;
    }
    return false;
  }

    async addRemoveHard (target?: HTMLButtonElement, idT?: string) {
        let id: string = '0';
        if (target && !idT) {
            // eslint-disable-next-line prefer-destructuring
            id = target.id.split('hardBtn-')[1];
        } else if (idT && !target) {
            id = idT
        }
        const hardBtn = document.getElementById(`hardBtn-${id}`);
        const hardIndicator = document.getElementById(`hard-indicator-${id}`);
        const word = await this.api.getWord(id);
        if (WorkBook.hardArr.filter(i => i.id === word.id).length) {
            const index = WorkBook.hardArr.indexOf(word);
            WorkBook.hardArr.splice(index, 1)
            hardIndicator.style.display = Display.none;
            hardBtn.innerHTML = hardButtonTextContent.addToHard.text;
        } else {
            WorkBook.hardArr.push(word);
            hardIndicator.style.display = Display.block;
            hardBtn.innerHTML = hardButtonTextContent.removeToHard.text;
        }
        this.checkPage()
    }

    async addRemoveLearned (target: HTMLButtonElement) {
        const id = target.id.split('learned-btn-')[1];
        const learnedBtn = document.getElementById(`learned-btn-${id}`);
        const word = await this.api.getWord(id);
        const hardBtn = document.getElementById(`hardBtn-${id}`) as HTMLButtonElement;
        if (WorkBook.learnedArr.filter(i => i.id === word.id).length) {
            hardBtn.disabled = false
            const index = WorkBook.learnedArr.indexOf(word);
            WorkBook.learnedArr.splice(index, 1)
            learnedBtn.classList.toggle('word-card__hard-indicator_inactive', true);
            learnedBtn.classList.toggle('word-card__hard-indicator_active', false);
        } else {
            hardBtn.disabled = true
            if (this.learned.isHard(word)) {
                await this.addRemoveHard(null ,word.id)
            }
            WorkBook.learnedArr.push(word);
            learnedBtn.classList.toggle('word-card__hard-indicator_inactive', false);
            learnedBtn.classList.toggle('word-card__hard-indicator_active', true);
        }
        this.checkPage()
    }


  async listen() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;
      if (target.id === 'a1') {
        this.changeColorThem(colorThemes.a1, target);
      } else if (target.id === 'a2') {
        this.changeColorThem(colorThemes.a2, target);
      } else if (target.id === 'b1') {
        this.changeColorThem(colorThemes.b1, target);
      } else if (target.id === 'b2') {
        this.changeColorThem(colorThemes.b2, target);
      } else if (target.id === 'c1') {
        this.changeColorThem(colorThemes.c1, target);
      } else if (target.id === 'c2') {
        this.changeColorThem(colorThemes.c2, target);
      } else if (target.classList.contains('next')) {
        this.changePage(target);
      } else if (target.classList.contains('prev')) {
        this.changePage(target);
      } else if (target.classList.contains('word-card__transcript-icon')) {
        this.playSound(target.id);
      } else if (target.id === 'workBookButton') {
        this.showWorkBook();
        if (this.burger.isOpen === true && document.documentElement.clientWidth <= 420) {
          console.log(document.documentElement.clientWidth)
          this.burger.openCloseBurger()
        }
      } else if (target.classList.contains('word-card__button')) {
        this.addRemoveHard(target);
      } else if (target.classList.contains('word-card__learned-indicator')) {
        this.addRemoveLearned(target);
      } else if (target.classList.contains('header__burger-button')) {
        this.burger.openCloseBurger()
      } else if (target.classList.contains('header__nav-item')) {
        if (document.documentElement.clientWidth <= 420) {
          this.burger.openCloseBurger()
        }
      }
    });
  }
}
export default WorkBook;
