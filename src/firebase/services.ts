import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from './config';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';

export interface PropsRegister {
  email: string;
  password: string;
}

export interface IGatewayData {
  serialNumber: string;
  name: string;
  ipAddress: string;
  devices: IDeviceData[];
}

export interface IDeviceData {
  uid: string;
  vendor: string;
  dateCreated: string;
  status: string;
}

export const createGateway = async (
  serialNumber: string,
  name: string,
  ipAddress: string
): Promise<void> => {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error('No hay un usuario autenticado actualmente.');
  }

  try {
    const usersRef = collection(db, `${uid}`);
    await setDoc(doc(usersRef, `${serialNumber}`), {
      serialNumber,
      name,
      ipAddress,
      devices: [],
    } as IGatewayData);
  } catch (error) {
    console.log(error);
  }
};

export const deleteGateways = async (
  serialNumbers: string[]
): Promise<boolean> => {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error('No hay un usuario autenticado actualmente.');
  }

  try {
    const usersRef = collection(db, `${uid}`);

    const promises = serialNumbers.map(async (item) => {
      const docRef = doc(usersRef, `${item}`);
      await deleteDoc(docRef);
    });

    await Promise.all(promises);

    return true;
  } catch (error) {
    return false;
  }
};

export const editGateway = async (
  serialNumber: string | undefined,
  name: string,
  ipAddress: string,
  devices: IDeviceData[]
): Promise<any> => {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error('There is no user authenticated');
  } else if (!serialNumber)
    throw new Error('You have to pass a valid serialNumber');

  try {
    const usersRef = collection(db, `${uid}`);
    await setDoc(doc(usersRef, `${serialNumber}`), {
      serialNumber,
      name,
      ipAddress,
      devices,
    } as IGatewayData);
    return true;
  } catch (error) {
    return error;
  }
};

// Función para crear una colección de periféricos para un gateway existente
export const getUserData = async (uid: string): Promise<IGatewayData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, uid));

    const data: IGatewayData[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as IGatewayData);
    });

    return data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    return [];
  }
};

//------------- AUTH--------------

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
