import Api from '../server/api';
import { currentToken } from '../utils/api/const';
import { IUserToken } from '../utils/api/interfaces';
import userData, { session } from '../utils/authorize/const';
import LocalStorage from './localStorage';

class Authorize {
  mainPage: HTMLElement;

  auth: HTMLFormElement;

  signIn: HTMLButtonElement;

  authClose: HTMLElement;

  subSignUpBtn: HTMLElement;

  signInAuth: HTMLElement;

  signUpAuth: HTMLElement;

  signUpBtn: HTMLButtonElement;

  api: Api;

  localStorage: LocalStorage;

  errorMessage: HTMLElement;

  errorMessageSignIn: HTMLElement;

  sucssesSignInMessage: HTMLElement;

  sucssesMessageBtn: HTMLButtonElement;

  signOutAuth: HTMLElement;

  authContainer: NodeListOf<Element>;

  signOutMessageBtn: HTMLButtonElement;

  constructor() {
    this.api = new Api();
    this.localStorage = new LocalStorage();
    this.mainPage = document.getElementById('mainPage');
    this.auth = document.getElementById('auth') as HTMLFormElement;
    this.signIn = document.getElementById('sign-in') as HTMLButtonElement;
    this.authClose = document.getElementById('auth-close');
    this.subSignUpBtn = document.getElementById('sub-sign-up__btn');
    this.signInAuth = document.getElementById('sign-in__auth');
    this.signUpAuth = document.getElementById('sign-up__auth');
    this.errorMessage = document.getElementById('error-message');
    this.errorMessageSignIn = document.getElementById('error-message__signin');
    this.sucssesSignInMessage = document.getElementById('sign-message');
    this.signOutAuth = document.getElementById('siout-message');
    this.authContainer = document.querySelectorAll('.sign');
    this.signOutMessageBtn = document.getElementById(
      'signout-message-btn'
    ) as HTMLButtonElement;
    this.sucssesMessageBtn = document.getElementById(
      'message-btn'
    ) as HTMLButtonElement;
    this.signUpBtn = document.getElementById(
      'sign-up__btn'
    ) as HTMLButtonElement;
  }

  init() {
    this.checkAuth();
    this.signIn.addEventListener('click', this.openAuthorize.bind(this));
    this.authClose.addEventListener('click', this.closeAuthorize.bind(this));
    this.subSignUpBtn.addEventListener('click', this.openSignUp.bind(this));
    this.signUpAuth.addEventListener('submit', this.signUpUser.bind(this));
    this.signInAuth.addEventListener('submit', this.signInUser.bind(this));
    this.signOutMessageBtn.addEventListener(
      'click',
      this.clearLocalStorage.bind(this)
    );
    this.sucssesMessageBtn.addEventListener(
      'click',
      this.closeAuthorize.bind(this)
    );
  }

  openAuthorize() {
    this.auth.classList.add('auth__active');

    if (session.currentSession) {
      this.addShowOrHide(this.signInAuth, this.signOutAuth);
      this.sucssesSignInMessage.classList.add('hide');
      this.signIn.textContent = 'Выход';
    }
  }

  closeAuthorize() {
    this.auth.classList.remove('auth__active');
    this.errorMessage.classList.add('hide');
    this.errorMessageSignIn.classList.add('hide');

    setTimeout(() => this.addShowOrHide(this.signUpAuth, this.signInAuth), 250);
  }

  openSignUp() {
    this.addShowOrHide(this.signInAuth, this.signUpAuth);
  }

  async signUpUser(event: Event) {
    event.preventDefault();

    const name = document.getElementById(
      'auth-signup__name'
    ) as HTMLInputElement;
    const email = document.getElementById(
      'auth-signup__email'
    ) as HTMLInputElement;
    const password = document.getElementById(
      'auth-signup__password'
    ) as HTMLInputElement;

    userData.name = name.value;
    userData.email = email.value;
    userData.password = password.value;

    const userResponce = await this.api.createNewUser(userData);

    if (typeof userResponce !== 'number') {
      const userParam = await this.api.signIn(userData);

      this.errorMessage.classList.add('hide');
      this.signIn.textContent = 'Выход';
      session.currentSession = true;

      this.localStorage.setCurrentSession();
      this.addCurrentUserParams(userParam.userId, userParam.token);
      this.localStorage.setUserData(userParam);
      this.addShowOrHide(this.signUpAuth, this.sucssesSignInMessage);
    } else {
      this.errorMessage.classList.remove('hide');
    }
  }

  async signInUser(event: Event) {
    event.preventDefault();

    const email = document.getElementById(
      'auth-signin__email'
    ) as HTMLInputElement;
    const password = document.getElementById(
      'auth-signin__password'
    ) as HTMLInputElement;

    const userParam = await this.api.signIn({
      email: email.value,
      password: password.value,
    });

    if (userParam.status) {
      this.errorMessageSignIn.classList.remove('hide');
    } else {
      this.signIn.textContent = 'Выход';
      session.currentSession = true;

      this.localStorage.setCurrentSession();

      this.addShowOrHide(this.signInAuth, this.sucssesSignInMessage);
      this.errorMessageSignIn.classList.add('hide');
      this.localStorage.getUserData([userParam.userId]);
      this.localStorage.setUserData(userParam);
      this.addCurrentUserParams(userParam.userId, userParam.token);
    }
  }

  checkAuth() {
    if (localStorage.getItem('user-data')) {
      const userAuthData: IUserToken[] = JSON.parse(
        localStorage.getItem('user-data')
      );

      this.addCurrentUserParams(
        userAuthData[userAuthData.length - 1].userId,
        userAuthData[userAuthData.length - 1].token
      );
    }

    if (localStorage.getItem('session')) {
      this.localStorage.getCurrentSession();
      this.signIn.textContent = 'Выход';
    }
  }

  addCurrentUserParams(userId: string, userToken: string) {
    currentToken.id = userId;
    currentToken.token = userToken;
  }

  addShowOrHide(firstName: HTMLElement, secondName: HTMLElement) {
    firstName.classList.add('hide');
    secondName.classList.remove('hide');
  }

  clearLocalStorage() {
    this.auth.classList.remove('auth__active');
    setTimeout(
      () => this.addShowOrHide(this.signOutAuth, this.signInAuth),
      250
    );
    session.currentSession = false;
    this.signIn.textContent = 'Вход';
    localStorage.clear();
  }
}

export default Authorize;
