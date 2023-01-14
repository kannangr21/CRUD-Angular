import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class PersonsDataService {

  baseUrl:string = "http://localhost:8000/";

  constructor(private http:HttpClient){ }

  persons(page: number){
    return this.http.get(this.baseUrl + 'person?page=' + page.toString());
  }

  addPerson(data:any){
    return this.http.post(this.baseUrl + 'person', data);  
  }

  searchPerson(data:string, page:number){
    data = data.replace(' ', '%20');
    return this.http.get(this.baseUrl + 'person/search?searchVal=' + data + '&pageNo=' + page.toString() )
  }

  deletePerson(personId:number){
    return this.http.delete(this.baseUrl + 'person/' + personId);
  }

  editPerson(persondetails:any){
    return this.http.patch(this.baseUrl + 'person', persondetails);
  }

  wildCardSearch(data:string, page:number){
    data = data.replace(' ', '%20');
    return this.http.get(this.baseUrl + 'person/wildcard?searchVal=' + data + '&pageNo=' + page.toString());
  }

  sortPerson(field: string, page: number, sortOrder:string){
    if(sortOrder === 'desc')
      return this.http.get(this.baseUrl + 'person/sort/' + field + '/' + page.toString() + '/desc');
    return this.http.get(this.baseUrl + 'person/sort/' + field + '/' + page.toString());
  }

}
