import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Catalogo } from 'src/app/model/entities/Catalogo';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  catalogo: Catalogo[] = [];
  user: any;

  constructor(private alertController: AlertController, private router: Router, private firebase: FirebaseService, private auth: AuthService) {
    this.user = this.auth.getUsuarioLogado();
    this.firebase.read(this.user.uid).subscribe(res =>{
      this.catalogo = res.map(catalogo =>{
        return{
          id: catalogo.payload.doc.id,
          ... catalogo.payload.doc.data() as any
        }as Catalogo;
      })
    })
  }

  RedirecionarParaAdicionar(){
    this.router.navigate(['/adicionar']);
  }

  AnimeDetalhes(catalogo : Catalogo){
    this.router.navigateByUrl("/anime", {state : {catalogo:catalogo}});
  }

  logout(){
    this.auth.signOut().then((res) => {
      this.router.navigate(["signin"]);
    })
  }
}

