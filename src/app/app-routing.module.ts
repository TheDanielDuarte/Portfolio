import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { PreloadProjectGuard } from './guards/preload-project.guard';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: HomeComponent },
  { path: 'projects/:slug', component: ProjectDetailsComponent, resolve: [PreloadProjectGuard] },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
