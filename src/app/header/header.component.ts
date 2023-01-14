import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  constructor(private modalService: NgbModal){}
  
  ngOnInit(): void{}
  
  open(modal: any): void {
    this.modalService.open(modal);
  }
  
}
