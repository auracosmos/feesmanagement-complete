﻿import { Component } from '@angular/core';
import { LoginComponent } from './account/login.component';
import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' ,styleUrls: ['./app.component.css']})
export class AppComponent {
    user: User;
    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
    
    logout() {
        this.accountService.logout();
    }

}