import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Reservation } from '../models/reservation.model';

export const Reservations = new MongoObservable.Collection<Reservation>('reservations');

function loggedIn() {
  return !!Meteor.user();
}

Reservations.deny({
  insert:   (a, b) =>true,
  update:   (a, b) =>true,
  remove:   (a, b) =>true
});
