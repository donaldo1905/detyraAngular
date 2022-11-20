import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemModel, ItemsService } from 'src/app/items.service';
import { UserModel, UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  itemToEdit!: ItemModel; 
  id!: number;
  addId!: string;
  constructor(private usersService: UsersService, private itemsService: ItemsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  if(this.route.snapshot.params['id'] === 'add'){
    this.addId = 'add'
  }else{
    this.id = +this.route.snapshot.params['id']
  }
   let itemsList: ItemModel[] 
    this.itemsService.getList().subscribe(list => 
      {
        itemsList = list
        for(let item of itemsList){
          if(item.id === +this.route.snapshot.params['id']){
            this.itemToEdit = item
            this.editForm.get('editBrand')?.setValue(item.brand)
            this.editForm.get('editModel')?.setValue(item.model)
            this.editForm.get('editEngine')?.setValue(item.engine)
            this.editForm.get('editFuel')?.setValue(item.fuel)
            this.editForm.get('editTransmission')?.setValue(item.transmission)
            this.editForm.get('editYear')?.setValue(item.year)
            this.editForm.get('editPrice')?.setValue(item.price)
            for(let photo of item.photos){
              const control = new FormControl(photo, Validators.required);
              (<FormArray>this.editForm.get('editPhotos')).push(control)
            }
        }}
      })
    this.editForm = new FormGroup({
      'editBrand': new FormControl(null, Validators.required),
      'editModel': new FormControl(null, Validators.required),
      'editEngine': new FormControl(null, Validators.required),
      'editFuel': new FormControl(null, Validators.required),
      'editTransmission': new FormControl(null, Validators.required),
      'editYear': new FormControl(null, Validators.required),
      'editPrice': new FormControl(null, Validators.required),
      'editPhotos': new FormArray([], [Validators.required, Validators.maxLength(6)])
    })
  }
  editItem() {
    let userList: UserModel[] = [];
    let item: ItemModel = { photos: this.editForm.get('editPhotos')?.value, brand: this.editForm.get('editBrand')?.value, model: this.editForm.get('editModel')?.value, engine: this.editForm.get('editEngine')?.value, fuel: this.editForm.get('editFuel')?.value, transmission: this.editForm.get('editTransmission')?.value, year: this.editForm.get('editYear')?.value, price: this.editForm.get('editPrice')?.value, id: +this.route.snapshot.params['id'] }
    this.itemsService.editItem(item).subscribe()
    this.usersService.getUsers().subscribe(response => {
      userList = response
      for (let user of userList) {
        for (let i = 0; i < user.shopList.length; i++) {
          if (user.shopList[i].id === item.id) {
            user.shopList.splice(i, 1)
            let newUser: UserModel = { fname: user.fname, lname: user.lname, email: user.email, id: user.id, shopList: [item, ...user.shopList] }
            this.usersService.editShoppingCart(newUser).subscribe()
          }
        }
      }
    })
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['admin']));
  }
  getEditPhotos(): FormArray {
    return this.editForm.get('editPhotos') as FormArray
  }

  onEditPhoto() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.editForm.get('editPhotos')).push(control)
  }

  addNewItem() {
    const newItem: ItemModel = { photos: this.editForm.get('editPhotos')?.value, brand: this.editForm.get('editBrand')?.value, model: this.editForm.get('editModel')?.value, engine: this.editForm.get('editEngine')?.value, fuel: this.editForm.get('editFuel')?.value, transmission: this.editForm.get('editTransmission')?.value, year: this.editForm.get('editYear')?.value, price: this.editForm.get('editPrice')?.value }
    this.itemsService.addItem(newItem).subscribe()
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['admin']));
  }
}
