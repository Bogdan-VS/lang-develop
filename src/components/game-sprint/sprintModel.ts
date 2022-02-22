
import Api from '../../server/api';
import { IToken, IWord } from '../../utils/api/interfaces';

export default class SprintModel {
  gameWords: IWord[];

  gameFalseWords: Array<IWord['wordTranslate']>;

  words: IWord[];

  api: Api;

  currentToken: IToken;

  page: string;

  constructor() {
    this.api = new Api();
    this.words = [];
    this.gameWords = [];
    this.gameFalseWords = [];
    this.page = '0';
  }

  shuffleArray<T>(array: T[]): T[] {
    const result = array;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  async getSomeWords(group: string): Promise<IWord[]> {
    let page = parseInt(this.page, 10);
    const pages = new Set();
    while (pages.size < 1) {
      page = Math.floor(Math.random() * 29);
      pages.add(page);
    }
    const pagesArr = [...pages] as number[];
    const promiseArr = pagesArr.map((item) =>
      this.api.getWords(String(item), group)
    ) as Array<Promise<IWord[]>>;

    let data = await (await Promise.all(promiseArr)).flat(1);
    data = this.shuffleArray(data);
    this.gameWords = [];
    this.gameFalseWords = [];
    data.forEach((elem) => {
      this.gameWords.push(elem);
      this.gameFalseWords.push(elem.wordTranslate);
    });
    return this.gameWords;
  }

  async getWorkBookWords(group: string, page: string): Promise<IWord[]> {
    const  wPage = parseInt(page, 10);
    let pagesArr = [] as number[];
    if (wPage < 2) {
      for (let i = 0; i <= wPage; i += 1) {
        pagesArr.push(i);
      }
    }
    else {
      pagesArr = [wPage - 1, wPage - 2, wPage - 3];
    }
    const promiseArr = pagesArr.map((item) =>
    this.api.getWords(String(item), group)
    ) as Array<Promise<IWord[]>>;
    
    let data = await (await Promise.all(promiseArr)).flat(1);
    data = this.shuffleArray(data);
    this.gameWords = [];
    this.gameFalseWords = [];
    data.forEach((elem) => {
      this.gameWords.push(elem);
      this.gameFalseWords.push(elem.wordTranslate);
    });
    return this.gameWords;

  }

}
