import {initializeApp} from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdFAj-TjuPeVGd4-EWJ0RH8UgzETjnTNw",
    authDomain: "capstone-db-74adc.firebaseapp.com",
    projectId: "capstone-db-74adc",
    storageBucket: "capstone-db-74adc.appspot.com",
    messagingSenderId: "742377144854",
    appId: "1:742377144854:web:afecf15e55a45b2f0eab37"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    // tell how google auth prov to behave
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = ()=>signInWithPopup(auth,provider)

  //Database
  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db, 'users',userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    //if user data exists
    //retun useDocref
    //if user doesn't exist
    //create /seDoc with data from userAuth to my collection
    if(!userSnapshot.exists()){
      const {displayName,email} = userAuth
      const createdAt = new Date()

      try{
        await setDoc(userDocRef,{displayName,email,createdAt})
      } catch(error){
        console.log("error when creating uer",error.message)
      }
    }
    return userDocRef;
  }