import { CollectionObject } from './collection-object.model';

export interface Category extends CollectionObject {
  parent: string;  
  name: string;
}
