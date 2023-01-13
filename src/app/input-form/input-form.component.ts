import { Component, ElementRef, Input } from '@angular/core';
import { PersonsDataService } from '../services/persons-data.service'
import { ApiCallsService } from '../services/api-calls.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '../services/notify.service';
import states from '../../assets/json/statesAndCities.json';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

  @Input() modal: NgbModalRef;
  @Input() personEditData: any;
  @Input() isEditForm: boolean;


  constructor(private notify: NotifyService, private personData: PersonsDataService, private apiCalls: ApiCallsService) { }

  stateList: any = states;

  submitPersonDetails(data: any) {
    this.personData.addPerson(data).subscribe((data) => {
      this.apiCalls.persons();
    });
    this.notify.showInfo("Person Added Successful", "Success");
    this.modal.close();
  }

  selectedState: string = '';
  changeState(state: string) {
    this.selectedState = state;
  }

  dirtyValues: any;

  getDirtyValues(form: any) {
    let dirtyValues = {};

    Object.keys(form.controls)
      .forEach(key => {
        const currentControl = form.controls[key];
        if (currentControl.dirty) {
          if (currentControl.controls)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });
    return dirtyValues;
  }

  editPersonDetails(PersonId: number, editForm: any) {
    let edits = this.getDirtyValues(editForm);
    edits['PersonID'] = PersonId;
    this.personData.editPerson(edits).subscribe((data) => {
      this.apiCalls.refreshEvent();
    });
    this.notify.showInfo("Person Edited Successful", "Success");
    this.modal.close();
  }
}

