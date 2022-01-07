import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {UsersService } from 'src/app/modules/users.service';
import { NavController } from '@ionic/angular';
import { RolesService } from 'src/app/modules/roles.service';
@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  registerForm: FormGroup
  id
  listarRoles: any
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  constructor(private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService:UsersService,
    private rolesService: RolesService,
    private navCtrl: NavController) { 
    
    let params=route.snapshot.params
    console.log(params);
    this.id=params.id
    this.registerForm = this.formBuilder.group({
      nombres: [params.nombres,[Validators.required]],
      apellidos:[params.apellidos,[Validators.required]],
      ci:[params.ci,[Validators.required,Validators.pattern(this.numberRegEx)]],
      celular:[params.celular,[Validators.required,Validators.pattern(this.numberRegEx)]],
      direccion:[params.direccion,[Validators.required]],
      rol:[params.rol,[Validators.required]],
    });
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
  registrate() {
    console.log('en el metodo');
    this.userService.presentLoading("Modificando Usuario...")
    .then(load=>{
      this.userService.modificarUsuario(this.id,this.registerForm.value).then(() => {
        load.dismiss()
        this.userService.MessageToastSuccess("Usuario Modificado correctamente")
        this.navCtrl.back()
      }).catch(err => {
        console.log(err)
        load.dismiss()
        this.userService.MessageToastError("Error al modificar el usuario")
      });
    })
  }

}
