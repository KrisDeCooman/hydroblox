import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { ChoiceModule } from './choice/choice.module';
import { ChoiceComponent } from './choice/choice.component';

// TODO implement guards

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'choice',
    component: ChoiceComponent
  },
  {
    path: '*',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    HomeModule,
    ChoiceModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
