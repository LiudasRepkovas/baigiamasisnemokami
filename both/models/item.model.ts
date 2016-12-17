import { CollectionObject } from './collection-object.model';

export interface Item extends CollectionObject {
  name: string;
  description: string;
  category: string;
  location: string;
  owner?: string;
  images?: string[];
  timestamp: number;
  active: boolean;
  deleted: boolean;
  expires: number;
}
