import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';

import { Assignment } from './assignment.model';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RouterLink, RenduDirective, NonRenduDirective,
    MatButtonModule, MatToolbar,
    MatListModule, MatDividerModule,
    AssignmentDetailComponent, AddAssignmentComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit {

//Gestion de l'affichage des assignments
  page:number = 1;
  limit:number = 10;
  totalDocs!:number;
  totalPages!:number;
  nextPage!:number;
  prevPage!:number;
  hasPrevPage!:boolean;
  hasNextPage!:boolean;


  boutonDesactive = false;
  assignments!: Assignment[];

  constructor(private assignmentsService: AssignmentsService) {}

  getColor(a: any) {
    if (a.rendu) return 'green';
    else return 'red';
  }

  ngOnInit() {
    console.log("ngOnInit appelé, après affichage");

    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService.getAssignmentsPaginated(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
  
      console.log("Données reçues");
    });
  }

  pageSuivante() {
    this.page++;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page--;
    this.getAssignments();
  }  
}
