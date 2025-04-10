import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AccountService } from './_services';
import { Account, Role } from './_models';
import { AlertComponent } from './_components/alert.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        AlertComponent
    ]
})
export class AppComponent {
    title(title: any) {
      throw new Error('Method not implemented.');
    }
    account?: Account | null;
    Role = Role;

    constructor(private accountService: AccountService) {
        this.accountService.account.subscribe(x => this.account = x);
    }

    logout() {
        this.accountService.logout();
    }
}

