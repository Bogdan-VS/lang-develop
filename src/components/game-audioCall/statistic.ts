import { IWord } from '../../utils/api/interfaces';
import { audioCall } from './difference/const';
import Learned from '../learned';

class Statistic {
  private static learned: Learned;

  static getStatisticToCorrectWors(
    correctWord: HTMLSpanElement,
    uncorrectWord: HTMLSpanElement,
    title: HTMLElement,
    progress: number,
    currentCollection: string[],
    fullCollection: IWord[]
  ) {
    correctWord.textContent = `${currentCollection.length}`;
    uncorrectWord.textContent = `${
      fullCollection.length - currentCollection.length
    }`;

    if (progress < 50) {
      title.textContent = 'Нужно еще тренироваться!';
    }

    if (progress > 49 && progress < 75) {
      title.textContent = 'Ты не плохо справляешься!';
    }

    if (progress > 74 && progress < 100) {
      title.textContent = 'Почти отлично!';
    }

    if (progress === 100) {
      title.textContent = 'Ты знаешь все слова!';
    }

    audioCall.newWords = fullCollection;
  }

  static renderStatisticPage(
    page: string,
    firstPage: HTMLDivElement,
    secondPage: HTMLDivElement
  ) {
    if (page === 'page-1') {
      firstPage.style.left = '0';
      secondPage.style.left = '100%';
    }

    if (page === 'page-2') {
      firstPage.style.left = '-100%';
      secondPage.style.left = '0';
    }
  }

  static drawStatisticPage(
    mainContainer: HTMLDivElement,
    collection: IWord[],
    collectionWords: string[]
  ) {
    for (let i = 0; i < collection.length; i++) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('statistics-page__wrapper-item');
      wrapper.innerHTML = `
      <button class="statistics-page2__btn" data-statbtn="${i}">
        <svg display="none" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <symbol id="audio-call-statbtn" viewBox="0 0 122.88 96.65">
            <path d="M11,22.84H36.47L58.17,1A3.44,3.44,0,0,1,63,1a3.39,3.39,0,0,1,1,2.44h0V93.2a3.46,3.46,0,0,1-5.93,2.41L36.65,77.49H11a11,11,0,0,1-11-11V33.83a11,11,0,0,1,11-11Zm65.12,15a3.22,3.22,0,1,1,6.1-2,43.3,43.3,0,0,1,1.56,13.27c-.09,4.76-.78,9.44-2.13,12.21a3.23,3.23,0,1,1-5.8-2.83c.93-1.92,1.43-5.59,1.5-9.48a37.13,37.13,0,0,0-1.23-11.12Zm16.64-12a3.23,3.23,0,0,1,6-2.48c3,7.18,4.61,16.23,4.75,25.22s-1.17,17.72-4,24.77a3.22,3.22,0,1,1-6-2.4C96,64.64,97.15,56.66,97,48.6s-1.58-16.36-4.28-22.81Zm16.09-10.23a3.22,3.22,0,1,1,5.8-2.8,86.65,86.65,0,0,1,8.24,36.44c.09,12.22-2.37,24.39-7.73,34.77a3.22,3.22,0,0,1-5.73-3c4.88-9.43,7.11-20.56,7-31.77a80,80,0,0,0-7.6-33.69ZM37.89,29.74H11A4.11,4.11,0,0,0,6.9,33.83V66.51A4.11,4.11,0,0,0,11,70.6h26.9s2,.69,2.21.83L57.16,85.8v-74L40.52,28.53a3.46,3.46,0,0,1-2.63,1.21Z"/>
          </symbol>
        </svg>
        <svg class="audio-call__stat-img">
          <use xlink:href="#audio-call-statbtn"></use>
        </svg>
      </button>
      <span class="statistics-word__origin statistics-word__origin-${i}" data-word="${collection[i].word}">${collection[i].word}</span>
      <span class="statistics-dash">—</span>
      <span class="statistics-word__translate">${collection[i].wordTranslate}</span>
      <span class="statistics-mark statistics-mark-${i}" data-mark="${collection[i].word}"></span>
      `;

      mainContainer.append(wrapper);
    }

    const wrapper: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.statistics-page__wrapper-item'
    );
    Statistic.drawStatisticWords(wrapper, collectionWords);
    Statistic.drawStatisticMarks(wrapper, collectionWords);
  }

  static removeStatisticsPage() {
    const wrapper: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.statistics-page__wrapper-item'
    );

    if (wrapper) {
      wrapper.forEach((element) => {
        element.remove();
      });
    }
  }

  static drawStatisticWords(
    collection: NodeListOf<HTMLElement>,
    collectionWords: string[],
  ) {
    collection.forEach((element, index) => {
      const value: HTMLElement = document.querySelector(
        `.statistics-word__origin-${index}`
      );

      if (collectionWords.includes(value.dataset.word)) {
        value.style.color = '#4caf50';
      } else {
        value.style.color = '#f03e3d';
      }
    });
  }

  static drawStatisticMarks(
    collection: NodeListOf<HTMLElement>,
    collectionWords: string[]
  ) {
    collection.forEach((element, index) => {
      const value: HTMLElement = document.querySelector(
        `.statistics-mark-${index}`
      );

      if (collectionWords.includes(value.dataset.mark)) {
        value.style.background =
          'top 0 left 0 / 100% 100% url(./assets/svg/audio-call-check.svg)';
      } else {
        value.style.background =
          'top 0 left 0 / 100% 100% url(./assets/svg/audio-call-cross.svg)';
      }
    });
  }
}

export default Statistic;
