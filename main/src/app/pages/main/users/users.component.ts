import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';
import { COLLECTION } from 'src/app/const/util';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppUsersComponent implements OnInit {
 

  displayedColumns: string[] = ['name', 'gender','idNo', 'phone', 'email'];
  // dataSource = ELEMENT_DATA;
 
  users: User[];
  // recent transaction
  
 
  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.getUsers();
  }
 
  getUsers() {
    this.dataService.getAll(COLLECTION.USERS).subscribe((users: any) => {
      console.log("Users ", users);
      this.users = users;
    })
  }
}
