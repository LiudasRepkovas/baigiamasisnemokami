import { CollectionObject } from './collection-object.model';

export interface Comment extends CollectionObject {
  item: string;
  body: string;
  owner: string;
  timestamp: number;
  deleted: boolean;
}
