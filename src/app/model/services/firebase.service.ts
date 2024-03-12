import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Catalogo } from '../entities/Catalogo';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = 'catalogos';

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }


  create(catalogo: Catalogo){
    return this.firestore.collection(this.PATH).add({nome: catalogo.nome, temporada: catalogo.temporada, datalancamento: catalogo.datalancamento, episodios: catalogo.episodios, estudio:catalogo.estudio, uid: catalogo.uid});
  }

  createWithAvatar(catalogo: Catalogo){
    return this.firestore.collection(this.PATH)
    .add({nome: catalogo.nome, temporada: catalogo.temporada, datalancamento: catalogo.datalancamento, episodios: catalogo.episodios, estudio:catalogo.estudio, downloadURL: catalogo.downloadURL});
  }

  read(uid: string){
    return this.firestore.collection(this.PATH,
      ref => ref.where('uid', '==', uid)).snapshotChanges();
  }

  update(catalogo: Catalogo){
    return this.firestore.collection(this.PATH).doc(catalogo.id).update({nome: catalogo.nome, temporada: catalogo.temporada, datalancamento: catalogo.datalancamento, episodios: catalogo.episodios, estudio: catalogo.estudio, uid:catalogo.uid});
  }

  updateWithAvatar(catalogo: Catalogo, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: catalogo.nome, temporada: catalogo.temporada, datalancamento: catalogo.datalancamento, episodios: catalogo.episodios, estudio:catalogo.estudio, uid: catalogo.uid, downloadURL: catalogo.downloadURL});
  }

  delete(catalogo: Catalogo){
    return this.firestore.collection(this.PATH).doc(catalogo.id).delete();
  }


  uploadImage(imagem: any, catalogo: Catalogo): void {
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo não Suportado!');
      return;
    }
    const path = `images/${catalogo.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        const uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp => {
          catalogo.downloadURL = resp;
          if (!catalogo.id) {
            this.createWithAvatar(catalogo);
          } else {
            this.updateWithAvatar(catalogo, catalogo.id);
          }
        })
      })
    ).subscribe();
  }

  // Método para realizar uma pesquisa
  search(term: string): Observable<Catalogo[]> {
    return this.firestore.collection<Catalogo>(this.PATH, ref =>
      ref.orderBy('nome')
         .startAt(term)
         .endAt(term + '\uf8ff')
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Catalogo;
          const id = a.payload.doc.id;
          return { id, ...data } as Catalogo; // Convertendo para o tipo Catalogo
        });
      })
    );
  }
}
