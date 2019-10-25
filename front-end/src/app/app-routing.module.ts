import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfessorListComponent } from './professor/professor-list/professor-list.component';
import { ProfessorFormComponent } from './professor/professor-form/professor-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'professor', component: ProfessorListComponent },
  { path: 'professor/novo', component: ProfessorFormComponent },
  { path: 'professor/:id', component: ProfessorFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
