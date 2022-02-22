import './styles/style.scss';
import Render from './components/render';
import Authorize from './components/authorize';
import Api from './server/api';
import WorkBook from './components/workBook';
import { wordsPage } from './utils/workBook/const';
import AudioCall from './components/game-audioCall/audio-call';
import Games from './utils/header-navigation/games';
import SprintController from './components/game-sprint/sprintController';
import Statistics from './components/statistics/statistics';
import RenderPage from './utils/renderPage';

const api = new Api();
api.getWords(wordsPage.page, wordsPage.category).then((r) => {
  const words = r;
  const workBook = new WorkBook(words);
  Render.render(words);
  WorkBook.checkAuthWorkBook();

  const renderPage = new RenderPage();
  const statistics = new Statistics();
  const authorize = new Authorize();
  const audioCall = new AudioCall();
  const sprint = new SprintController();
  const games = new Games();
  renderPage.init();
  games.init();
  audioCall.init();
  sprint.init();
  authorize.init();
  statistics.init();
});
