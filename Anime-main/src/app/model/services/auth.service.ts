import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, browserPopupRedirectResolver, GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioDados: any;

  constructor(public firebase: FirebaseService,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone ) {
  
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.usuarioDados = user;
        localStorage.setItem('user', JSON.stringify(this.usuarioDados));
      } else {
        localStorage.setItem('user', 'null');
      }
    })
  }

  // Login in with email/password
  public signIn(email : string, password : string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  public signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }

  public signUpWithEmailPassword(email : string, password : string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }
  
  //Recupera Senha - Implementaremos no futuro
  public recoverPassword(email : string) {
    return this.fireAuth.sendPasswordResetEmail(email)
  }

  // Sign-out
  public signOut(){
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signIn']);
    })
  }

  // Retorna se o usuário está logado
  public isLoggedIn(): boolean {
    const user : any = JSON.parse(localStorage.getItem('user') || 'null');
    return (user !== null) ? true : false;
  }

  // Retorna dados do usuário logado
  public getUsuarioLogado(){
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if(user!= null){
      return user;
    }else{
      return null;
    }
  }
}