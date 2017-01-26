import { Component, OnInit, OnDestroy } from '@angular/core';
import template from './party-details.component.html';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Party } from '../../../../both/models/party.model';
import { Parties } from '../../../../both/collections/parties.collection';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
  selector: 'party-details',
  template
})
export class PartyDetailsComponent implements OnInit, OnDestroy, CanActivate {
  partyId: string;
  paramsSub: Subscription;
  party: Party;
  partySub: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['partyId'])
      .subscribe(partyId => {
        this.partyId = partyId;

        if (this.partySub) {
          this.partySub.unsubscribe();
        }

        this.partySub = MeteorObservable.subscribe('party', this.partyId).subscribe(() => {
          this.party = Parties.findOne(this.partyId);
        })
      });
  }

  saveParty() {
    if (!Meteor.userId()) {
      alert('Please log in to change this party');
      return;
    }

    Parties.update(this.party._id, {
      $set: {
        name: this.party.name,
        description: this.party.description,
        location: this.party.location
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.partySub.unsubscribe();
  }

  canActivate() {
    const party = Parties.findOne(this.partyId);
    return (party && party.owner == Meteor.userId());
  }
}