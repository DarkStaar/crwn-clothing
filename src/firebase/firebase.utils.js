import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB8xGu5yEKJDfxhSeGZ4jKSsqk1DATIp4I",
    authDomain: "crwn-db-d13bf.firebaseapp.com",
    projectId: "crwn-db-d13bf",
    storageBucket: "crwn-db-d13bf.appspot.com",
    messagingSenderId: "67172179099",
    appId: "1:67172179099:web:3e9449a048806c8f657a3e",
    measurementId: "G-DJKXVHEFJB"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    console.log(snapShot);
    
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;