import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Branch } from 'src/app/entities/branch.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  public branchUrl = 'http://localhost:3000/branch/';

  constructor(private http: HttpClient) {}

  public addBranch(data): Observable<Branch> {
    return this.http
      .post<Branch>(this.branchUrl, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getBranchData(): Observable<Branch[]> {
    return this.http
      .get<Branch[]>(this.branchUrl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public updateBranchData(id, data): Observable<Branch> {
    return this.http
      .patch<Branch>(this.branchUrl + id, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public deleteBranch(id): Observable<Branch> {
    return this.http
      .delete<Branch>(this.branchUrl + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public getBranchById(id): Observable<Branch> {
    return this.http
      .get<Branch>(this.branchUrl + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  public errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
