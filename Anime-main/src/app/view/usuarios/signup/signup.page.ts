import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from
'@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formCadastrar: FormGroup;

  constructor(public alertController: AlertController,
    private router : Router,
    public formbuilder: FormBuilder,
    private authService: AuthService) {
    
    this.formCadastrar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      confSenha: new FormControl('')
    })
  }

  ngOnInit() {
    this.formCadastrar = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl() {
    return this.formCadastrar.controls;
  }

  submitForm() {
    if (!this.formCadastrar.valid) {
      this.presentAlert("Agenda", "Cadastrar", "Todos os Campos são Obrigatórios!");
      return false;
    } else {
      this.cadastrar()
      return true;
    }
  }

  private cadastrar() : void{
    this.authService.signUpWithEmailPassword(this.formCadastrar.value['email'],
    this.formCadastrar.value['senha'])
    .then((res) => {
      this.presentAlert("Anime", "Cadastrar", "Seja Bem vindo!");
      this.router.navigate(["/signin"]);
    }).catch((error) => {
      this.presentAlert("Anime", "Cadastrar", "Erro no Cadastrar!");
      console.log(error.message);
    })
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