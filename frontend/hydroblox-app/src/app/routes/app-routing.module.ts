import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { ChoiceModule } from './choice/choice.module';
import { ChoiceComponent } from './choice/choice.component';
import { ConnectedGuard } from '../shared/guards/connected.guard';
import { DistributorComponent } from './distributor/distributor.component';
import { DistributorModule } from './distributor/distributor.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'choice',
    component: ChoiceComponent,
    canActivate: [ConnectedGuard]
  },
  {
    path: 'distributor',
    component: DistributorComponent,
    canActivate: [ConnectedGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    HomeModule,
    ChoiceModule,
    DistributorModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}