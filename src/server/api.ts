import { currentToken } from '../utils/api/const';
import { ErrorsCode, PathLink } from '../utils/api/enums';
import {
  ISettings,
  IStatistics,
  IUserData,
  IUsersAllWords,
  IUserToken,
  IWord,
} from '../utils/api/interfaces';

class Api {
  baseLink: string;

  constructor() {
    this.baseLink = 'https://rslang-learnwords.herokuapp.com';
  }

  async getWords(page: string, group: string) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.words}?page=${page}&group=${group}`
    );
    const words: IWord[] = await responce.json();

    return words;
  }

  async getWord(id: string) {
    const responce = await fetch(`${this.baseLink}${PathLink.wordId}${id}`);
    const word: IWord = await responce.json();

    return word;
  }

  async createNewUser(userData: IUserData) {
    const responce = await fetch(`${this.baseLink}${PathLink.user}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    try {
      if (responce.status === ErrorsCode.code200) {
        const userParam: IUserData = await responce.json();

        return userParam;
      }

      return responce.status;
    } catch (error) {
      return responce.status;
    }
  }

  async getUser(id: string) {
    const responce = await fetch(`${this.baseLink}${PathLink.user}/${id}`, {
      headers: {
        Authorization: `Bearer ${currentToken.token}`,
        Accept: 'application/json',
      },
    });

    try {
      const user: IUserData = await responce.json();

      return user;
    } catch (error) {
      return responce.status;
    }
  }

  async UpdateUser(id: string, userData: IUserData) {
    const responce = await fetch(`${this.baseLink}${PathLink.user}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        Authorization: `Bearer ${currentToken.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    try {
      const updateUser: IUserData = await responce.json();

      return updateUser;
    } catch (error) {
      return responce.status;
    }
  }

  async deleteUser(id: string) {
    const responce = await fetch(`${this.baseLink}${PathLink.user}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${currentToken.token}`,
        Accept: 'application/json',
      },
    });

    try {
      const user: {} = await responce.json();

      return user;
    } catch (error) {
      return responce.status;
    }
  }

  async getNewUserToken(id: string) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.tokens}`,
      {
        headers: {
          Authorization: `Bearer ${currentToken.token}`,
          Accept: 'application/json',
        },
      }
    );

    try {
      const userToken: IUserToken = await responce.json();

      return userToken;
    } catch (error) {
      return responce.status;
    }
  }

  async getAllUserWords(id: string) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.words}`,
      {
        headers: {
          Authorization: `Bearer ${currentToken.token}`,
          Accept: 'application/json',
        },
      }
    );

    try {
      const usersWords: IUsersAllWords[] = await responce.json();

      return usersWords;
    } catch (error) {
      return responce.status;
    }
  }

  async createUserWord(id: string, wordId: string, userWord: IUsersAllWords) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.words}/${wordId}`,
      {
        method: 'POST',
        body: JSON.stringify(userWord),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${currentToken.token}`,
        },
      }
    );

    try {
      const wordsData: IUsersAllWords = await responce.json();

      return wordsData;
    } catch (error) {
      return responce.status;
    }
  }

  async getUserWordById(id: string, wordId: string) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.words}/${wordId}`,
      {
        headers: {
          Authorization: `Bearer ${currentToken.token}`,
          Accept: 'application/json',
        },
      }
    );

    try {
      const wordsData: IUsersAllWords = await responce.json();

      return wordsData;
    } catch (error) {
      return responce.status;
    }
  }

  async updateUserWord(id: string, wordId: string, userWord: IUsersAllWords) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.words}/${wordId}`,
      {
        method: 'POST',
        body: JSON.stringify(userWord),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${currentToken.token}`,
        },
      }
    );

    try {
      const wordsData: IUsersAllWords = await responce.json();

      return wordsData;
    } catch (error) {
      return responce.status;
    }
  }

  async deleteUserWord(id: string, wordId: string) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.words}/${wordId}`,
      {
        headers: {
          Authorization: `Bearer ${currentToken}`,
          Accept: 'application/json',
        },
      }
    );

    try {
      const wordData: {} = await responce.json();

      return wordData;
    } catch (error) {
      return responce.status;
    }
  }

  async getUserAggregatedWordById(id: string, wordId: string) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.aggregatedWords}/${wordId}`,
      {
        headers: {
          Authorization: `Bearer ${currentToken.token}`,
          Accept: 'application/json',
        },
      }
    );

    try {
      const wordData: IUsersAllWords = await responce.json();

      return wordData;
    } catch (error) {
      return responce.status;
    }
  }

  async getStatistics(id: string) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.statistics}`,
      {
        headers: {
          Authorization: `Bearer ${currentToken.token}`,
          Accept: 'application/json',
        },
      }
    );

    try {
      const statistics: IStatistics = await responce.json();

      return statistics;
    } catch (error) {
      return responce.status;
    }
  }

  async apsertStatistics(id: string, wordStatistics: IStatistics) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.statistics}`,
      {
        method: 'PUT',
        body: JSON.stringify(wordStatistics),
        headers: {
          Authorization: `Bearer ${currentToken.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    try {
      const statistics: IStatistics = await responce.json();

      return statistics;
    } catch (error) {
      return responce.status;
    }
  }

  async getSettings(id: string) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.settings}`,
      {
        headers: {
          Authorization: `Bearer ${currentToken.token}`,
          Accept: 'application/json',
        },
      }
    );

    try {
      const settings: ISettings = await responce.json();

      return settings;
    } catch (error) {
      return responce.status;
    }
  }

  async apsertSettings(id: string, wordSettings: ISettings) {
    const responce = await fetch(
      `${this.baseLink}${PathLink.user}/${id}${PathLink.settings}`,
      {
        method: 'PUT',
        body: JSON.stringify(wordSettings),
        headers: {
          Authorization: `Bearer ${currentToken.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    try {
      const settings: ISettings = await responce.json();

      return settings;
    } catch (error) {
      return responce.status;
    }
  }

  async signIn(userData: IUserData) {
    const responce = await fetch(`${this.baseLink}${PathLink.signIn}`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    try {
      const userToken: IUserToken = await responce.json();

      return userToken;
    } catch (error) {
      const resp: IUserToken = { status: responce.status };
      return resp;
    }
  }
}

export default Api;
