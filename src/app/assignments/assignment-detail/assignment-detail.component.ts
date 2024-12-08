import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import {MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink,
    MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  assignmentTransmis: Assignment|undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() : void{
    this.getAssignment();
  }

  isAdmin() : boolean {
    return this.authService.loggedIn
  }

  getAssignment(): void {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
    .subscribe(assignment => this.assignmentTransmis = assignment);
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;
    this.assignmentTransmis.rendu = true;

    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

  onDeleteAssignment() {
    if (this.assignmentTransmis == undefined) return;
    this.assignmentsService.removeAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }

  onClickEdit() {
    if (this.assignmentTransmis == undefined) return;
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
    {queryParams: {nom: this.assignmentTransmis.nom}, fragment: 'edition'}
    );
  }

}
