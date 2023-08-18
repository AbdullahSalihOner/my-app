import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMHd1ODCfnBe-kJY0iDw1YW4q5KR0VFok",
    authDomain: "ecommerce-38875.firebaseapp.com",
    projectId: "ecommerce-38875",
    storageBucket: "ecommerce-38875.appspot.com",
    messagingSenderId: "954844699904",
    appId: "1:954844699904:web:87e7bf6c33c35e3aa4a7e5",
    measurementId: "G-7YFMGNYZV6"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app); // Use 'getStorage(app)' to get the storage service
  
  export { storage, app as default };




