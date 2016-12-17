import { Categories } from '../../../both/collections/categories.collection';
import { Category } from '../../../both/models/category.model';

export function loadCategories() {
  if (Categories.find().cursor.count() === 0) {
    const categories: Category[] = [
        {name: 'Transportas', parent: null}, 
        {name: 'Technika', parent: null },
        {name: 'Paslaugos', parent: null},
        {name: 'Auginantiems vaikus', parent: null},
        {name: 'Kompiuterija', parent: null},
        {name: 'Komunikacijos', parent: null},
        {name: 'Buitis', parent: null},
        {name: 'Drabužiai', parent: null},
        {name: 'Pramogos', parent: null},
        {name: 'Nekilnojamas turtas', parent: null},
    ];

    categories.forEach((category: Category) => Categories.insert(category));
  }
}