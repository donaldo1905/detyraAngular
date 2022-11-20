import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemModel, ItemsService } from 'src/app/items.service';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.scss']
})
export class ShowMoreComponent implements OnInit {
  item: ItemModel = {brand: '', model: '', transmission: '', price: 0, engine: 0, fuel: '', year: 0, photos: []}
  constructor(private route: ActivatedRoute, private itemsService: ItemsService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
let itemsList: ItemModel[];
this.itemsService.getList().subscribe(list => {
  itemsList = list
  for(let item of itemsList){
    if(item.id === +this.route.snapshot.params['id']){
      this.item = item
    }
  }
})
  }

  navigate(){
    if(JSON.parse(localStorage.getItem('userData')!).email === 'admin@admin.com'){
    this.router.navigate(['/admin'])}
    else{
      this.router.navigate(['/list'])
    }
  }

  logout(){
    this.authService.logOut()
  }

}
