import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBJ88-VUOir2OHR2jtdWBSflkudy5V9Qb4',
  authDomain: 'animal-shelter-f88f2.firebaseapp.com',
  projectId: 'animal-shelter-f88f2',
  storageBucket: 'animal-shelter-f88f2.appspot.com',
  messagingSenderId: '652475399725',
  appId: '1:652475399725:web:e2d7a71de647aaebdc02a4'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }