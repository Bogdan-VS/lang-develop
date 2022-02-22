import { IUserData, IUserToken } from '../api/interfaces';

const userData: IUserData = {
  name: null,
  email: null,
  password: null,
};

export const session = {
  currentSession: false,
};

export const userDataParam: IUserToken[] = [];

export default userData;
