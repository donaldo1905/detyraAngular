import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, startWith, switchMap, of, map, tap, debounceTime, retry, Subscription, take } from 'rxjs';
import { ItemsService, ItemModel } from '../items.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../login-form/user.model';
import { UserModel, UsersService } from '../users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges{
  itemList: ItemModel[] = [];
  searchForm: FormControl = new FormControl('');
  helloUser!: string;
  startYear: FormControl = new FormControl('')
  endYear: FormControl = new FormControl('')
  startEngine: FormControl = new FormControl('')
  endEngine: FormControl = new FormControl('')
  startPrice: FormControl = new FormControl('')
  endPrice: FormControl = new FormControl('')
  
  constructor(private itemsService: ItemsService, private router: Router, private route: ActivatedRoute, private authService: AuthService, private usersService: UsersService) { }
  ngOnInit(): void {
    let usersList: UserModel[] = [];
    this.itemsService.getList()
      .subscribe(response => this.itemList = response);
    this.usersService.getUsers()
    .subscribe(response => {usersList = response 
    for(let user of usersList){
      if(user.email === loggedUser.email){
        this.helloUser = user.fname
      }
    }});  
    const loggedUser: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string 
    } = JSON.parse(localStorage.getItem('userData')!)
   
  }
  
  reload(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
this.router.navigate(['list']));
  }

  ngOnChanges(): void {

  }

  logout(){
    this.authService.logOut()
  }

  addToShopList(item: ItemModel){
    let userList: UserModel[] = []
    this.usersService.getUsers().subscribe(response => {
      userList = response
      for(let user of userList){
        if(user.email === JSON.parse(localStorage.getItem('userData')!).email){
          if(user.shopList.length === 0){
              let newUser: UserModel = {fname: user.fname, lname: user.lname, email: user.email, id: user.id, shopList: [item]}
              this.usersService.editShoppingCart(newUser).subscribe()
              break}
          for(let shopItem of user.shopList){
            if(shopItem.id === item.id){
              let newUser1: UserModel = {fname: user.fname, lname: user.lname, email: user.email, id: user.id, shopList: user.shopList}
           this.usersService.editShoppingCart(newUser1).subscribe()
          break}
           else{
            let newUser2: UserModel = {fname: user.fname, lname: user.lname, email: user.email, id: user.id, shopList: [item, ...user.shopList]}
            this.usersService.editShoppingCart(newUser2).subscribe()
            
           }
          
        }}
      }
    })
  }


  filteredCars: Observable<ItemModel[]> = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
  highToLowPrice() {
    this.filteredCars = this.filteredCars.pipe(map(result => result.sort((a: ItemModel, b: ItemModel) => { return b.price - a.price })))
  }
  lowToHighPrice() {
    this.filteredCars = this.filteredCars.pipe(map(result => result.sort((a: ItemModel, b: ItemModel) => { return a.price - b.price })))
  }
  highToLowEngine() {
    this.filteredCars = this.filteredCars.pipe(map(result => result.sort((a: ItemModel, b: ItemModel) => { return b.engine - a.engine })))
  }
  lowToHighEngine() {
    this.filteredCars = this.filteredCars.pipe(map(result => result.sort((a: ItemModel, b: ItemModel) => { return a.engine - b.engine })))
  }

  diesel() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.fuel === 'Diesel')
    }))
  }

  petrol() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.fuel === 'Petrol')
    }))
  }

  electric() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.fuel === 'Electric')
    }))
  }

  automatic() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.transmission === 'Automatic')
    }))
  }

  manual() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.transmission === 'Manual')
    }))
  }

  robotic() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.transmission === 'Robotic')
    }))
  }

  benz() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.brand === 'Mercedes-Benz')
    }))
  }

  bmw() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.brand === 'BMW')
    }))
  }

  volkswagen() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.brand === 'VolksWagen')
    }))
  }

  audi() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car => car.brand === 'Audi')
    }))
  }

  year() {
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car =>
        car.year >= this.startYear?.value && car.year <= this.endYear?.value )
    }))
  }

  engine(){
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car =>
        car.engine >= this.startEngine?.value && car.engine <= this.endEngine?.value )
    }))
  }

  price(){
    this.filteredCars = this.searchForm?.valueChanges.pipe(startWith(''), debounceTime(1100),
    switchMap(searchValue => {
      return of(this.itemList).
        pipe(map(cars => {
          return cars.filter(cars => cars.brand.toLowerCase().includes(searchValue))
        }))
    }))
    this.filteredCars = this.filteredCars.pipe(map(result => {
      return result.filter(car =>
        car.price >= this.startPrice?.value && car.price <= this.endPrice?.value )
    }))
  }
}