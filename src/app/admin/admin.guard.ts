import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean |  Observable<boolean | UrlTree> | Promise<boolean> {
        if(localStorage.length && JSON.parse(localStorage.getItem('userData')!).email === 'admin@admin.com'){
            return true
        }
        else {
            this.router.navigate(['/login'])
        return false
        
    }
    }
}