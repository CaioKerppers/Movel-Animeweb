import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anime } from 'src/app/model/entities/Anime';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  animes: Anime[] = [];
  user: any;
  isLoading: boolean = false;

  constructor(private router: Router, private firebase: FirebaseService, private auth: AuthService) {
    this.user = this.auth.getUsuarioLogado();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.firebase.read(this.user.uid).subscribe(res =>{
      this.animes = res.map(anime =>{
        return{
          id: anime.payload.doc.id,
          ... anime.payload.doc.data() as any
        }as Anime;
      });
      this.isLoading = false;
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