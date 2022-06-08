import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsumptionMeterComponent } from './consumption-meter.component';

@NgModule({
    declarations: [
        ConsumptionMeterComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class ConsumptionMeterModule { }