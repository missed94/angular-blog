import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, DoCheck {

  constructor(private router: Router,
              public auth: AuthService) {
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    if (this.auth.isAuthenticated() && this.router.url === '/admin/login') {
      this.router.navigate(['/admin', 'dashboard']);
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
