import { Component, OnInit } from '@angular/core';
import { PersonsDataService } from '../services/persons-data.service'
import { ApiCallsService } from '../services/api-calls.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})



export class PersonTableComponent {
  ngOnInit(): void {
    this.getPersons();
  }
  persons:any;
  constructor(private modalService: NgbModal,private personData:PersonsDataService, private apiCalls: ApiCallsService) {
    apiCalls.refreshEvent().subscribe((data) => {
      this.getPersons();
    })
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }

  public submitPersonDetails(data:any){
    this.personData.addPerson(data).subscribe((data) => {
      this.ngOnInit();
    })
  }

  getPersons(){
    this.personData.persons().subscribe((data) => {
      this.persons = data;
    });
  }

  searchPersonDetails(data:any){
    this.personData.searchPerson(data.search).subscribe((data) =>{
      this.persons = data;
      console.log(data);
    })
  }

  public searchWildCard(data:any){
    this.personData.wildCardSearch(data.search).subscribe((data) =>{
      console.log(data);
    });
  }
  
  deletePerson(phone:number){
    console.log(phone);
    this.personData.deletePerson(phone).subscribe((data) => {
      this.ngOnInit();
    })
  }

  refreshPage(){
    this.ngOnInit();
  }

  page = 4;

}






