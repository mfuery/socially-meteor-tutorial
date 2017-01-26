import { Parties } from '../../../both/collections/parties.collection';
Meteor.publish('parties', function() {
  console.log('Publish parties for userId: ' + this.userId);
  return Parties.find(buildQuery.call(this));
});

Meteor.publish('party', function(partyId: string) {
  return Parties.find(buildQuery.call(this, partyId));
});

function buildQuery(partyId?: string) {
  const isAvailable = {
    $or: [{
      is_public: true
    },{
      $and: [{
        owner: this.userId
      },{
        owner: { $exists: true }
      }]
    }]
  };

  if (partyId) {
    return {
      $and: [{
        _id: partyId
      },
      isAvailable
      ]
    }
  }

  return isAvailable;
}