import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/app/model/entities/Anime';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animes: Anime[] = [];
  user: any;

  constructor(private router: Router, private firebase: FirebaseService, private auth: AuthService) {
    this.user = this.auth.getUsuarioLogado();
    this.firebase.read(this.user.uid).subscribe(res =>{
      this.animes = res.map(anime =>{
        return{
          id: anime.payload.doc.id,
          ... anime.payload.doc.data() as any
        }as Anime;
      })
    })
  }

  RedirecionarParaAdicionar(){
    this.router.navigate(['/adicionar']);
  }

  AnimeDetalhes(anime : Anime){
    this.router.navigateByUrl("/anime", {state : {anime:anime}});
  }

  logout(){
    this.auth.signOut().then((res) => {
      this.router.navigate(["signin"]);
    })
  }
}