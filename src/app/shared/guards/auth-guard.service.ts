import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Service that checks if the user is authenticated and allows navigation,
 * if so, to the desired route. If the user is not authenticated,
 * they are redirected to login.
 */
export class AuthGuardService {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.loginService.isUserAuthenticated) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  // TODO: comprobar si es necesario
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}
