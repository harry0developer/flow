import { Component, ViewEncapsulation, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { COLLECTION } from 'src/app/const/util';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuid} from 'uuid';
import { NgxSpinnerService } from "ngx-spinner";
import { Inventory } from 'src/app/models/inventory';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class AppInventoryComponent {
  displayedColumns: string[] = ['photo','name','description', 'stockCode', 'quantity' ,'costPrice','sellingPrice', 'totalPrice', 'actionButton'];
   
  editMode: boolean = false;
  isNewInventoryItem: boolean = false;

  editInventoryItem: Inventory;
  
  inventoryForm: any;
  inventoryItems: Inventory[] = [];

  constructor(private router: Router,
     private formBuilder: FormBuilder,
     private spinner: NgxSpinnerService,
     private dataService: DataService) {
    // sales overview chart 
  }

 
  ngOnInit(): void {

    this.getInventory();
    this.inventoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      stockCode: ['', [Validators.required]],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      costPrice: ['', Validators.required],
      discountPrice: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      VAT: ['', Validators.required],
    });
  }

  addInventoryItem() { 
    const form = this.inventoryForm.value;
    const inventoryItem: Inventory = {
      photo: "https://placehold.co/200",
      name: form.name,
      stockCode: form.stockCode,
      description: form.description,
      quantity: form.quantity,
      costPrice: form.costPrice, 
      discountPrice: form.discountPrice,
      sellingPrice: form.sellingPrice,
      VAT: form.discountPrice,
      createdOn: new Date(),
      createdBy: "65bfd1a6965711aa24e06f79", 
      updatedOn: new Date(),
      updatedBy: "65bfd1a6965711aa24e06f79"
    }


    this.dataService.addItem(inventoryItem, COLLECTION.INVENTORY).forEach((res: any) => {
      console.log("Inventory item added successfully ", res);
      this.editMode = false;
      this.getInventory();
    });
    
  }

  
  updateInventoryItem() { 
    const form = this.inventoryForm.value;
    const inventoryItem: Inventory = {
      photo: "https://placehold.co/200",
      name: form.name,
      stockCode: form.stockCode,
      description: form.description,
      quantity: form.quantity,
      costPrice: form.costPrice, 
      discountPrice: form.discountPrice,
      sellingPrice: form.sellingPrice,
      VAT: form.discountPrice,
      _id: this.editInventoryItem._id,
      createdOn: new Date(),
      createdBy: "65bfd1a6965711aa24e06f79", 
      updatedOn: new Date(),
      updatedBy: "65bfd1a6965711aa24e06f79"
    }

   
    this.dataService.updateItem(inventoryItem, COLLECTION.INVENTORY).forEach((res: any) => {
      console.log("Inventory item updated successfully ", res);
      this.editMode = false;
      this.getInventory();
    }); 
  
  }

  enableEditMode() {
    this.editMode = true;
    this.isNewInventoryItem = true;
    this.inventoryForm.reset();
  }

  saveItem() {
    if(this.isNewInventoryItem) {
      this.addInventoryItem();
    } else {
      this.updateInventoryItem();
    }
  }
 
  cancelEditInventory() {
    this.editMode = false;
  }

  getInventory() {
    this.spinner.show();
    this.dataService.getAll(COLLECTION.INVENTORY).forEach((inventory: any) => {
      console.log("inventory ", inventory);
      this.inventoryItems = inventory;
      this.spinner.hide();
    }).catch(err => {
      this.spinner.hide();
    })
  }
  
  editInventoryItemDetails(inventory: Inventory){
    this.editMode = true;
    this.editInventoryItem = inventory;
    this.isNewInventoryItem = false;
    console.log("Edit ", inventory);
 
    this.inventoryForm.controls['name'].setValue(inventory.name);
    this.inventoryForm.controls['stockCode'].setValue(inventory.stockCode);
    this.inventoryForm.controls['description'].setValue(inventory.description);
    this.inventoryForm.controls['sellingPrice'].setValue(inventory.sellingPrice);
    this.inventoryForm.controls['costPrice'].setValue(inventory.costPrice);
    this.inventoryForm.controls['quantity'].setValue(inventory.quantity);
    this.inventoryForm.controls['discountPrice'].setValue(inventory.discountPrice);
    this.inventoryForm.controls['VAT'].setValue(inventory.VAT);


  }
 

}
