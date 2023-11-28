import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Catalogo } from 'src/app/model/entities/Catalogo';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  catalogo: Catalogo[] = [];

  constructor(private alertController: AlertController, private router: Router, private firebase: FirebaseService) {
    this.firebase.read().subscribe(res =>{
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
}

