import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private db: AngularFirestore
  ) { }
  listUsers() {
    return this.db.collection(`users`).snapshotChanges()
  }
  
}
