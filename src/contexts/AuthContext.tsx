import firebase from "firebase";
import {createContext, ReactNode, useEffect, useState} from "react";
import { firebaseAuth } from "../services/firebase";

type AuthContextTypeProps = {
    children: ReactNode;
}

type AuthContextType = {
    user: User | undefined,
    signInWithGoogle: () => void
}
  
type User = {
id: string,
name: string,
avatar: string
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextTypeProps) {
    const [user, setUser] = useState<User>();
  
    //Efeitos colaterais na aplicação - Hook do React.
    useEffect(() => {
      const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
        if(user) {
          const {displayName, photoURL, uid} = user;
          if (!displayName || !photoURL) {
            throw new Error("Missing Information from Google Account.");
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          });
        }
      })
  
      //Boa prática
      return () => {
        unsubscribe()
      }
    }, []);
  
    function signInWithGoogle()
    {
      const provider = new firebase.auth.GoogleAuthProvider();
      
      firebaseAuth.signInWithPopup(provider).then(result => {
          if (result.user) {
              const {displayName, photoURL, uid} = result.user;
              if (!displayName || !photoURL) {
                throw new Error("Missing Information from Google Account.");
              }
              setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
              });
            }
        })
    }

    return(
    <AuthContext.Provider value={{user, signInWithGoogle}}>
    {props.children}
    </AuthContext.Provider>
    );
}