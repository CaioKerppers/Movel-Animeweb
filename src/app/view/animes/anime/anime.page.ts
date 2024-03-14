import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'src/app/common/alert.service';
import { Anime } from 'src/app/model/entities/Anime';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {

  anime!: Anime;
  edicao: boolean = true;
  imagem! : any;
  user! : any;
  animeForm: FormGroup;
  textoBotao: string = "Editar";

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firebase: FirebaseService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private alert: Alert
    ){
      this.user = this.auth.getUsuarioLogado();
      this.anime = history.state.anime;
      this.animeForm = new FormGroup({
        nome: new FormControl(this.anime.nome),
        estudio: new FormControl(this.anime.estudio),
        datalancamento: new FormControl(this.anime.datalancamento),
        temporadas: new FormControl(this.anime.temporadas),
        episodios: new FormControl(this.anime.episodios)
      });
  }

  ngOnInit() {
  }

  editar(form: FormGroup){
    let novo: Anime = new Anime(
      form.value['nome'],
      form.value['estudio'],
      form.value['datalancamento'],
      form.value['temporadas'],
      form.value['episodios'],
      );
    novo.id = this.anime.id;
    novo.uid = this.user.uid;
    if(this.imagem){
      this.firebase.uploadImage(this.imagem, novo);
    }else{
      novo.downloadURL = this.anime.downloadURL;
      this.firebase.update(novo);
    }
    this.alert.presentAlert("Sucesso", "Anime Editado");
    this.router.navigate(["/home"]);
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
