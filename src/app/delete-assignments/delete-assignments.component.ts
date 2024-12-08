import { Component } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-assignments',
  standalone: true,
  imports: [],
  templateUrl: './delete-assignments.component.html',
  styleUrl: './delete-assignments.component.css'
})
export class DeleteAssignmentsComponent {

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("ngOnInit appelé, suppression de la bdd ");
    this.assignmentsService.deleteAllAssignments().subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });;
  }

}
