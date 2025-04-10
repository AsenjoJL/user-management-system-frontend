import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services';

export const jwtInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {
    const accountService = inject(AccountService);
    const account = accountService.accountValue;
    const isLoggedIn = account?.['token'];
    const isApiUrl = request.url.startsWith('http://localhost:4000');

    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${account['token']}` }
        });
    }

    return next(request);
};