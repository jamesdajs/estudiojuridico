import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController,LoadingController, AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

export interface User{
  id?:string
  nombres?:string
  apellidos?:string
  ci?:string
  email?:string
  celular?:string
  direccion?:string
  estado?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private db: AngularFirestore,
    public toastController:ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }
  listUsers() {
    return this.db.collection(`users`).snapshotChanges()
  }
  
  listUsers1(){
    return this.db.collection('users').snapshotChanges()
  }
  //crear Usuario
  crearUsuario(data){
    return this.db.collection('users').add(data)
  }

//listar usuarios
listarUsers() {
  return this.db.collection('users').snapshotChanges().pipe(map(dat => {
    return dat.map(a => {
      const data = a.payload.doc.data() as User;
      data.id = a.payload.doc.id;
      return data;
    })
  }))
}


 //modificar usuario
 modificarUsuario(uid: string, data: User) {
  console.log(uid, data);
  return this.db.collection('users').doc(uid).set(data, { merge: true })
}
 //cambiar estado usuario
 cambiarEstadoUsuario(uid: string, estado: boolean) {
  console.log(uid, estado);
  return this.db.collection('users').doc(uid).set({estado}, { merge: true })
}

  // toast
  async MessageToastSuccess(message){
    const toast = await this.toastController.create({
      message,
      color:"success",
      duration:3000,
    });
    toast.present();
  }
  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message: message,
    });
    await loading.present();
    return loading
  }

    ///metodos para mensajes
    async MessageToastError(message){
      const toast = await this.toastController.create({
        message,
        color:"danger",
        duration:3000,
      });
      toast.present();
    }


    async presentAlertConfirm(text,confirm:Function,cancel?:Function) {
      const alert = await this.alertController.create({
        message: text,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              cancel?cancel():""
            }
          }, {
            text: 'Aceptar',
            handler: () => {
              confirm()
            }
          }
        ]
      });
    
      await alert.present();
    }

}
