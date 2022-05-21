import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }
