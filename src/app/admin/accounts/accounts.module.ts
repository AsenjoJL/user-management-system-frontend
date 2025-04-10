import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AddEditComponent } from './add-edit.component';
import { ListComponent } from './list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AccountsRoutingModule,
        // Add standalone components here instead of declarations
        AddEditComponent,
        ListComponent
    ]
})
export class AccountsModule { }