import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  constructor() { }

  private subject = new Subject<any>();

  persons(){
    return this.subject.next(null);
  }

  refreshEvent(): Observable<any>{
    return this.subject.asObservable();
  }
  
}
