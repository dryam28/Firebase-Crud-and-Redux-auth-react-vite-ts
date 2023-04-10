import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './config';

export interface PropsRegister {
  email: string;
  password: string;
}

export const signUpWithCredentials = async ({
  email,
  password,
}: PropsRegister) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    return resp;
  } catch (e) {
    return e;
  }
};

export const loginWithCredentials = async ({
  email,
  password,
}: PropsRegister) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);

    return resp;
  } catch (e) {
    return e;
  }
};

export const logoutFirebase = async () => await auth.signOut();

export const checkAuthSession = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          resolve(null);
          return;
        }
        resolve(user);
      },
      reject
    );
  });
};
