import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
export interface ItemModel {
  id?: number;
  photos: string[];
  brand: string;
  model: string;
  engine: number;
  fuel: string;
  transmission: string;
  year: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly api: string;
  constructor(private httpClient: HttpClient) {
    this.api = 'api/items';
   }
   getList(): Observable<ItemModel[]> {
    return this.httpClient.get<ItemModel[]>(this.api);
   }

   deleteItem(item: ItemModel): Observable<ItemModel> {
    return this.httpClient.delete<ItemModel>(`${this.api}/${item.id}`)
   }

   addItem(item: ItemModel): Observable<ItemModel> {
    return this.httpClient.post<ItemModel>(this.api, item)
   }

   editItem(item: ItemModel): Observable<ItemModel>{
    return this.httpClient.put<ItemModel>(`${this.api}/${item.id}`, item)
   }
   get(id: number): Observable<any>{
    return this.httpClient.get<any>(`${this.api}/${id}`);
  }

}
