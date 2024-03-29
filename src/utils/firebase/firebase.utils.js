import {initializeApp} from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
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

  const googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({
    // tell how google auth prov to behave
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = ()=>signInWithPopup(auth,googleProvider)
  export const signInWithGoogleRedirect =()=>signInWithRedirect(auth,googleProvider)

  //Database
  export const db = getFirestore()

  //adding documents methods here below
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field='title')=>{
  const collectionRef = collection(db,collectionKey) //colection reference
  const batch = writeBatch(db)

  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef,object)
  })
  await batch.commit()
  console.log("done adding documents")
}

  //getting data from db
export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db,'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const { title,items } = docSnapshot.data()
    acc[title.toLowerCase()] = items

    return acc
  },{})
  return categoryMap
}






  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    )=>{
      if(!userAuth)return;
    const userDocRef = doc(db, 'users', userAuth.uid)

    //console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    
    //if user data exists
    //retun useDocref
    //if user doesn't exist
    //create /seDoc with data from userAuth to my collection
    if(!userSnapshot.exists()){
      const { displayName,email } = userAuth
      const createdAt = new Date()

      try{
        await setDoc(userDocRef,{ 
          displayName,
          email,
          createdAt,
          ...additionalInformation, 
        })
      } catch(error){
        console.log("error when creating uer",error.message)
      }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password)
  }

  export const signInAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password)
  }

  export const signOutUser = async ()=> await signOut(auth);

  export const onAuthStateChangedListener = (callback)=>
   onAuthStateChanged( auth, callback )

/** async stream - need to give it a callback always
 * {
 * next: callback,
 * error: ,
 * complete: ,
 * }
 *  */ 