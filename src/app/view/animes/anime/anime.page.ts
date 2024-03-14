import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Anime } from 'src/app/model/entities/Anime';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {

  id! : string;
  anime!: Anime;
  temporadas!: number;
  nome!: string;
  datalancamento!: Date;
  episodios!: number;
  estudio!: string;
  edicao: boolean = true;
  downloadURL: any;
  imagem! : any;
  user! : any;

  constructor(private alertController: AlertController,  private router: Router, private firebase: FirebaseService) { }

  ngOnInit() {
    this.anime = history.state.anime;
    this.temporadas = this.anime.temporadas;
    this.nome = this.anime.nome;
    this.datalancamento = this.anime.datalancamento;
    this.episodios = this.anime.episodios;
    this.estudio = this.anime.estudio;
    this.id = this.anime.id
    this.downloadURL = this.anime.downloadURL;
  }

  editar(){
    let novo: Anime = new Anime(this.nome, this.estudio, this.datalancamento, this.temporadas, this.episodios);
    novo.id = this.anime.id;
    novo.uid = this.user.uid;
    if(this.imagem){
      this.firebase.uploadImage(this.imagem, novo);
    }else{
      novo.downloadURL = this.anime.downloadURL;
      this.firebase.update(novo);
    }
    this.router.navigate(["/home"]);
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

  async confirmAlert(){
    const alert = await this.alertController.create({
      header: 'Animes',
      subHeader: 'ATENÇÃO',
      message: 'Deseja mesmo excluir o anime?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'EXCLUIR',
        role: 'exlcuir',
        cssClass: 'ion-color-danger',
        handler: () => {
          this.excluir();
        }
      }
      ],
    });
    await alert.present();
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  excluir(){
    this.firebase.delete(this.anime);
    this.router.navigate(['/home']);
  }

  habilitar(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  voltar(){
    this.router.navigate(["/home"]);
  }
}
