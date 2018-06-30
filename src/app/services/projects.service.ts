import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFireStorage } from '../../../node_modules/angularfire2/storage';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly projectsCollection: AngularFirestoreCollection<Project>;

  constructor(private afs: AngularFirestore) {
    this.projectsCollection = afs.collection('projects');
  }

  public all(): Observable<Project[]> {
    return this.projectsCollection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
