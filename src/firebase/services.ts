import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from './config';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  CollectionReference,
  DocumentData,
  deleteField,
  updateDoc,
} from 'firebase/firestore';

const firestore = getFirestore();

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

interface IDeviceData {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: 'online' | 'offline';
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

export const addDevice = async (
  serialNumber: string,
  id: string,
  vendor: string,
  dateCreated: Date,
  status: 'online' | 'offline'
): Promise<void> => {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error('No hay un usuario autenticado actualmente.');
  }

  try {
    const usersRef = collection(db, `${uid}`);
    await setDoc(doc(usersRef, `${serialNumber}`), {
      devices: [1],
    });
  } catch (error) {
    console.log(error);
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
