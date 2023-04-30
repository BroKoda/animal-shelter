import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/global.scss'
import { BrowserRouter } from 'react-router-dom'
import BaseRouter from './router/BaseRouter'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJ88-VUOir2OHR2jtdWBSflkudy5V9Qb4",
  authDomain: "animal-shelter-f88f2.firebaseapp.com",
  projectId: "animal-shelter-f88f2",
  storageBucket: "animal-shelter-f88f2.appspot.com",
  messagingSenderId: "652475399725",
  appId: "1:652475399725:web:e2d7a71de647aaebdc02a4"
};

const app = initializeApp(firebaseConfig);

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseRouter/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
