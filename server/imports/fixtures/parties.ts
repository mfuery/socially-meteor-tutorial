import { Parties } from '../../../both/collections/parties.collection';
import { Party } from '../../../both/models/party.model';

export function loadParties() {
    if (Parties.find().cursor.count() === 0) {
        const parties: Party[] = [
            {
                name: 'Dubstep is cool',
                description: "Yeah, let's have a good time",
                location: 'Palo Alto',
                is_public: true
            }, {
                name: 'Disco is funky',
                description: "Yeah, I like this",
                location: 'Palo Alto',
                is_public: true
            }, {
                name: 'Jazz',
                description: "OK. Most ppl will have a good time",
                location: 'SF',
                is_public: false
            }
        ];

        parties.forEach((party: Party) => Parties.insert(party));
    }
}