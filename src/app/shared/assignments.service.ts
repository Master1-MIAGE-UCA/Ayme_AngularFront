import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from './data'; // bdInitialAssignments
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  //backEND_URL = 'http://localhost:8010/api/assignments';
  backEND_URL = 'https://ayme-angular-api.onrender.com/api/assignments';

  assignments: Assignment[]= [];

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private LoggingService: LoggingService,
    private http: HttpClient
  ) { }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.backEND_URL);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.backEND_URL + '/' + id)
    .pipe(
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.backEND_URL, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.backEND_URL, assignment);
  }

  removeAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete<Assignment>(this.backEND_URL + "/" + assignment.id);
  }

  getLastId(): number {
    let nb = 0;
    this.http.get<number>(this.backEND_URL + '/lastId').subscribe(id => nb = id);
    return nb;
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
  };

  deleteAllAssignments(): Observable<any> {
    return this.getAssignments().pipe(
      tap(assignments => {
        for (let assignment of assignments) {
          this.LoggingService.log(assignment.nom, "supprimé");
          this.http.delete(this.backEND_URL + '/' + assignment.id).subscribe();
        }
      })
    );
  }

  peuplerBD(): Observable<any> {
    return this.http.get(this.backEND_URL + '/peupler');
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];
 
    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
 
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });
 
    return forkJoin(appelsVersAddAssignment);
  }
 
  getAssignmentsPaginated(page: number, limit: number): Observable<any> {
    return this.http.get<any>(this.backEND_URL + '?page=' + page + '&limit=' + limit);
  }  
 
}
