import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'

@Injectable()
export class AuthService {
    constructor(
        private auth: AngularFireAuth
    ) {}


    createUser(email: string, password: string) {
        return this.auth.createUserWithEmailAndPassword(email, password)
    }

    loginUser(email: string, password: string) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }
}