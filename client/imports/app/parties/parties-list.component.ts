import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

import { Party } from '../../../../both/models/party.model';
import { Parties } from '../../../../both/collections/parties.collection';

import template from './parties-list.component.html';

@Component({
  selector: 'parties-list',
  template
})
export class PartiesListComponent implements OnInit, OnDestroy {
  parties: Observable<Party[]>;
  partiesSub: Subscription;

  ngOnInit() {
    this.parties = Parties.find({}).zone();
    this.partiesSub = MeteorObservable.subscribe('parties').subscribe();
  }

  removeParty(party: Party): void {
    Parties.remove(party._id);
  }

  search(value: string): void {
    this.parties = Parties.find(value ? { location: value } : {}).zone();
  }

  ngOnDestroy() {
    this.partiesSub.unsubscribe();
  }
}