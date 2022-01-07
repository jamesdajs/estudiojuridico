import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  constructor(private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService:UsersService,
    private navCtrl: NavController,
    private rolesService:RolesService,) { 
    let params=route.snapshot.params
    console.log(params);
    this.id=params.id
    this.registerForm = this.formBuilder.group({
      tipo: [params.tipo],
    });

  }

  ngOnInit() {
  }

  registrate() {
    console.log('en el metodo');
    this.userService.presentLoading("Modificando Rol...")
    .then(load=>{
      this.rolesService.modificarRol(this.id,this.registerForm.value).then(() => {
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
