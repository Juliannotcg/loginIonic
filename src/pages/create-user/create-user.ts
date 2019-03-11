import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateConfirmPassword } from '../../app/validators/confirmPassword';

import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';


@IonicPage({
  name:'create-user'
})
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {
  
  registerForm: FormGroup;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController
    ) {
      this.registerForm = this.formbuilder.group({
        name: [null, [Validators.required, Validators.minLength(5)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, [Validators.required, Validators.minLength(6), ValidateConfirmPassword]]
      })
    }

    submitForm () {
      this.afAuth.auth.createUserWithEmailAndPassword(
        this.registerForm.value.email,
        this.registerForm.value.password)
        .then((response) => {
          this.presentAlert('Sucesso', 'Usuário cadastrado com sucesso');
          this.navCtrl.push(HomePage);
        }) 
        .catch((erro) => {
          console.log('Erro ao criar usuário', erro);
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
