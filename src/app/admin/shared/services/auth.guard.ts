import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Params, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate { // defense routs
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true
    } else {
      this.auth.logout();
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          loginAgain: true
        },
      })
    }
    return false;
  }

}
