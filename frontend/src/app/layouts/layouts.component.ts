import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-layout',
    template: `
    <app-navbar></app-navbar>
    <app-sidebar></app-sidebar>
    <router-outlet></router-outlet>
        `,
    styles: []
})
export class LayoutsComponent { }