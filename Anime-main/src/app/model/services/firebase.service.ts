import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Catalogo } from '../entities/Catalogo';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = 'catalogos'

  constructor(private firestore: AngularFirestore, private storage : AngularFireStorage) { }

  create(catalogo: Catalogo){
    return this.firestore.collection(this.PATH).add({nome: catalogo.nome, temporada: catalogo.temporada, datalancamento: catalogo.datalancamento, episodios: catalogo.episodios, estudio:catalogo.estudio});
  }

  createWithAvatar(catalogo: Catalogo){
    return this.firestore.collection(this.PATH)
    .add({nome: catalogo.nome, temporada: catalogo.temporada, datalancamento: catalogo.datalancamento, episodios: catalogo.episodios, estudio:catalogo.estudio, downloadURL : catalogo.downloadURL});
  }

  read(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  update(catalogo: Catalogo){
    return this.firestore.collection(this.PATH).doc(catalogo.id).update({nome: catalogo.nome, temporada: catalogo.temporada, datalancamento: catalogo.datalancamento, episodios: catalogo.episodios, estudio:catalogo.estudio});
  }

  updateWithAvatar(catalogo: Catalogo, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: catalogo.nome, temporada: catalogo.temporada, datalancamento: catalogo.datalancamento, episodios: catalogo.episodios, estudio:catalogo.estudio, downloadURL : catalogo.downloadURL});
  }

  delete(catalogo: Catalogo){
    return this.firestore.collection(this.PATH).doc(catalogo.id).delete();
  }

  uploadImage(imagem: any, catalogo: Catalogo){
    const file = imagem.item(0);
    if(file.type.split('/')[0] != 'image'){
      console.error('Tipo não Suportado!');
      return;
    }
    const path = `images/${catalogo.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp => {
          catalogo.downloadURL = resp;
          if(!catalogo.id){
            this.createWithAvatar(catalogo);
          }else{
            this.updateWithAvatar(catalogo, catalogo.id);
          }
        })
      })
    ).subscribe();
  }

}