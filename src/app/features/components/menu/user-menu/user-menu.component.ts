import {Component} from '@angular/core';
import {SessionService} from "../../../../shared/services/session.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['../menu.component.css']
})
export class UserMenuComponent {
  constructor(private sessionService: SessionService) {

  }

  onLogOutClick() {
    this.sessionService.remove();
  }
}
