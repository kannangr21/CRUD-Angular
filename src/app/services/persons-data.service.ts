import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { PersonTableComponent } from '../person-table/person-table.component'

@Injectable({
  providedIn: 'root'
})
export class PersonsDataService {
  baseUrl = "http://localhost:8000/";
  constructor(private http:HttpClient){}//, private table: PersonTableComponent) { }
  persons(){
    return this.http.get(this.baseUrl + 'person')
  }

  addPerson(data:any){
    return this.http.post(this.baseUrl + 'person', data);  
  }

  searchPerson(data:string){
    data = data.replace(' ', '%20');
    return this.http.get(this.baseUrl + 'person/search?searchVal=' + data + '&pageNo=1' )
  }

  deletePerson(personId:number){
    return this.http.delete(this.baseUrl + 'person/' + personId);
  }

  wildCardSearch(data:string){
    data = data.replace(' ', '%20');
    return this.http.get(this.baseUrl + 'person/wildcard?searchVal=' + data);
  }



}
