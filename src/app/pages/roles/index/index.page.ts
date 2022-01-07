import { Component, OnInit } from '@angular/core';
import { Rol, RolesService } from 'src/app/modules/roles.service';
import { NavController,ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor( private rolesService:RolesService,
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController) { }
  roles: Rol[]
  listarRoles: any
  estado:boolean = true
  ngOnInit() {
    this.listar_roles()
  }
  cambiarEstado(){
    
    console.log(this.estado)
  } 
  listar_roles() {
    this.rolesService.listarRoles().subscribe(datos => {
      this.listarRoles = datos
      console.log(this.listarRoles);

    })
  }

  crearRol() {
    this.navCtrl.navigateForward(['tabs/roles/crear'])
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
            this.navCtrl.navigateForward(['/tabs/roles/modificar', item])
          }

        },
        {
          text: item.estado?'Deshabilitar':'habilitar',
          icon: item.estado?'trash':'checkmark',
          handler: () => {
            this.rolesService.cambiarEstadoRol(item.id,!item.estado)
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

}
