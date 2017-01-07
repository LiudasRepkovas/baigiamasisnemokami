import { Meteor } from 'meteor/meteor';

import {loadCategories} from './imports/fixtures/categories';

import './methods';
import './imports/publications/parties';
import './imports/publications/users';
import './imports/publications/images';
import './imports/publications/items';
import './imports/publications/comments';
import './imports/publications/categories';
import './imports/publications/messages';
import './imports/publications/notifications';

Meteor.startup(() => {
    loadCategories();
});
