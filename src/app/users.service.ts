import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemModel } from './items.service';
export interface UserModel {
  fname: string;
  lname: string;
  email: string;
  shopList: ItemModel[];
  id?: number
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly api: string;
  constructor(private httpClient: HttpClient) {
    this.api = 'api/users';
   }
 
   getUsers(): Observable<UserModel[]>{
    return this.httpClient.get<UserModel[]>(this.api);
   }

   addUser(user: UserModel): Observable<UserModel> {
   return this.httpClient.post<UserModel>(this.api, user)
  }

  editShoppingCart(user: UserModel): Observable<UserModel>{
    return this.httpClient.patch<UserModel>(`${this.api}/${user.id}`, user)
   }

}


