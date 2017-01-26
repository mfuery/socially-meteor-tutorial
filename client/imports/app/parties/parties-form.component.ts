import { Component, OnInit } from '@angular/core';

import template from './parties-form.component.html';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Meteor } from 'meteor/meteor';

@Component({
  selector: 'parties-form',
  template
})
@InjectUser('user')
export class PartiesFormComponent implements OnInit {
  user: Meteor.User;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log(this.user);
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [],
      location: ['', Validators.required],
      is_public: [false]
    });
  }

  addParty(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a party');
      return;
    }

    if (this.addForm.valid) {
      Parties.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }));

      this.addForm.reset();
    }
  }

  removeParty(party: Party): void {
    console.log('party is ' + party._id);
    Parties.remove(party._id);
  }
}
