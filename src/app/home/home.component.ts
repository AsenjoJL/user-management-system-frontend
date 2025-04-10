import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'home.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class HomeComponent implements OnInit {
    account: any;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.account
            .pipe(first())
            .subscribe(account => this.account = account);
    }
}
