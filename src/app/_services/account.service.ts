import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Account } from '@app/_models';

const baseUrl = `${environment.apiUrl}/accounts`;

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>;  // Updated to handle Account or null
    public account: Observable<Account | null>;  // Updated to handle Account or null

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null);  // Corrected to handle null
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account | null {  // Updated to handle Account or null
        return this.accountSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<Account>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    logout() {
        this.http.post(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer(); // Stop the refresh token timer
        this.accountSubject.next(null);  // Correctly set to null on logout
        this.router.navigate(['/account/login']);
    }

    refreshToken() {
        return this.http.post<Account>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    register(account: Account) {
        return this.http.post(`${baseUrl}/register`, account);
    }

    verifyEmail(token: string) {
        return this.http.post(`${baseUrl}/verify-email`, { token });
    }

    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}/forgot-password`, { email });
    }

    validateResetToken(token: string) {
        return this.http.post(`${baseUrl}/validate-reset-token`, { token });
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
    }

    getAll() {
        return this.http.get<Account[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Account>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((account: any) => {
                if (account.id === this.accountValue?.id) {
                    account = { ...this.accountValue, ...account };
                    this.accountSubject.next(account);
                }
                return account;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                if (id === this.accountValue?.id) 
                    this.logout();
            }));
    }

    // helper methods
    private refreshTokenTimeout: any;

    private startRefreshTokenTimer() {
        const account = this.accountValue; // this will be either the current account or null
        if (account?.jwtToken) {
            // parse json object from base64 encoded jwt token
            const jwtToken = JSON.parse(atob(account.jwtToken.split('.')[1]));

            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
        }
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout); // clear the timeout when logging out
    }
}
