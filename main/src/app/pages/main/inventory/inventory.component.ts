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
  displayedColumns: string[] = ['photo','name','description', 'stockCode', 'quantity' ,'unitPrice', 'totalPrice', 'actionButton'];
   
  editMode: boolean = false;
  newInventoryItem: boolean = false;

  editInventoryItem: Inventory;
  
  inventoryForm: any;
  inventoryItems: Inventory[];

  constructor(private router: Router,
     private formBuilder: FormBuilder,
     private spinner: NgxSpinnerService,
     private dataService: DataService) {
    // sales overview chart 
  }

 
  ngOnInit(): void {

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000); 

    this.getInventory();
    this.inventoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      stockCode: ['', [Validators.required]],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required]
    });
  }

  addInventoryItem() { 
    const form = this.inventoryForm.value;
    const inventoryItem: Inventory = {
      id: "",
      photo: "https://placehold.co/200",
      name: form.name,
      stockCode: form.stockCode,
      description: form.description,
      quantity: form.quantity,
      unitPrice: form.unitPrice, 
      createdOn: "" + new Date().getTime(),
      createdBy: "Donald Kgomo", 
      updatedOn: "" + new Date().getTime(),
      updatedBy: "Donald Kgomo"
    }

    if(this.newInventoryItem) {
      inventoryItem.id = uuid();
      this.dataService.addItem(inventoryItem, COLLECTION.INVENTORY).forEach((res: any) => {
        console.log("Inventory item added successfully ", res);
        this.editMode = false;
        this.getInventory();
      });
    } else {
      inventoryItem.id = this.editInventoryItem.id,
      this.dataService.updateItem(inventoryItem, COLLECTION.INVENTORY).forEach((res: any) => {
        console.log("Inventory item updated successfully ", res);
        this.editMode = false;
        this.getInventory();
      }); 
    }
  }

  addNewInventoryItem() {
    this.editMode = true;
    this.newInventoryItem = true;
  }
 
  cancelEditInventory() {
    this.editMode = false;
  }

  getInventory() {
    this.dataService.getAll(COLLECTION.INVENTORY).forEach((inventory: any) => {
      console.log("inventory ", inventory);
      this.inventoryItems = inventory;
    });
  }
  
  editInventoryItemDetails(inventory: Inventory){
    this.editMode = true;
    this.editInventoryItem = inventory;
    console.log("Edit ", inventory);
 
    this.inventoryForm.controls['name'].setValue(inventory.name);
    this.inventoryForm.controls['stockCode'].setValue(inventory.stockCode);
    this.inventoryForm.controls['description'].setValue(inventory.description);
    this.inventoryForm.controls['unitPrice'].setValue(inventory.unitPrice);
    this.inventoryForm.controls['quantity'].setValue(inventory.quantity);

  }

  convetToPDF() {
    var data = document.getElementById('contentToConvert');
      html2canvas((data as any)).then(canvas => {
      // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('new-file.pdf'); // Generated PDF
      });
  }

}
