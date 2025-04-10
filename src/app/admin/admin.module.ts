import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }


