import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '*',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    HomeModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
