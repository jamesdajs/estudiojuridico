import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore:Firestore) { }

  getUsers(){
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef);
  }
}
