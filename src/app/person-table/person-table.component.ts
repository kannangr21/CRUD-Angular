import { Component } from '@angular/core';
import { PersonsDataService } from '../services/persons-data.service'
import { ApiCallsService } from '../services/api-calls.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css'],
})


export class PersonTableComponent {

  page: number = 1;
  tableSize: number = 5;

  personModel: {
    PersonID: number,
    FirstName: string,
    LastName: string,
    AddressLine1: string,
    AddressLine2: string,
    City: string,
    State: string,
    Pincode: number,
    PhoneNumber: number
  } = {
      PersonID: 0,
      FirstName: '',
      LastName: '',
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      State: '',
      Pincode: 0,
      PhoneNumber: 0
    };

  ngOnInit(): void {
    this.getPersons();
  }

  onTableDataChange(event: any) {
    this.page = event;

    if (this.isSorted) 
      this.sortPersons();
    
    if (this.isExactSearch) 
      this.searchPersonDetails();
    
    if(this.isWildCard)
      this.searchWildCard();
    
    if (!this.isSorted && !this.isExactSearch && !this.isWildCard) 
      this.getPersons();
  }

  persons: any;

  constructor(private modalService: NgbModal, private personData: PersonsDataService, private apiCalls: ApiCallsService) {
    apiCalls.refreshEvent().subscribe((data) => {
      this.getPersons();
    })
  }


  submitPersonDetails(data: any) {
    this.personData.addPerson(data).subscribe((data) => {
      this.ngOnInit();
    });
  }

  getPersons() {
    this.personData.persons(this.page).subscribe((data) => {
      this.persons = data;
    });
  }

  isExactSearch: boolean = false;
  exactSearch: string = '';

  callExactSearch(data: any){
    this.isExactSearch = true;
    this.exactSearch = data.fnsearch + " " + data.lnsearch + " " + data.citysearch;
    this.searchPersonDetails();
  }
  
  searchPersonDetails() {
    this.personData.searchPerson(this.exactSearch, this.page).subscribe((data) => {
      this.persons = data;
    });
  }

  isWildCard:boolean = false;
  wildCardSearch:string = '';

  callWildCard(data:any){
    this.isWildCard = true;
    this.wildCardSearch = data.search;
    this.searchWildCard();
  }

  searchWildCard() {
    this.personData.wildCardSearch(this.wildCardSearch, this.page).subscribe((data) => {
      console.log(data);
      this.persons = data;
    });
  }

  closeResult: string = '';

  open(confirm: any, phone: number) {
    this.modalService.open(confirm).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deletePerson(phone);
      }
    });
  }

  deletePerson(phone: number) {
    this.personData.deletePerson(phone).subscribe((data) => {
      this.ngOnInit();
    })
  }

  isSorted: boolean = false;
  sortField: string = '';
  sortOrder: string = '';

  sort(values: any) {
    this.isSorted = true;
    this.sortField = values.fieldName;
    this.sortOrder = values.sortOrder;
    this.page = 1;
    this.sortPersons();
  }

  sortPersons() {
    this.personData.sortPerson(this.sortField, this.page, this.sortOrder).subscribe((data) => {
      this.persons = data;
    });
  }

  refreshPage(searchForm: NgForm[]) {
    this.isExactSearch = false;
    this.isWildCard = false;
    this.isSorted = false;
    this.page = 1;

    searchForm.forEach((form) => {
      form.resetForm({fieldName: '', sortOrder: ''});
    })
    this.ngOnInit();
  }

  canApply(){
    return !this.isExactSearch && !this.isSorted && !this.isWildCard;
  }


}






