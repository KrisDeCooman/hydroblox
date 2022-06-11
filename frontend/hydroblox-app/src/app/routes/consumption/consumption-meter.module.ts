import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsumptionMeterComponent } from './consumption-meter.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

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