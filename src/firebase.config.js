import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const fbProvider = new FacebookAuthProvider()
const ggProvider = new GoogleAuthProvider()
const storage = getStorage(app)
const db = getFirestore(app)

export { auth, fbProvider, ggProvider, storage, db }
