import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  /**
   * Metodo para listar todos los estudiantes
   */
  getUsuarios(){
    return this.firestore.collection("estudiantes").snapshotChanges();
  }

  /**
   * crea un estudiante en firebase
   * @param estudiante estudiante a crear
   */
  createUsuario(estudiante:any){
    return this.firestore.collection("estudiantes").add(estudiante);
  }

  /**
   * actualiza un estudiante existente en firebase
   * @param id id de la coleccion en firebase
   * @param estudiante estudiante a actualizar
   */
  updateUsuario(id:any, estudiante:any){
    return this.firestore.collection("estudiantes").doc(id).update(estudiante);
  }


  /**
   * borrar un estudiante existente en firebase
   * @param id id de la coleccion en firebase
   */
  deleteUsuario(id:any){
    return this.firestore.collection("estudiantes").doc(id).delete();

  }
}
