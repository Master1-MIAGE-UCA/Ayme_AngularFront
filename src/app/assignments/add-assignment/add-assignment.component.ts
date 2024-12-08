import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AssignmentsService } from '../../shared/assignments.service';

import { FormsModule } from '@angular/forms';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatDatepickerModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  nomDevoir = '';
  dateDeRendu = null;

  constructor(private assignmentsService: AssignmentsService) {}

  onSubmit(event: any) {
    if (this.nomDevoir === '' || this.dateDeRendu === null) return;

    const a = new Assignment();
    a.nom = this.nomDevoir;
    a.dateDeRendu = this.dateDeRendu;
    a.rendu = false;
    a.id = this.assignmentsService.getLastId() + 1;

    this.assignmentsService.addAssignment(a).subscribe(message => {
      console.log(message);
    });
  }
}
