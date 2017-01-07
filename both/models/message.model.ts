import { CollectionObject } from './collection-object.model';

export interface Message extends CollectionObject {
  body: string;
  from: string;
  to: string;
  timestamp: number;
  seen: boolean;
}
