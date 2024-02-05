import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROUTES, STORAGE } from 'src/app/const/util';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.components.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  loggedInUser: User;

  constructor(public dialog: MatDialog, 
    private router: Router,
    private dataService: DataService) {}

  ngOnInit(): void {   
    this.loggedInUser = this.dataService.getStorage(STORAGE.USER)
  }

  logout() {
    this.dataService.removeFromStorage(STORAGE.TOKEN);
    this.dataService.removeFromStorage(STORAGE.USER);
    this.router.navigateByUrl(ROUTES.LOGIN);
  }
  
}
