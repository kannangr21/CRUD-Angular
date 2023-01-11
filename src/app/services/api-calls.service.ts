import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  constructor(private http:HttpClient) { }

  baseUrl = "http://localhost:8000/";

  private subject = new Subject<any>();

  addPerson(data:any){
    return this.http.post(this.baseUrl + 'person', data);  
  }

  persons(data:any){
    return this.subject.next(this.http.get(this.baseUrl + 'person'));
  }

  refreshEvent(): Observable<any>{
    return this.subject.asObservable();
  }
  
}
