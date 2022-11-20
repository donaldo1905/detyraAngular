import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable, map, take } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean |  Observable<boolean | UrlTree> | Promise<boolean> {
        if(localStorage.length){
            return true
        }
        else {
            this.router.navigate(['/login'])
        return false
    }
    }
}