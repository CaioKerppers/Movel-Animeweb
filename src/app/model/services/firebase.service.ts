import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Anime } from '../entities/Anime';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = 'catalogos';

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }


  create(anime: Anime){
    return this.firestore.collection(this.PATH).add({nome: anime.nome, temporada: anime.temporadas, datalancamento: anime.datalancamento, episodios: anime.episodios, estudio:anime.estudio, uid: anime.uid});
  }

  createWithAvatar(anime: Anime){
    return this.firestore.collection(this.PATH)
    .add({nome: anime.nome, temporada: anime.temporadas, datalancamento: anime.datalancamento, episodios: anime.episodios, estudio:anime.estudio, downloadURL: anime.downloadURL});
  }

  read(uid: string){
    return this.firestore.collection(this.PATH,
      ref => ref.where('uid', '==', uid)).snapshotChanges();
  }

  update(anime: Anime){
    return this.firestore.collection(this.PATH).doc(anime.id).update({nome: anime.nome, temporada: anime.temporadas, datalancamento: anime.datalancamento, episodios: anime.episodios, estudio: anime.estudio, uid:anime.uid});
  }

  updateWithAvatar(anime: Anime, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: anime.nome, temporada: anime.temporadas, datalancamento: anime.datalancamento, episodios: anime.episodios, estudio:anime.estudio, uid: anime.uid, downloadURL: anime.downloadURL});
  }

  delete(anime: Anime){
    return this.firestore.collection(this.PATH).doc(anime.id).delete();
  }


  uploadImage(imagem: any, anime: Anime): void {
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo não Suportado!');
      return;
    }
    const path = `images/${anime.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        const uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp => {
          anime.downloadURL = resp;
          if (!anime.id) {
            this.createWithAvatar(anime);
          } else {
            this.updateWithAvatar(anime, anime.id);
          }
        })
      })
    ).subscribe();
  }

  search(term: string): Observable<Anime[]> {
    return this.firestore.collection<Anime>(this.PATH, ref =>
      ref.orderBy('nome')
         .startAt(term)
         .endAt(term + '\uf8ff')
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Anime;
          const id = a.payload.doc.id;
          return { id, ...data } as Anime; // Convertendo para o tipo anime
        });
      })
    );
  }
}
