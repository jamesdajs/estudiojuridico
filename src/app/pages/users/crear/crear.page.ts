import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  listarRoles: any
  constructor(private db: AngularFirestore,
     private formBuilder:FormBuilder, 
     private usersService: UsersService,
     private rolesService: RolesService,
     private navCtrl: NavController) { 
    this.registerForm = this.formBuilder.group({
      nombres: ['',[Validators.required]],
      apellidos:['',[Validators.required]],
      ci:['',[Validators.required,Validators.pattern(this.numberRegEx)]],
      email:['',[Validators.required,Validators.email]],
      celular:['',[Validators.required,Validators.pattern(this.numberRegEx)]],
      direccion:['',[Validators.required]],
      rol:['',[Validators.required]],
      estado:true
    }) 
  }

  ngOnInit() {
    this.listar_roles()
  }
  listar_roles() {
    this.rolesService.listarRolesEstado(true).subscribe(datos => {
      this.listarRoles = datos
      console.log(this.listarRoles);

    })
  }
  registrate(){ 
    this.usersService.presentAlertConfirm("Seguro que desea guardar al usuario",
    ()=>{
      this.usersService.presentLoading("Guardando Usuario...")
      .then(load=>{
        this.usersService.crearUsuario(this.registerForm.value)
        load.dismiss()
          this.usersService.MessageToastSuccess("usuario guardado correctamente")
          this.navCtrl.back()
      })
    })

  }
  
  
}
