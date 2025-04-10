import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AccountService } from '../_services';

export const errorInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {
    const accountService = inject(AccountService);

    return next(request).pipe(
        catchError(err => {
            if ([401, 403].includes(err.status) && accountService.accountValue) {
                // auto logout if 401 or 403 response returned from api
                accountService.logout();
            }

            const error = err.error?.message || err.statusText;
            return throwError(() => error);
        })
    );
};