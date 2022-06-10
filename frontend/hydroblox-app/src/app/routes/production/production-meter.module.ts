import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductionMeterComponent } from './production-meter.component';

@NgModule({
    declarations: [
        ProductionMeterComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class ProductionMeterModule { }