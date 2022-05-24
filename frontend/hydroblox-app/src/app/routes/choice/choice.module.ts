import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChoiceComponent } from './choice.component';

@NgModule({
  declarations: [
    ChoiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChoiceModule { }
