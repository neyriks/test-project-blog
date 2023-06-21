import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(private router: Router, public authService: AuthService) {}

  public logout(event: Event) {
    event.preventDefault();

    this.authService.logout();
    this.router.navigate(['/admin', 'login'])
  }
}
