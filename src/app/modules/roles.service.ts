import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
export interface Rol{
  id?:string
  nombre?:string
  estado?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private db: AngularFirestore) { }
  //crear roles
  crearRol(data){
    return this.db.collection('roles').add({
      tipo: data,
      estado: true          
    })
  }
//listar rol
listarRoles() {
  return this.db.collection('roles').snapshotChanges().pipe(map(dat => {
    return dat.map(a => {
      const data = a.payload.doc.data() as Rol;
      data.id = a.payload.doc.id;
      return data;
    })
  }))
}

//listar rol state
listarRolesEstado(estado:boolean) {
  let query=res=>res.where("estado","==",estado)
  return this.db.collection('roles',query).snapshotChanges().pipe(map(dat => {
    return dat.map(a => {
      const data = a.payload.doc.data() as Rol;
      data.id = a.payload.doc.id;
      return data;
    })
  }))
}
 //modificar rol
 modificarRol(uid: string, data: Rol) {
  console.log(uid, data);
  return this.db.collection('roles').doc(uid).set(data, { merge: true })
}
 //cambiar estado rol
 cambiarEstadoRol(uid: string, estado: boolean) {
  console.log(uid, estado);
  return this.db.collection('roles').doc(uid).set({estado}, { merge: true })
}

}
