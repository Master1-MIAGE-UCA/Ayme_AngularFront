import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignmentName : String, action : String) {
    console.log("Assignment " + assignmentName + " " + action);
  }
}
