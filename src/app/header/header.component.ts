import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonsDataService } from '../services/persons-data.service';
import { ApiCallsService } from '../services/api-calls.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private modalService: NgbModal, private personData: PersonsDataService, private apiCalls: ApiCallsService){}
  
  ngOnInit(): void{}
  
  open(modal: any): void {
    this.modalService.open(modal);
  }

  public submitPersonDetails(data:any){
    this.personData.addPerson(data).subscribe((data) => {
      console.log(data);
      this.apiCalls.persons(data);
    })
  }


  public searchWildCard(data:any){
    this.personData.wildCardSearch(data.search).subscribe((data) =>{
      console.log(data);
    });
  }

}
