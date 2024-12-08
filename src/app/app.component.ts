import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import {AssignmentsComponent} from './assignments/assignments.component';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatDividerModule, MatSlideToggleModule,
     AssignmentsComponent, MatToolbarModule, MatIconModule, MatSidenavModule,
     MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP Angular';
  opened = false;

  constructor(private router: Router, 
    private authService: AuthService,
    private assignmentsService: AssignmentsService) {}

  peuplerBD() {
    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES,ON RE-AFFICHE LA LISTE");
        window.location.reload();
      })
  }
 
}
