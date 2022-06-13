import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';
import {EMPTY, map, tap,} from "rxjs";
import { Store } from 'store';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser
export interface User {
    email: string,
    uid: string,
    authenticated: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService implements OnInit {
  auth$: any;
  authSubscriber: any;
  auth: any;




 

  constructor(
    private fireAuth: AngularFireAuth,
    private store: Store,
    private af: AngularFireAuth
       
  ){}
   
  ngOnInit(): void {
    // this.authSubscriber = onAuthStateChanged(this.auth,  user => {
    //   if (user) {
    //     console.log("zalogowany")
    //   } else {
    //     console.log("niezalogowany")
    //   }
    // });
  // this.auth$ = this.af.authState.pipe(tap(next =>{
  //   if(next) {
  //     this.store.set('user', null)   
  //   }
  //   const user: User ={
  //     email: 'next.email',
  //     uid: 'next.uid',
  //     authenticated: true
  //   };
  //   this.store.set('user', user)
  //   }))
  //   console.log("xxx",this.auth$)
  //   }
    // this.auth$.onAuthStateChanged((user: any) => {
    //   if (user) 
    //   {
    //     console.log('ZALOGOWANY: ', user);
    //   } 
    //   else 
    //   {
    //     console.log('NIEZALOGOWANY');
    //   }
    // })
    // console.log("xxxxxx" ,this.auth$)
  }


  

    createUser(email: string, password: string) {
      return this.af.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user;
      })}

    loginUser(email: string, password: string) {
        return this.af.signInWithEmailAndPassword(email, password).then((userCredential) => {
          const user = userCredential.user;
        })
    }

  }


