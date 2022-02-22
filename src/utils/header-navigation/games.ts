class Games {
  gameBtn: HTMLElement;

  gameMenu: HTMLElement;

  constructor() {
    this.gameBtn = document.getElementById('games');
    this.gameMenu = document.querySelector('.nav__sub-menu');
  }

  init() {
    this.gameBtn.addEventListener('click', this.openGameContainer.bind(this));
  }

  openGameContainer() {
    this.gameMenu.classList.toggle('nav__sub-menu-active');
  }
}

export default Games;
