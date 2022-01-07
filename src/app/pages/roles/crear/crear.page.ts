import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/modules/users.service';
import { NavController } from '@ionic/angular';
import { RolesService } from 'src/app/modules/roles.service';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  registerForm: FormGroup
  constructor(private db: AngularFirestore,
    private formBuilder:FormBuilder, 
    private usersService: UsersService,
    private rolesService: RolesService,
    private navCtrl: NavController) { 
   this.registerForm = this.formBuilder.group({
     tipo: '',
   }) 
 }

  ngOnInit() {
  }

  registrate(){ 
    this.usersService.presentAlertConfirm("Seguro que desea guardar el Rol",
    ()=>{
      this.usersService.presentLoading("Guardando Rol...")
      .then(load=>{
        this.rolesService.crearRol(this.registerForm.value.tipo)         
        
        load.dismiss()
          this.usersService.MessageToastSuccess("rol guardado correctamente")
          this.navCtrl.back()
      })
    })

  }
  

}
