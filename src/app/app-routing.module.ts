import { HomeComponent } from './UI/home/home.component';
//import { NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'app-home', component: HomeComponent },
  { path: '', redirectTo: '/app-home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
