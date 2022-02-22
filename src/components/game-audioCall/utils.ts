import { currentToken } from '../../utils/api/const';
import { IWord } from '../../utils/api/interfaces';
import countPageToChepter, { series } from './difference/const';
import AudioCallLink from './difference/enum';
import Learned from '../learned';
import WorkBook from '../workBook';

class Utils {
  private static learned: Learned;

  static renderPage(activePage: HTMLElement, preloader: HTMLElement) {
    const pageCollection = document.querySelectorAll('.audio-game');

    pageCollection.forEach((element) => {
      element.classList.add('hide');
    });

    preloader.classList.add('preloader-page-active');

    setTimeout(() => {
      activePage.classList.remove('hide');
      preloader.classList.remove('preloader-page-active');
    }, 2000);
  }

  static renderChapterState(
    activeConteiner: HTMLElement,
    activeBtn: HTMLElement
  ) {
    activeConteiner.classList.toggle('settings-chapter__active');
    activeBtn.classList.toggle('audio-call__arrow-active');
  }

  static getRandomNumber(min: number, max: number) {
    const minValue = Math.ceil(min);
    const maxValue = Math.floor(max);

    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }

  static getCurrentChapter(collection: NodeListOf<HTMLInputElement>) {
    let value = '';

    collection.forEach((element) => {
      if (element.checked) {
        value = element.value;
      }
    });

    return value;
  }

  static addAnimationToRepeatWord(
    activeClass: HTMLElement,
    deactiveClass: HTMLElement
  ) {
    activeClass.classList.add('active-block');
    deactiveClass.classList.remove('active-block');
  }

  static addAnimationWordsCollection(
    activeClass: HTMLElement,
    className: string
  ) {
    activeClass.classList.toggle(`${className}`);
  }

  static getRandomNumbers(collection: number[], count: number, max: IWord[]) {
    while (collection.length < count) {
      const value = Utils.getRandomNumber(
        countPageToChepter.minCountWords,
        max.length - 1
      );
      if (!collection.includes(value)) {
        collection.push(value);
      }
    }

    return collection;
  }

  static async getAudioTrack(link: string) {
    const responce = await fetch(`${countPageToChepter.link}${link}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${currentToken.token}`,
      },
    });

    try {
      const track: string = await responce.json();

      return track;
    } catch (error) {
      return responce.url;
    }
  }

  static async getWordImg(link: string) {
    const responce = await fetch(`${countPageToChepter.link}${link}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${currentToken.token}`,
      },
    });

    try {
      const word: string = await responce.json();

      return word;
    } catch (error) {
      return responce.url;
    }
  }

  static getAnswer(
      sucssesWord: string,
      currentWord: string,
      target: HTMLElement,
      track: HTMLAudioElement,
      correctSucssesWord: string[],
      wordToCheck?: IWord
  ) {
    this.learned = new Learned()
    if (sucssesWord === currentWord) {
      series.current += 1;
      const sucsses = document.querySelectorAll('.call-number')[
        +`${+target.dataset.number - 1}`
      ] as HTMLElement;
      sucsses.style.color = '#fff0';
      sucsses.style.width = '25px';
      sucsses.style.height = '25px';
      sucsses.style.left = '-10px';
      sucsses.style.opacity = '1';
      sucsses.style.background =
        'top 0 left 0 / 100% 100% url(./assets/svg/audio-call-check.svg)';
      Utils.playSound(track, AudioCallLink.correctSound);
      correctSucssesWord.push(currentWord);
    } else {
      if (this.learned.isLearned(wordToCheck)) {
        const index = WorkBook.learnedArr.indexOf(wordToCheck);
        WorkBook.learnedArr.splice(index, 1)
      }

      if (series.current > series.general) {
        series.general = series.current;
        series.current = 0;
      } else {
        series.current = 0;
      }
      Utils.playSound(track, AudioCallLink.uncorrectSound);
      target.style.textDecoration = 'line-through';
      const collection: NodeListOf<HTMLElement> = document.querySelectorAll(
        '.audio-call__collection-item'
      );

      collection.forEach((element) => {
        if (!(element.dataset.audioword === currentWord)) {
          element.style.opacity = '0.3';
        }
      });
    }
    console.log(WorkBook.learnedArr)
  }

  static async repeatedWord(src: string, track: HTMLAudioElement) {
    const audio = await Utils.getAudioTrack(src);

    track.src = `${audio}`;
    track.play();
  }

  static playSound(track: HTMLAudioElement, src: string) {
    track.src = `${src}`;
    track.play();
  }

  static resetStyleAnswer() {
    const collection: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.audio-call__collection-item'
    );

    collection.forEach((element) => {
      element.style.opacity = '0.8';
      element.style.textDecoration = 'none';
    });
  }

  static getCorrectAnswer(collection: string[], fullCollection: IWord[]) {
    const result = (collection.length * 100) / fullCollection.length;

    return result;
  }

  static drawSwipeItem(target: HTMLElement) {
    const collection = document.querySelectorAll('.swipe-container__item');

    collection.forEach((element) => {
      element.classList.remove('swipe-container__item-active');
    });

    target.classList.add('swipe-container__item-active');
  }

  static updateStyleToGame(
    audio: HTMLButtonElement,
    words: HTMLElement,
    arrow: HTMLElement,
    repeatContainer: HTMLElement,
    playBtn: HTMLButtonElement
  ) {
    if (arrow.classList.contains('arrow-active')) {
      arrow.classList.remove('arrow-active');
    }

    if (!words.classList.contains('audio-call__collection-active')) {
      words.classList.add('audio-call__collection-active');
    }

    if (words.classList.contains('audio-call__collection-disabled')) {
      words.classList.remove('audio-call__collection-disabled');
    }

    if (!audio.classList.contains('active-block')) {
      audio.classList.add('active-block');
    }

    if (repeatContainer.classList.contains('active-block')) {
      repeatContainer.classList.remove('active-block');
    }

    playBtn.style.color = '#fff';
  }
}

export default Utils;
