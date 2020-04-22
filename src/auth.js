import { auth } from './firebase'


export const signup = (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password)
}

export const signin = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password)
}

export const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider()
    return auth().signInWithPopup(provider)
}
export const signOut = () => {
    return auth().signOut()
}