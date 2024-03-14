import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'src/app/common/alert.service';
import { Anime } from 'src/app/model/entities/Anime';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {

  animeForm: FormGroup;
  temporada!: number;
  nome!: string;
  datalancamento!: Date;
  imagem: any;
  episodios!: number;
  estudio!: string;
  user!: any;

  constructor(private router : Router,
    private firebase: FirebaseService,
    private alert: Alert,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    this.user = this.authService.getUsuarioLogado();
    this.animeForm = new FormGroup({
      nome: new FormControl(''),
      estudio: new FormControl(''),
      datalancamento: new FormControl(''),
      temporadas: new FormControl(''),
      episodios: new FormControl('')
    });
  }

  ngOnInit() {
    this.animeForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      estudio: ['', [Validators.required]],
      datalancamento: ['', [Validators.required]],
      temporadas: ['', [Validators.required]],
      episodios: ['', [Validators.required]]
    })
  }

  addanime(){
    let novo : Anime = new Anime(
      this.animeForm.value['nome'],
      this.animeForm.value['estudio'],
      this.animeForm.value['datalancamento'],
      this.animeForm.value['temporadas'],
      this.animeForm.value['episodios'],
      );
    novo.uid = this.user.uid;
    if(this.imagem){
      this.firebase.uploadImage(this.imagem, novo);
    }else{
      this.firebase.create(novo);
    }
    this.alert.presentAlert("Sucesso", "Anime Adicionado");
    this.router.navigate(["/home"]);
  }


  uploadFile(imagem: any) {
    this.imagem = imagem.files
  }

  voltar(){
    this.router.navigate(["/home"]);
  }

  submitForm(){
    if(!this.animeForm.valid){
      this.alert.presentAlert("Erro", "Erro ao Preencher os Campos");
      return false;
    }else{
      this.addanime();
      return true;
    }
  }
}
