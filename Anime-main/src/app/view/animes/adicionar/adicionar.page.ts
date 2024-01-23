import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Catalogo } from 'src/app/model/entities/Catalogo';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {

  temporada!: number;
  nome!: string;
  datalancamento!: Date;
  imagem: any;
  episodios!: number;
  estudio!: string;
  id!: string;
  user!: any;

  constructor(private router : Router, private firebase: FirebaseService, private alertController: AlertController, private authService: AuthService) {
    this.user = this.authService.getUsuarioLogado();
  }

  ngOnInit() {
  }

  addanime(){
    if(this.nome && this.temporada && this.datalancamento && this.episodios && this.estudio){
      let novo : Catalogo = new Catalogo(this.nome, this.temporada , this.datalancamento, this.episodios, this.estudio, this.id);
      novo.uid = this.user.uid;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }else{
        this.firebase.create(novo);
      }
      this.presentAlert("Sucesso", "Anime Adicionado");
      this.router.navigate(["/home"]);
    }else{
      this.presentAlert("Erro", "Preencha os campos obrigatórios!");
    }
  }


  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Animes',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }


  uploadFile(imagem: any) {
    this.imagem = imagem.files
  }

  voltar(){
    this.router.navigate(["/home"]);
  }
}
