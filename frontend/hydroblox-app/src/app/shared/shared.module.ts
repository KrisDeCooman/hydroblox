import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoaderModule } from './components/loader/loader.module';
import { LoaderService } from './services/loader.service';
import { ErrorSnackService } from './services/errorsnack.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    LoaderModule
  ],
  providers: [
    ErrorSnackService,
    LoaderService
  ]
})
export class SharedModule { }
