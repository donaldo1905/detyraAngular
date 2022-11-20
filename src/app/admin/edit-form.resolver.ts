import { ItemsService } from 'src/app/items.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, EMPTY, catchError, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditFormResolver implements Resolve<any> {
  constructor(private itemsService: ItemsService, private router: Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if(route.paramMap.get('id') === 'add'){
     return of(true)
    }else
    if (route.paramMap.has('id')) {
      return this.itemsService.get(+(route.paramMap.get('id') as string)).pipe(
        catchError(() => {
          this.router.navigateByUrl('/admin');
          return EMPTY;
        })
      )
    }

    this.router.navigateByUrl('/admin');
    return EMPTY;
  }
}
