import { CollectionObject } from './collection-object.model';

export interface Reservation extends CollectionObject {
  owner: string;
  item: string;
  timestamp: number;
}
