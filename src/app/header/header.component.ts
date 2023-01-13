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
      this.apiCalls.persons();
    })
  }
  
  selectedState:string='';
  changeState(state:string){
    this.selectedState = state;
  }

}
