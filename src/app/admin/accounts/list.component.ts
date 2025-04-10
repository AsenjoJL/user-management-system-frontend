import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from '../../_services';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    standalone: true,
    imports: [
        CommonModule,    // For *ngFor and *ngIf
        RouterLink       // For routerLink
    ]
})
export class ListComponent implements OnInit {
    accounts?: any[];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts);
    }

    deleteAccount(id: string) {
        const account = this.accounts!.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts!.filter(x => x.id !== id)
            });
    }
}