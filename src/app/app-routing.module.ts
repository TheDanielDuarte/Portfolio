import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { PreloadProjectGuard } from './guards/preload-project.guard';
import { SkillsComponent } from './components/skills/skills.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProjectDoesExistGuard } from './guards/project-does-exist.guard';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  {
    path: 'projects',
    component: HomeComponent,
    data: { state: 'work' }
  },
  {
    path: 'projects/:slug',
    component: ProjectDetailsComponent,
    resolve: [PreloadProjectGuard],
    data: { state: 'project' },
    canActivate: [ProjectDoesExistGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { state: 'contact' }
  },
  {
    path: 'skills',
    component: SkillsComponent,
    data: { state: 'skills' }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
