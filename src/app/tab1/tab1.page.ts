import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersService } from '../modules/users.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private user:UsersService) {
  
  }

  ngOnInit() {
    this.user.listUsers().subscribe(datos =>{
      console.log(datos)
    })
  }

}
