class RenderPage {
  workBookPage: HTMLElement;

  mainPage: HTMLElement;

  statistics: HTMLElement;

  page: NodeListOf<HTMLElement>;

  mainPageButton: HTMLElement;

  workBookButton: HTMLElement;

  statisticsButton: HTMLElement;

  constructor() {
    this.workBookPage = document.getElementById('workBookPage');
    this.mainPage = document.getElementById('mainPage');
    this.statistics = document.getElementById('main-statistics');
    this.mainPageButton = document.getElementById('mainPageButton');
    this.workBookButton = document.getElementById('workBookButton');
    this.statisticsButton = document.getElementById('statisticsButton');
    this.page = document.querySelectorAll('.page');
  }

  init() {
    this.workBookButton.addEventListener('click', () =>
      this.renderPage(this.page, this.workBookPage)
    );
    this.mainPageButton.addEventListener('click', () =>
      this.renderPage(this.page, this.mainPage)
    );
    this.statisticsButton.addEventListener('click', () =>
      this.renderPage(this.page, this.statistics)
    );
  }

  renderPage(
    collectionPages: NodeListOf<HTMLElement>,
    activePage: HTMLElement
  ) {
    collectionPages.forEach((element) => {
      element.classList.add('hide');
    });

    activePage.classList.remove('hide');
  }
}

export default RenderPage;
