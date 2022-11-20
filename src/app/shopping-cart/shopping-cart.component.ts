import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ItemModel, ItemsService } from '../items.service';
import { UsersService, UserModel } from '../users.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  savedItemsList: ItemModel[] = [];
  activeUser: string = ''
  constructor(private itemsService: ItemsService, private usersService: UsersService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  this.usersService.getUsers().subscribe(response => {
    for(let user of response){
      if(user.email === JSON.parse(localStorage.getItem('userData')!).email){
        this.savedItemsList = user.shopList
        this.activeUser = user.fname
      }
    }})
    
  }


   logout(){
    this.authService.logOut()
  }


  onDelete(item: ItemModel) {
    let userList: UserModel[] = []
    this.usersService.getUsers().subscribe(response => {
      userList = response
    for(let user of userList){
      if(user.email === JSON.parse(localStorage.getItem('userData')!).email){
        for(let i=0; i<user.shopList.length ; i++){
          if(user.shopList[i].id === item.id){
            this.savedItemsList.splice(i,1)
            user.shopList.splice(i,1)
            let newUser: UserModel = {fname: user.fname, lname: user.lname, email: user.email, id: user.id, shopList: [...user.shopList]}
           this.usersService.editShoppingCart(newUser).subscribe()
          }
        }
      }
    }})
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
// this.router.navigate(['shoppingCart']));
  }

      
  navigate(){
    if(JSON.parse(localStorage.getItem('userData')!).email === 'admin@admin.com'){
    this.router.navigate(['/admin'])}
    else{
      this.router.navigate(['/list'])
    }
  }

  }



