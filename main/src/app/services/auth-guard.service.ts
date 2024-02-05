import { Injectable, inject } from "@angular/core";
import { Router, CanActivate, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService {
    constructor(private auth:AuthService, public router: Router) {}
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(!this.auth.isAuthenticated()) {
            this.router.navigate(['authentication/login']);
            return false;
        }
        return true;
    }
}

export const AuthGuard: CanActivateChildFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthGuardService).canActivate(next, state)
}