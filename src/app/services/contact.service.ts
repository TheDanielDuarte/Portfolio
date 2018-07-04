import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { SocialBlock } from '../models/social-block';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private collection: AngularFirestoreCollection<SocialBlock>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.collection = afs.collection<SocialBlock>('social');
  }

  public allMedia(): Observable<SocialBlock[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data } as SocialBlock;
      })),
      map(socialBlocks => socialBlocks.map(socialBlock => {
        const { id } = socialBlock;
        const ref = this.storage.storage.ref(`social/${id}.png`);
        return { ...socialBlock, imageURL: ref.getDownloadURL() } as SocialBlock;
      }))
    );
  }
}
