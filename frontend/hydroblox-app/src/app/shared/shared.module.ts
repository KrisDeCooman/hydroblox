import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { LoaderModule } from './components/loader/loader.module';
import { LoaderService } from './services/loader.service';
import { ErrorSnackService } from './services/errorsnack.service';
import { Web3Service } from './contracts/web3.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatSnackBarModule,
    LoaderModule,
    ToolbarModule
  ],
  providers: [
    ErrorSnackService,
    LoaderService,
    Web3Service
  ]
})
export class SharedModule { }
