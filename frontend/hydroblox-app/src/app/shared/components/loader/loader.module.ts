import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
