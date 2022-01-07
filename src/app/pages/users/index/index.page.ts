import { Component, OnInit } from '@angular/core';
import { NavController,ActionSheetController } from '@ionic/angular';
import { Subscription, forkJoin } from 'rxjs';
import { User, UsersService } from 'src/app/modules/users.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  usuarios: User[]
  listarUsuarios: any
  estado:boolean = true
  constructor( private navCtrl: NavController,
    private user:UsersService,
    private actionSheetController: ActionSheetController) { }

 
    ngOnInit() {
      console.log("entro");
      
      this.user.listUsers().subscribe(datos =>{
        console.log(datos)
      })
      //listar users
      this.listar_usuarios() 
    }

    listar_usuarios() {
      this.user.listarUsers().subscribe(datos => {
        this.listarUsuarios = datos
        console.log(this.listarUsuarios);
  
      })
    }

  crearUsuario() {
    this.navCtrl.navigateForward(['tabs/users/crear'])
  }
  
  async crud(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        /*{
          text: 'Ver',
          icon: 'eye',
          handler: () => {
            this.navCtrl.navigateForward(['tabs/fabricas1/ver-fabrica', item])
          }
        },*/
        {
          text: 'Modificar',
          icon: 'create',
          handler: () => {
            this.navCtrl.navigateForward(['/tabs/users/modificar', item])
          }
        },
        {
          text: item.estado?'Deshabilitar':'habilitar',
          icon: item.estado?'trash':'checkmark',
          handler: () => {
            this.user.cambiarEstadoUsuario(item.id,!item.estado)
          }
        }, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });

    await actionSheet.present();
  }
  verUsuario(item){
    this.navCtrl.navigateForward(['/tabs/users/ver', item])
  }
}
