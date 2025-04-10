import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const account = this.accountService.accountValue;

    if (account) {
      // check if route is restricted by role
      if (route.data['roles'] && !route.data['roles'].includes(account.role)) {
        this.router.navigate(['/']);
        return false;
      }

      // authorized
      return true;
    }

    // not logged in, redirect to login with return URL
    this.router.navigate(['account/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
