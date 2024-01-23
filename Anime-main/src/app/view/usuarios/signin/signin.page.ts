import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar: FormGroup;
  
  constructor(public alertController: AlertController,
    private _router : Router,
    public formbuilder: FormBuilder,
    private authService: AuthService) {

    this.formLogar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    })
  }

  ngOnInit() {
    this.formLogar = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get errorControl(){
    return this.formLogar.controls;
  }

  submitForm() : boolean {
    if (!this.formLogar.valid) {
      this.presentAlert("Anime", "Logar", "Todos os Campos são Obrigatórios!");
      return false;
    } else {
      this.logar()
      return true;
    }
  }

  private logar() : void{
    this.authService.signIn(this.formLogar.value['email'], this.formLogar.value['senha'])
    .then((res) => {
      this.presentAlert("Anime", "Logar", "Seja Bem vindo!");
      this._router.navigate(["/home"]);
    }).catch((error) => {
      this.presentAlert("Anime", "Logar", "Erro ao logar, Tente Novamente");
      console.log(error.message);
    })
  }

  public logarComGoogle() : void{
    this.authService.signInWithGoogle()
    .then((res) => {
      this.presentAlert("Anime", "Logar", "Seja Bem vindo!");
      this._router.navigate(["/home"]);
    }).catch((error) => {
      this.presentAlert("Anime", "Logar", "Erro ao logar, Tente Novamente!");
      console.log(error.message)
    })
  }

  public irParaSignUp() : void{
    this._router.navigate(["/signup"]);
  }

  async presentAlert(titulo: string, subtitulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
}