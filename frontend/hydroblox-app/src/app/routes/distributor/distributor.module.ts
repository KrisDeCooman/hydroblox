import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DistributorComponent } from './distributor.component';

@NgModule({
  declarations: [
    DistributorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DistributorModule { }
