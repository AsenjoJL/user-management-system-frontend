import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterOutlet
    ]
})
export class OverviewComponent { }