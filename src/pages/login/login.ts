import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';

@IonicPage({
name: 'login'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public afAuth: AngularFireAuth,
     public alertCtrl: AlertController
     ) {
        this.loginForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]]
      })
  }

  submitForm () {
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email,
      this.loginForm.value.password)
      .then((response) => {
        this.navCtrl.push(HomePage);
      }) 
      .catch((erro) => {
        this.presentAlert('Erro', 'Senha incorreta.');
      })
  }

  presentAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
