import { IUserToken } from '../utils/api/interfaces';
import { session, userDataParam } from '../utils/authorize/const';

class LocalStorage {
  setUserData(data: IUserToken) {
    userDataParam.push(data);
    localStorage.setItem('user-data', JSON.stringify(userDataParam));
  }

  getUserData(id: string[]) {
    if (localStorage.getItem('user-data')) {
      const data: IUserToken[] = JSON.parse(localStorage.getItem('user-data'));

      data.forEach((element) => {
        if (!id.includes(element.userId)) {
          userDataParam.push(element);
        }
      });
    }
  }

  setCurrentSession() {
    localStorage.setItem('session', JSON.stringify(session.currentSession));
  }

  getCurrentSession() {
    const value = JSON.parse(localStorage.getItem('session'));

    session.currentSession = value;
  }
}

export default LocalStorage;
