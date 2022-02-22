import { IWord } from '../utils/api/interfaces';
// eslint-disable-next-line import/no-cycle
import WorkBook from './workBook';
import { colorThemes } from '../utils/workBook/enums';
import SprintView from './game-sprint/sprintView';

class Render {
  private workBook: WorkBook;

  constructor() {
    this.workBook = new WorkBook();
    WorkBook.checkAuthWorkBook();
  }

  static render = (words?: IWord[]) => {
    const html = `<header class="header">
  <div class="container header__container">
    <div class="header__logo" id="logo">RSLang.</div>
    <nav class="header__nav">
      <ul class="header__nav-container">
        <li class="header__nav-item text"><a href="#" class="header__nav-item" id="mainPageButton">Главная</a></li>
        <li class="header__nav-item text"><a href="#" class="header__nav-item" id="workBookButton">Учебник</a></li>
        <li class="header__nav-item text" id="games">Игры
          <ul class="nav__sub-menu">
            <li class="sub-menu__item" id="callAudio-game"><a href="#">Аудио-вызов</a></li>
            <li class="sub-menu__item" id="sprint-game"><a href="#">Спринт</a></li>
          </ul>
        </li>
        <li class="header__nav-item text" id="statisticsButton"><a href="#" class="header__nav-item">Статистика</a></li>
      </ul>
    </nav>
    <div class="header__burger-button"></div>
    <button class="button" id="sign-in">Вход</button>
  </div>
</header>
<main>
${Render.renderAudioCall()}
${Render.renderSprint()}
${Render.preloader()}
${Render.renderAuthorize()}
${Render.statistics()}
<div class="page" id="mainPage">
${Render.renderMainPage()}
</div>
<div class="page hide" id="workBookPage">${Render.renderWorkBookPage(
      words
    )}</div>
</main>
<footer>
  <div class="container footer-container">
    <div class="logo footer-logo header__logo">RSLang</div>
    <div class="footer__block">
      <div>
        <span class="text">Меню</span>
        <nav class="footer-nav">
          <ul class="navigation footer-navigation">
            <li class="footer-nav__item"><a href="#">Главная</a></li>
            <li class="footer-nav__item"><a href="#">Учебник</a></li>
            <li class="footer-nav__item"><a href="#">Статистика</a></li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="footer__block">
      <div>
        <span class="text">Разработчики</span>
        <nav class="footer-nav">
          <ul class="navigation footer-navigation">
            <li class="footer-nav__item"><a href="https://github.com/SashaLado">SashaLado</a></li>
            <li class="footer-nav__item"><a href="https://github.com/Bogdan-VS">Bogdan-VS</a></li>
            <li class="footer-nav__item"><a href="https://github.com/geekedger">Geekedger</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <div class="footer__sub-block">
  ©2022 RS LANG. Project for <a href="https://rs.school/js/">RS School</a>
</div>
</footer>`;
    const root = document.createElement('div');
    root.innerHTML = html;
    root.id = 'root';
    document.body.appendChild(root);
  };

  public static renderMainPage = () => `<section class="main-section id="first">
    <div class="container section-container main-container">
      <div class="main-section__text-container">
        <h1 class="title">RS Lang</h1>
        <p class="text">Изучай английский быстро и эффективно. Никаких школьных правил!</p>
        <button class="button main-section__button book">Начать</button>
      </div>
      <div class="main-img"></div>
    </div>
  </section>
  <section class="advantages-section">
    <div class="container section-container">
      <h2>Почему именно мы?</h2>
      <div class="advantages__container">
        <div class="advantages__item">
          <div class="advantages__icon" id="icon1"></div>
          <h3 class="underlined-title">Нескучные игры</h3>
          <p class="text">Игровая механика доказала свою эффективность для всех возрастов.</p>
        </div>
        <div class="advantages__item">
          <div class="advantages__icon" id="icon2"></div>
          <h3 class="underlined-title">Удобный словарь</h3>
          <p class="text">Учись по программе, созданной экспертами в области лингвистики.</p>
        </div>
        <div class="advantages__item">
          <div class="advantages__icon" id="icon3"></div>
          <h3 class="underlined-title">Только нужные слова</h3>
          <p class="text">Слова собраны исходя из статистики их использования носителями языка.</p>
        </div>
        <div class="advantages__item">
          <div class="advantages__icon" id="icon4"></div>
          <h3 class="underlined-title">Отслеживание запоминания слов</h3>
          <p class="text">Наша миссия — сделать обучения языкам доступным для каждого.</p>
        </div>
      </div>
      <button class="advantages__button button" id="advantages__button">Войти</button>
    </div>
  </section>
  <section class="developers-section">
    <div class="container section-container">
      <h2>Познакомимся?</h2>
      <div class="developers__wrapper">
        <div class="developer__card">
          <img class="developer__img" src="./assets/img/sasha.jpeg" alt="">
          <div class="developer__text-block">
            <h3 class="developer__title">Саша</h3>
            <div class="developer__role">Front-end developer</div>
            <p class="text">Занималась разработкой учебника, списками избранных и сложных слов, а также главной страницей.</p>
          </div>
        </div>
        <div class="developer__card">
          <div class="developer__text-block">
            <h3 class="developer__title">Богдан</h3>
            <div class="developer__role">Front-end developer</div>
            <p class="text">Занимался связью с сервером и всем, что с ним связано. А также игрой Аудио-вызов и сбором статистики.</p>
          </div>
          <img class="developer__img" src="./assets/img/bogdan.jpg" alt="">
        </div>
        <div class="developer__card">
          <img class="developer__img" src="./assets/img/grisha.jpg" alt="">
          <div class="developer__text-block">
            <h3 class="developer__title">Гриша</h3>
            <div class="developer__role">Front-end developer</div>
            <p class="text">Главной целью стала игра Спринт, а также сбор статистики по этой игре и по общему плану.</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  static renderWorkBookPage = (
    words: IWord[]
  ) => `<div class="container work-book__container">
      <h2>Учебник</h2>
      <div class="levels-wrapper">
        <button class="level-button level-a1" id="a1">
          Easy A1
        </button>
        <button class="level-button level-a2" id="a2">
          Easy A2
        </button>
        <button class="level-button level-b1" id="b1">
          Medium B1
        </button>
        <button class="level-button level-b2" id="b2">
          Medium B2
        </button>
        <button class="level-button level-c1" id="c1">
          Hard C1
        </button>
        <button class="level-button level-c2" id="c2">
          Hard C2
        </button>
        <button class="level-button hard-button" id="hardLevel" style="display: none">
          Сложные
        </button>
      </div>
        <div class="levels__pagination">
          <button class="pagination__item pagination__arrow prev">←</button>
          <span id="page" class="page-num">1</span>
          <button class="pagination__item pagination__arrow next">→</button>
        </div>
      <div class="words-container">${Render.renderWordsContainer(
        words,
        colorThemes.a1.color
      )}</div>
      <div class="games-part__container">
        <h2>Попробуй свои силы</h2>
        <div class="games-wrapper">
          <button class="games__item level-button" id="sprint-Btn">
            <h2>Спринт</h2>
            <p class="text">Как можно быстрее определи верный перевод слова или нет.</p>
          </button>
          <button class="games__item level-button" id="audioCall-Btn">
            <h2>Аудиовызов</h2>
            <p class="text">Попробуй понять, какое слово было произнесено.</p>
          </button>
        </div>
      </div>
      </div>
    </div>`;

  static renderWordsContainer = (words: IWord[], color?: string) => `
    ${words
      .map(
        (word) => `
${WorkBook.renderWordCard(word, color)}
  `
      )
      .join('')}`;

  private static renderAuthorize = () => `
  <div class="auth" id="auth" action="#">
    <div class="auth__wrapper">
      <form id="sign-in__auth" class="sign" action="#">
        <h2 class="auth__title">Вход в аккаунт</h2>
        <div class="auth__conteiner">
          <div class="auth__container-item">
            <input type="email" placeholder="Почта" name="email" required id="auth-signin__email">
            <label for="email"></label>
          </div>
          <div class="auth__container-item">
            <input type="password" placeholder="Пароль" name="password" min="8" max="30" required id="auth-signin__password">
            <label for="password"></label>
          </div>
        </div>
        <div class="error-message__conteiner error-signin hide" id="error-message__signin">
          <span>Не корректный пароль или почта</span>
        </div>
        <div class="button-conteiner">
          <button type="submit" class="auth__button" id="sign-in__btn">Войти</button>
        </div>
        <div class="auth__subtitle">
          <p>У вас нет аккаунта?</p>
          <h4 class="auth__subtitle-item" id="sub-sign-up__btn">Зарегистрируйтесь сейчас</h4> 
        </div>
      </form>
      <form class="sign hide" id="sign-up__auth" action="form">
        <h2 class="auth__title">Регистрация</h2>
        <div class="auth__conteiner">
          <div class="auth__container-item">
            <input type="text" placeholder="Имя" name="name" required id="auth-signup__name">
            <label for="name"></label>
          </div>
          <div class="auth__container-item">
            <input type="email" placeholder="Почта" name="email" required id="auth-signup__email">
            <label for="email"></label>
          </div>
          <div class="auth__container-item">
            <input type="password" placeholder="Пароль" name="password" min="8" max="30" required id="auth-signup__password">
            <label for="password"></label>
          </div>
        </div>
        <div class="error-message__conteiner hide" id="error-message">
          <span>Такой пользователь уже существует</span>
        </div>
        <div class="button-conteiner">
          <button type="submit" class="auth__button auth__button-sing-up" id="sign-up__btn">Зарегестрироваться</button>
        </div>
      </form>
      <div class="sign hide" id="sign-message">
        <h3 class="sign-message">Авторизация прошла успешно!</h3>
        <div class="sign-message__container">
          <button class="button sign-message__btn" id="message-btn">Ок</button>
        </div>
      </div>
      <div class="sign hide" id="siout-message">
        <h3 class="sign-message">Вы точно желаете выйти?</h3>
        <div class="sign-message__container">
          <button class="button siout-message__btn" id="signout-message-btn">Да</button>
        </div>
      </div>
    </div>
    <div class="auth__close" id="auth-close"></div>
  </div>
  `;

  private static renderAudioCall = () => `
  <section class="audio-call-container hide" id="audio-call">
    <div class="audio-call__wrapper">
      <div class="audio-call__start-container audio-game" id="game-start-cont">
        <h4 class="audio-call__title">Аудиовызов</h4>
        <p class="audio-call__subtitle">
          Тренировка улучшает восприятие речи на слух
        </p>
        <button class="audio-call__btn" id="audio-call__start-btn">Начать</button>
      </div>
      <div class="audio-call__play-container audio-game hide" id="game-play-cont">
        <audio src="#" id="audio-call__track"></audio>
        <div class="audio-call__repeat-container">
          <button class="play-btn active-block" id="audio-call__repeat-btn">
            <svg display="none" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <symbol id="audio-call-btn" viewBox="0 0 122.88 96.65">
                <path d="M11,22.84H36.47L58.17,1A3.44,3.44,0,0,1,63,1a3.39,3.39,0,0,1,1,2.44h0V93.2a3.46,3.46,0,0,1-5.93,2.41L36.65,77.49H11a11,11,0,0,1-11-11V33.83a11,11,0,0,1,11-11Zm65.12,15a3.22,3.22,0,1,1,6.1-2,43.3,43.3,0,0,1,1.56,13.27c-.09,4.76-.78,9.44-2.13,12.21a3.23,3.23,0,1,1-5.8-2.83c.93-1.92,1.43-5.59,1.5-9.48a37.13,37.13,0,0,0-1.23-11.12Zm16.64-12a3.23,3.23,0,0,1,6-2.48c3,7.18,4.61,16.23,4.75,25.22s-1.17,17.72-4,24.77a3.22,3.22,0,1,1-6-2.4C96,64.64,97.15,56.66,97,48.6s-1.58-16.36-4.28-22.81Zm16.09-10.23a3.22,3.22,0,1,1,5.8-2.8,86.65,86.65,0,0,1,8.24,36.44c.09,12.22-2.37,24.39-7.73,34.77a3.22,3.22,0,0,1-5.73-3c4.88-9.43,7.11-20.56,7-31.77a80,80,0,0,0-7.6-33.69ZM37.89,29.74H11A4.11,4.11,0,0,0,6.9,33.83V66.51A4.11,4.11,0,0,0,11,70.6h26.9s2,.69,2.21.83L57.16,85.8v-74L40.52,28.53a3.46,3.46,0,0,1-2.63,1.21Z"/>
              </symbol>
            </svg>
            <svg class="audio-call__img">
              <use xlink:href="#audio-call-btn"></use>
            </svg>
          </button>
          <div class="audio-call__repeat-sucsses-container" id="repeat-sucsses-container">
            <span class="repeat-word-img"></span>
            <div class="repeat-sucsses__subtitle-container">
              <button class="audio-call__subtitle-repeat-btn" id="audio-call__subtitle-repeat-btn">
                <svg display="none" xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <symbol id="audio-call__subtitle-btn" viewBox="0 0 122.88 96.65">
                    <path d="M11,22.84H36.47L58.17,1A3.44,3.44,0,0,1,63,1a3.39,3.39,0,0,1,1,2.44h0V93.2a3.46,3.46,0,0,1-5.93,2.41L36.65,77.49H11a11,11,0,0,1-11-11V33.83a11,11,0,0,1,11-11Zm65.12,15a3.22,3.22,0,1,1,6.1-2,43.3,43.3,0,0,1,1.56,13.27c-.09,4.76-.78,9.44-2.13,12.21a3.23,3.23,0,1,1-5.8-2.83c.93-1.92,1.43-5.59,1.5-9.48a37.13,37.13,0,0,0-1.23-11.12Zm16.64-12a3.23,3.23,0,0,1,6-2.48c3,7.18,4.61,16.23,4.75,25.22s-1.17,17.72-4,24.77a3.22,3.22,0,1,1-6-2.4C96,64.64,97.15,56.66,97,48.6s-1.58-16.36-4.28-22.81Zm16.09-10.23a3.22,3.22,0,1,1,5.8-2.8,86.65,86.65,0,0,1,8.24,36.44c.09,12.22-2.37,24.39-7.73,34.77a3.22,3.22,0,0,1-5.73-3c4.88-9.43,7.11-20.56,7-31.77a80,80,0,0,0-7.6-33.69ZM37.89,29.74H11A4.11,4.11,0,0,0,6.9,33.83V66.51A4.11,4.11,0,0,0,11,70.6h26.9s2,.69,2.21.83L57.16,85.8v-74L40.52,28.53a3.46,3.46,0,0,1-2.63,1.21Z"/>
                  </symbol>
                </svg>
                <svg class="audio-call__img">
                  <use xlink:href="#audio-call__subtitle-btn"></use>
                </svg>
              </button>
              <span class="audio-call__repeat-text"></span>
            </div>
          </div>
        </div>
        <ol class="audio-call__collection audio-call__collection-active">
          <li class="audio-call__collection-item" data-count="1"><span class="call-number">1</span>lorem</li>
          <li class="audio-call__collection-item" data-count="2"><span class="call-number">2</span>lorem</li>
          <li class="audio-call__collection-item" data-count="3"><span class="call-number">3</span>lorem</li>
          <li class="audio-call__collection-item" data-count="4"><span class="call-number">4</span>lorem</li>
          <li class="audio-call__collection-item" data-count="5"><span class="call-number">5</span>lorem</li>
        </ol>
        <button class="audio-call__btn" id="audio-call__play-btn">
          Не знаю
          <svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <symbol id="audio-call__play-btn-img" viewBox="0 0 122.88 96.65">
              <path d="M41.762,27.26v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669c1.066,0.616,1.066,2.155,0,2.771L42.562,63.048   c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771   L44.161,25.875C43.095,25.259,41.762,26.029,41.762,27.26z"/>
              <path d="M83.537,48.608L44.161,25.875c-0.193-0.112-0.395-0.164-0.597-0.19l37.972,21.923c1.066,0.616,1.066,2.155,0,2.771   L42.161,73.112c-0.1,0.058-0.205,0.092-0.308,0.126c0.308,0.914,1.401,1.398,2.308,0.874l39.375-22.733   C84.603,50.763,84.603,49.224,83.537,48.608z"/>
              <path d="M41.762,27.26v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669   c1.066,0.616,1.066,2.155,0,2.771L42.562,63.048c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385   l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771L44.161,25.875C43.095,25.259,41.762,26.029,41.762,27.26z"/>
              <path d="M14.664,27.273v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669c1.066,0.616,1.066,2.155,0,2.771L15.464,63.061   c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771   L17.063,25.888C15.997,25.272,14.664,26.042,14.664,27.273z"/>
              <path d="M56.438,48.621L17.063,25.888c-0.193-0.112-0.395-0.164-0.597-0.19l37.972,21.923c1.066,0.616,1.066,2.155,0,2.771   L15.063,73.125c-0.1,0.058-0.205,0.092-0.308,0.126c0.308,0.914,1.401,1.398,2.308,0.874l39.375-22.733   C57.505,50.776,57.505,49.237,56.438,48.621z"/>
              <path d="M14.664,27.273v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669   c1.066,0.616,1.066,2.155,0,2.771L15.464,63.061c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385   l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771L17.063,25.888C15.997,25.272,14.664,26.042,14.664,27.273z"/>
            </symbol>
          </svg>
          <svg class="audio-call__play-arrow">
            <use xlink:href="#audio-call__play-btn-img"></use>
          </svg>
        </button>
      </div>
      <div class="audio-call__statistics audio-game hide" id="audio-call__statistics">
        <div class="audio-call__statistics-page">
          <div class="statistics-page__main-container">
            <div class="call__statistics-page statistics__page-1">
              <h3 class="call__statistics-title">Отличный результат</h3>
              <div class="statistics-subtitle__container">
                <p class="call__statistics-subtitle">Изучено слов:
                  <span class="statistics-subtitle__item-1" id="call-statistics__studied">5</span>
                </p>
                <p class="call__statistics-subtitle">На изучении:
                  <span class="statistics-subtitle__item-2" id="call-statistics__not-studied">15</span>
                </p>
              </div>
              <div class="diagram-container">
                <div class="diagram-container__item">
                  <canvas class="audio-call__canvas" id="audio-call__canvas"></canvas>
                  <span class="audio-call__canvas-procent" id="audio-call__canvas-procent"></span>
                </div>
              </div>
            </div>
            <div class="call__statistics-page statistics__page-2">

            </div>
          </div>
          <div class="swipe-container">
            <span class="swipe-container__item swipe-container__item-active" data-statistic="page-1"></span>
            <span class="swipe-container__item" data-statistic="page-2"></span>
          </div>
          <div class="call-statistics__bnt-container">
            <button class="call-statistics__btn" id="statistics-btn-repeat">Повторить игру</button>
            <button class="call-statistics__btn" id="statistics-btn-end">Закончить игру</button>
          </div>
        </div>
      </div>
      <div class="audio-call__settings" id="audio-call__setting">
        <h4 class="audio-call__settings-title">Выберете раздел</h4>
        <button class="audio-call__settings-btn" id="audio-call__settings-btn">
          <svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <symbol id="audio-call__settings-img" viewBox="0 0 122.88 96.65">
              <path d="M41.762,27.26v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669c1.066,0.616,1.066,2.155,0,2.771L42.562,63.048   c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771   L44.161,25.875C43.095,25.259,41.762,26.029,41.762,27.26z"/>
              <path d="M83.537,48.608L44.161,25.875c-0.193-0.112-0.395-0.164-0.597-0.19l37.972,21.923c1.066,0.616,1.066,2.155,0,2.771   L42.161,73.112c-0.1,0.058-0.205,0.092-0.308,0.126c0.308,0.914,1.401,1.398,2.308,0.874l39.375-22.733   C84.603,50.763,84.603,49.224,83.537,48.608z"/>
              <path d="M41.762,27.26v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669   c1.066,0.616,1.066,2.155,0,2.771L42.562,63.048c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385   l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771L44.161,25.875C43.095,25.259,41.762,26.029,41.762,27.26z"/>
              <path d="M14.664,27.273v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669c1.066,0.616,1.066,2.155,0,2.771L15.464,63.061   c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771   L17.063,25.888C15.997,25.272,14.664,26.042,14.664,27.273z"/>
              <path d="M56.438,48.621L17.063,25.888c-0.193-0.112-0.395-0.164-0.597-0.19l37.972,21.923c1.066,0.616,1.066,2.155,0,2.771   L15.063,73.125c-0.1,0.058-0.205,0.092-0.308,0.126c0.308,0.914,1.401,1.398,2.308,0.874l39.375-22.733   C57.505,50.776,57.505,49.237,56.438,48.621z"/>
              <path d="M14.664,27.273v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669   c1.066,0.616,1.066,2.155,0,2.771L15.464,63.061c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385   l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771L17.063,25.888C15.997,25.272,14.664,26.042,14.664,27.273z"/>
            </symbol>
          </svg>
          <svg class="audio-call__arrow">
            <use xlink:href="#audio-call__settings-img"></use>
          </svg>
        </button>
        <div class="audio-call__settings-chapter" id="audio-call__settings-chapter">
          <div class="settings-chapter__container">
            <input type="radio" name="chapter" id="chapter-1" class="settings-chapter__container-item" value="0" checked></input>
            <label for="chapter-1">Раздел 1</label>
          </div>
          <div class="settings-chapter__container">
            <input type="radio" name="chapter" id="chapter-2" class="settings-chapter__container-item" value="1"></input>
            <label for="chapter-2">Раздел 2</label>
          </div>
          <div class="settings-chapter__container">
            <input type="radio" name="chapter" id="chapter-3" class="settings-chapter__container-item" value="2"></input>
            <label for="chapter-3">Раздел 3</label>
          </div>
          <div class="settings-chapter__container">
            <input type="radio" name="chapter" id="chapter-4" class="settings-chapter__container-item" value="3"></input>
            <label for="chapter-4">Раздел 4</label>
          </div>
          <div class="settings-chapter__container">
            <input type="radio" name="chapter" id="chapter-5" class="settings-chapter__container-item" value="4"></input>
            <label for="chapter-5">Раздел 5</label>
          </div>
          <div class="settings-chapter__container">
            <input type="radio" name="chapter" id="chapter-6" class="settings-chapter__container-item" value="5"></input>
            <label for="chapter-6">Раздел 6</label>
          </div>
          <button class="audio-call__btn" id="audio-call__ok-btn">Ок</button>
        </div>
      </div>
      <div class="audio-call__regulation" id="audio-call-regulation">
        <button class="audio-call__regulation-btn" id="audio-call__regulation-btn">
          <svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <symbol id="audio-call__regulation-img" viewBox="0 0 122.88 96.65">
              <path d="M41.762,27.26v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669c1.066,0.616,1.066,2.155,0,2.771L42.562,63.048   c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771   L44.161,25.875C43.095,25.259,41.762,26.029,41.762,27.26z"/>
              <path d="M83.537,48.608L44.161,25.875c-0.193-0.112-0.395-0.164-0.597-0.19l37.972,21.923c1.066,0.616,1.066,2.155,0,2.771   L42.161,73.112c-0.1,0.058-0.205,0.092-0.308,0.126c0.308,0.914,1.401,1.398,2.308,0.874l39.375-22.733   C84.603,50.763,84.603,49.224,83.537,48.608z"/>
              <path d="M41.762,27.26v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669   c1.066,0.616,1.066,2.155,0,2.771L42.562,63.048c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385   l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771L44.161,25.875C43.095,25.259,41.762,26.029,41.762,27.26z"/>
              <path d="M14.664,27.273v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669c1.066,0.616,1.066,2.155,0,2.771L15.464,63.061   c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771   L17.063,25.888C15.997,25.272,14.664,26.042,14.664,27.273z"/>
              <path d="M56.438,48.621L17.063,25.888c-0.193-0.112-0.395-0.164-0.597-0.19l37.972,21.923c1.066,0.616,1.066,2.155,0,2.771   L15.063,73.125c-0.1,0.058-0.205,0.092-0.308,0.126c0.308,0.914,1.401,1.398,2.308,0.874l39.375-22.733   C57.505,50.776,57.505,49.237,56.438,48.621z"/>
              <path d="M14.664,27.273v8.294c0,0.571,0.305,1.1,0.8,1.385l20.212,11.669   c1.066,0.616,1.066,2.155,0,2.771L15.464,63.061c-0.495,0.286-0.8,0.814-0.8,1.385v8.294c0,1.231,1.333,2.001,2.399,1.385   l39.375-22.733c1.066-0.616,1.066-2.155,0-2.771L17.063,25.888C15.997,25.272,14.664,26.042,14.664,27.273z"/>
            </symbol>
          </svg>
          <svg class="audio-call__regulation-arrow" id="audio-call__regulation-arrow">
            <use xlink:href="#audio-call__regulation-img"></use>
          </svg>
        </button>
        <h4 class="audio-call__regulation-title">Правила игры</h4>
        <div class="audio-call__discription" id="audio-call-discription">
          <p class="audio-call__discription-item">
            В этой игре вы должны правильно указать перевод озвученого слова.
          </p>
          <p class="audio-call__discription-item">
            Если вы начинаете игру со страницы учебника, то все слова находящиеся на странице попадут в игру.
          </p>
          <p class="audio-call__discription-item">
            Если вы начинаете игру с главной страницы, то вы можете выбрать уровень сложности. Всего в игре шесть уровней сложности, которые соответствуют каждому разделу из учебника. Так же есть 7 раздел, в котором находятся сложные для изучения слова. Чтобы запустить игру с этими словами нужно перейти в этот раздел и кликнуть на игру.  
          </p>
          <p class="audio-call__discription-item">
            В самой игре так же предусмотрено управление с клавиатуры.<br>
            Пробел - переход к следующему слову.<br>
            Клавиша к или r - повторить слово.<br>
            Цифры 1, 2, 3, 4, 5 - выбор слова.<br>
          </p>
          <p class="audio-call__discription-item">
            Приятной вам игры!
          </p>
        </div>
      </div>
      <span class="audio-call__close" id="audio-call__close"></span>
    </div>
  </section>
  `;

  private static renderSprint = () => `
  <section class="game__startScreen hide" id="startScreen">
  <h2 class="game__startScreen-title">Sprint</h2>
  <p class="game__startScreen-desc">Ваша задача указать, совпадают ли слово и перевод<br>По кнопкам можко кликать
    мышкой или нажимать на клавиатуре стрелку влево(Верно), стрелку вправо(Неверно)</p>
    <button class="button fill" id="startGame">Начать</button>
    <a class="button prevBtn fill" href="#/">
    <div>Назад</div>
    <b class="prevBtn-left"></b></a>
    <div class="levels" id="levels">
    ${SprintView.renderLevels()}
    <div class="game__sprint__user-words-block">
   </div> 
  </section>
    <div class="resultPopup">
      <div class="resultPopup__wrap">
        <div class="resultPopup__title">Ошибок<span class="resultPopup__errors"></span></div>
        <div class="resultPopup__fail"></div>
        <div class="resultPopup__title">Знаю<span class="resultPopup__correct"></span></div>
        <div class="resultPopup__success"></div>
        <div class="resultPopup__btns"><button class="button fill" id="closePopup">Закрыть</button>
          <button class="button fill" id="restartGame">Играть</button>
          </div>
      </div>
    </div>
  <section class="game__sprint hide">
    <div class="game__sprint__wrap">
      <div class="game__sprint__main-field">
        <div class="game__sprint__question-wrapper">
          <button class="game__sprint__sound">
            <span class="game__sprint__button__content">
             ${SprintView.renderSoundIcon('#fff')} 
            </span>
          </button>
          <div class="game__sprint__score"></div>
          <div class="game__sprint__btn-sound"></div>
          <div class="game__sprint__bonus-field">
            <div class="game__sprint__bonus__check" id="current_Bonus">
              <div class="game__sprint__bonus__area__1 empty" id="current_Bonus__area__1"></div>
              <div class="game__sprint__bonus__area__2 empty" id="current_Bonus__area__2"></div>
              <div class="game__sprint__bonus__area__3 empty" id="current_Bonus__area__3"></div>
            </div>
            <div class="game__sprint__bonus_note">
              <span></span>
            </div>
            <div class="game__sprint__bonus__area__count" id="game__sprint__bonus__area__count">
              <div class="game__sprint__bonus__item item1" id="game__sprint__bonus__item1"></div>
              <div class="game__sprint__bonus__item" id="game__sprint__bonus__item2"></div>
              <div class="game__sprint__bonus__item" id="game__sprint__bonus__item3"></div>
              <div class="game__sprint__bonus__item" id="game__sprint__bonus__item4"></div>
              <div class="game__sprint__bonus__area__branch"></div>
            </div>
          </div>
          <div class="game__sprint__word"></div>
          <div class="game__sprint__translation"></div>
        </div>
      </div>
      <div class="game__sprint__btns-field">
        <div class="game__sprint__btns-wrap">
          <button
            class="button btn-false" id="falseBtn">
            <span class="game__sprint__btns__content">
              <span>Неверно</span>
            </span>
          </button>
          <button
            class="button btn-true" id="trueBtn">
            <span class="game__sprint__btns__content">
              <span>Верно</span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="game__sprint__time__block">
      <div class="game__sprint__time__block_svg"><svg class="timer_svg" width="150" height="150">
          <circle class="circle" cx="80" cy="80" r="60"  transform='rotate(-90 75 77)'></circle>
          <text class="circle-text" x="50%" y="50%" dy=".3em" text-anchor="middle" style="fill: rgb(255, 255, 255);">||</text>
        </svg></div>
      <div class="game__sprint__time__count"></div>
    </div>
    <div class="game__sprint__exit">
      <a class="close" href="/#/games">
        <svg class="svg_icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#fff" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg> 
      </a>
    </div>
    </div>
  </section>
  <div class="game__preloader hide__loader">
    <div class="game__loader__count"></div>
    <div class="game__loader"></div>
    <p class="game__loader-desc text">Приготовьтесь</p>
 </div>`;

  private static preloader = () => `
  <div class="preloader-page" id="preloader-page">
    <span class="loader-page__item">Загрузка...</span>
  </div>
  `;

  private static statistics = () => `
  <section class="main-statistics page hide" id="main-statistics">
    <div class="main-statistics__wrapper">
      <h3 class="main-statistics__title">Статистика за сегодня</h3>
      <div class="main-statistics__container-btn">
        <button class="container-btn__item item-left" id="audio-call__statistics-item">Аудиовызов</button>
        <button class="container-btn__item item-center" id="sprint__statistics-item">Спринт</button>
        <button class="container-btn__item item-right" id="general__statistics-item">Общая статистика</button>
      </div>
      <div class="statistics__main-container">
        <div class="main-container__wrapper" id="statistics-game__container"></div>
        <span class="stat-message" id="stat-message">Статистика доступна только для авторизованных пользоателей</span>
      </div>
    </div>
  </section>
  `;

  static changePage(target: HTMLButtonElement) {
    if (target.classList.contains('logo') || target.id === 'mainPageButton') {
    }
  }
}

export default Render;
