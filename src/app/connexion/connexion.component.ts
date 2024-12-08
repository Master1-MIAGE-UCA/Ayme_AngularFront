import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  username = '';
  password = '';

  constructor(private router: Router, 
    private authService: AuthService,
    ) {}

  isConnected()
  {
    return this.authService.loggedIn;
  }

  onSubmit(event: any) {
    console.log(event);
    if (event.target[0].value === '' || event.target[1].value === '') return;
    if (event.target[0].value === 'root' && event.target[1].value === 'root') {
      this.authService.logIn();
      this.authService.setAdmin();
      this.router.navigate(['/home']);
    }
    if (event.target[0].value === 'user' && event.target[1].value === 'user') {
      this.authService.logIn();
      this.router.navigate(['/home']);
    }
  }

  onLogout() {
    this.authService.logOut();
  }
}
