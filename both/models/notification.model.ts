import { CollectionObject } from './collection-object.model';

export interface Notification extends CollectionObject {
  owner: string;
  text: string;
  url: string;
  timestamp: number;
  seen: boolean;
}