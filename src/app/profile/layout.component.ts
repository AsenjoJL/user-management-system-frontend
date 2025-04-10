import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet
    ]
})
export class LayoutComponent { }