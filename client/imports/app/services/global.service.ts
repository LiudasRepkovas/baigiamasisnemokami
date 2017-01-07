import {Injectable, ApplicationRef} from "@angular/core";
import * as _ from 'lodash';

@Injectable()
export class Globals {
  // countries: string[] = [
  //   "Afghanistan",
  //   "Albania",
  //   "Algeria",
  //   "American Samoa",
  //   "Andorra",
  //   "Angola",
  //   "Anguilla",
  //   "Antarctica",
  //   "Antigua and Barbuda",
  //   "Argentina",
  //   "Armenia",
  //   "Aruba",
  //   "Australia",
  //   "Austria",
  //   "Azerbaijan",
  //   "Bahamas",
  //   "Bahrain",
  //   "Bangladesh",
  //   "Barbados",
  //   "Belarus",
  //   "Belgium",
  //   "Belize",
  //   "Benin",
  //   "Bermuda",
  //   "Bhutan",
  //   "Bolivia",
  //   "Bosnia and Herzegovina",
  //   "Botswana",
  //   "Bouvet Island",
  //   "Brazil",
  //   "British Indian Ocean Territory",
  //   "Brunei Darussalam",
  //   "Bulgaria",
  //   "Burkina Faso",
  //   "Burundi",
  //   "Cambodia",
  //   "Cameroon",
  //   "Canada",
  //   "Cape Verde",
  //   "Caribbean Netherlands",
  //   "Cayman Islands",
  //   "Central African Republic",
  //   "Chad",
  //   "Chile",
  //   "China",
  //   "Christmas Island",
  //   "Cocos (Keeling) Islands",
  //   "Colombia",
  //   "Comoros",
  //   "Congo",
  //   "Cook Islands",
  //   "Costa Rica",
  //   "Croatia",
  //   "Cuba",
  //   "Curaçao",
  //   "Cyprus",
  //   "Czech Republic",
  //   "Côte d'Ivoire",
  //   "Democratic Republic of Congo",
  //   "Denmark",
  //   "Djibouti",
  //   "Dominica",
  //   "Dominican Republic",
  //   "Ecuador",
  //   "Egypt",
  //   "El Salvador",
  //   "Equatorial Guinea",
  //   "Eritrea",
  //   "Estonia",
  //   "Ethiopia",
  //   "Falkland Islands",
  //   "Faroe Islands",
  //   "Federated States of Micronesia",
  //   "Fiji",
  //   "Finland",
  //   "France",
  //   "French Guiana",
  //   "French Polynesia",
  //   "French Southern Territories",
  //   "Gabon",
  //   "Gambia",
  //   "Georgia",
  //   "Germany",
  //   "Ghana",
  //   "Gibraltar",
  //   "Greece",
  //   "Greenland",
  //   "Grenada",
  //   "Guadeloupe",
  //   "Guam",
  //   "Guatemala",
  //   "Guernsey",
  //   "Guinea",
  //   "Guinea-Bissau",
  //   "Guyana",
  //   "Haiti",
  //   "Heard and McDonald Islands",
  //   "Honduras",
  //   "Hong Kong",
  //   "Hungary",
  //   "Iceland",
  //   "India",
  //   "Indonesia",
  //   "Iran",
  //   "Iraq",
  //   "Ireland",
  //   "Isle of Man",
  //   "Israel",
  //   "Italy",
  //   "Jamaica",
  //   "Japan",
  //   "Jersey",
  //   "Jordan",
  //   "Kazakhstan",
  //   "Kenya",
  //   "Kiribati",
  //   "Kuwait",
  //   "Kyrgyzstan",
  //   "Lao People's Democratic Republic",
  //   "Latvia",
  //   "Lebanon",
  //   "Lesotho",
  //   "Liberia",
  //   "Libya",
  //   "Liechtenstein",
  //   "Lithuania",
  //   "Luxembourg",
  //   "Macau",
  //   "Macedonia",
  //   "Madagascar",
  //   "Malawi",
  //   "Malaysia",
  //   "Maldives",
  //   "Mali",
  //   "Malta",
  //   "Marshall Islands",
  //   "Martinique",
  //   "Mauritania",
  //   "Mauritius",
  //   "Mayotte",
  //   "Mexico",
  //   "Moldova",
  //   "Monaco",
  //   "Mongolia",
  //   "Montenegro",
  //   "Montserrat",
  //   "Morocco",
  //   "Mozambique",
  //   "Myanmar",
  //   "Namibia",
  //   "Nauru",
  //   "Nepal",
  //   "New Caledonia",
  //   "New Zealand",
  //   "Nicaragua",
  //   "Niger",
  //   "Nigeria",
  //   "Niue",
  //   "Norfolk Island",
  //   "North Korea",
  //   "Northern Mariana Islands",
  //   "Norway",
  //   "Oman",
  //   "Pakistan",
  //   "Palau",
  //   "Panama",
  //   "Papua New Guinea",
  //   "Paraguay",
  //   "Peru",
  //   "Philippines",
  //   "Pitcairn",
  //   "Poland",
  //   "Portugal",
  //   "Puerto Rico",
  //   "Qatar",
  //   "Romania",
  //   "Russian Federation",
  //   "Rwanda",
  //   "Réunion",
  //   "Saint Barthélemy",
  //   "Saint Helena",
  //   "Saint Kitts and Nevis",
  //   "Saint Lucia",
  //   "Saint Vincent and the Grenadines",
  //   "Saint-Martin (France)",
  //   "Samoa",
  //   "San Marino",
  //   "Sao Tome and Principe",
  //   "Saudi Arabia",
  //   "Senegal",
  //   "Serbia",
  //   "Seychelles",
  //   "Sierra Leone",
  //   "Singapore",
  //   "Sint Maarten (Dutch part)",
  //   "Slovakia",
  //   "Slovenia",
  //   "Solomon Islands",
  //   "Somalia",
  //   "South Africa",
  //   "South Georgia and the South Sandwich Islands",
  //   "South Korea",
  //   "South Sudan",
  //   "Spain",
  //   "Sri Lanka",
  //   "St. Pierre and Miquelon",
  //   "State of Palestine",
  //   "Sudan",
  //   "Suriname",
  //   "Svalbard and Jan Mayen Islands",
  //   "Swaziland",
  //   "Sweden",
  //   "Switzerland",
  //   "Syria",
  //   "Taiwan",
  //   "Tajikistan",
  //   "Tanzania",
  //   "Thailand",
  //   "The Netherlands",
  //   "Timor-Leste",
  //   "Togo",
  //   "Tokelau",
  //   "Tonga",
  //   "Trinidad and Tobago",
  //   "Tunisia",
  //   "Turkey",
  //   "Turkmenistan",
  //   "Turks and Caicos Islands",
  //   "Tuvalu",
  //   "Uganda",
  //   "Ukraine",
  //   "United Arab Emirates",
  //   "United Kingdom",
  //   "United States Minor Outlying Islands",
  //   "United States",
  //   "Uruguay",
  //   "Uzbekistan",
  //   "Vanuatu",
  //   "Vatican",
  //   "Venezuela",
  //   "Vietnam",
  //   "Virgin Islands (British)",
  //   "Virgin Islands (U.S.)",
  //   "Wallis and Futuna Islands",
  //   "Western Sahara",
  //   "Yemen",
  //   "Zambia",
  //   "Zimbabwe",
  //   "Åland Islands",
  // ];

  // mainSpecs: string[] = [
  //   'Dentistry'
  // ];

  // specializations: string[] = [
  //   'Implantology',
  //   'Periodontics',
  //   'Prosthodontics',
  //   'Restorative dentistry',
  //   'Endodontics',
  //   'Orthodontics',
  //   'Pediatric dentistry',
  //   'Oral and maxillofacial surgery',
  //   'Oral and maxillofacial pathology',
  //   'Oral and maxillofacial radiology',
  //   'Dental public health',
  //   'Dental Marketing',
  //   'Dental Exams',
  //   'Dental Management'
  // ];

  // salutations: string[] = [
  //   'Mr.',
  //   'Ms.',
  //   'Mrs.',
  //   'Dr.'
  // ];

  // consultation_types: string[] = [
  //   'One-time consultation',
  //   'Monthly subscription'
  // ];

  // share_types: string[] = [
  //   'post_id',
  //   'event_id',
  //   'doc_id',
  //   'consultation_id'
  // ];

  // notifications: string[] = [
  //   'commented on Your post',
  //   'commented on Your file',
  //   'shared Your post',
  //   'shared Your file',
  //   'liked Your post',
  //   'liked Your file',
  //   'started following You',
  //   'asked to become Your mentee',
  //   'approved Your mentorship request',
  //   'bought Your library item',
  //   'bought Your one-time mentorship session',
  //   'subscribed to Your monthly mentorship sessions'
  // ]

  constructor(private ref: ApplicationRef){
  }

  // public getCountryName(id: number) : string {
  //   return this.countries[id] ? this.countries[id] : '';
  // }

  // public getSpecName(id: number) : string {
  //   return this.specializations[id] ? this.specializations[id] : '';
  // }

  // public getNotification(id: number) : string {
  //   return this.notifications[id] ? this.notifications[id] : '';
  // }

  // public getSpecIndex(names: any[]) : string[] {
  //   let result = [];
  //   _.each(this.specializations, (spec, key) => {
  //     _.each(names, (name)=>{
  //       if(spec.toLowerCase().indexOf(name.toLowerCase()) !== -1){
  //         result.push(key.toString());
  //       }
  //     })

  //   });
  //   return result;
  // }

  // public getMainSpecName(id: number = 0) : string {
  //   return this.mainSpecs[id] ? this.mainSpecs[id] : '';
  // }

  // public getUserMainSpecName(user_id: string = Meteor.userId()) : string {
  //   let user = Meteor.users.findOne(user_id);
  //   return user ? this.specializations[user.profile.spec] : '';
  // }

  // public getConsultationType(id: number) : string {
  //   return this.consultation_types[id] ? this.consultation_types[id] : '';
  // }

  // public getLikeCount(post_id: string, type: number = 0) : number {
  //   let query: any = {};
  //   query[this.share_types[type]] = post_id;
  //   return Likes.find(query).count();
  // }

  // public getShareCount(post_id: string, type: number = 0) : number {
  //   let query: any = {};
  //   query[this.share_types[type]] = post_id;
  //   return Shares.find(query).count();
  // }

  // public getCommentCount(post_id: string, type: string) : number {
  //   let query: any = {};
  //   query['item_id'] = post_id;
  //   query['type'] = type;
  //   return Comments.find(query).count();
  // }

  // public getUserTitle(user_id: string = Meteor.userId()) : string {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   return user ? user.profile.title : '';
  // }

  // public getUserSalutation(user_id: string = Meteor.userId()) : string {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   return user ? user.profile.salutation : '';
  // }

  // public getUserName(user_id: string = Meteor.userId()) : string {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   return user ? user.profile.first_name + ' ' + user.profile.last_name : '';
  // }

  // public getUserFirstName(user_id: string = Meteor.userId()) : string {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   return user ? user.profile.first_name : '';
  // }

  // public getFullUserName(user_id: string = Meteor.userId()) : string {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   return user ? user.profile.title + ' ' + user.profile.first_name + ' ' + user.profile.last_name : '';
  // }

  // public myProfile(user_id: string) : boolean {
  //   return user_id == Meteor.userId();
  // }

  // public isMentor(user_id?: string) : boolean {
  //   if(user_id){
  //     let user = Meteor.users.findOne({_id: user_id});
  //     return user ? user.profile.mentor : false;
  //   }
  //   else {
  //     if(Meteor.user() && Meteor.user().profile){
  //       return Meteor.user().profile.mentor;
  //     }
  //     return false;
  //   }
  // }

  // public getMentorRating(user_id: string = Meteor.userId()) : number {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   if(user && user.profile.mentor){
  //     let reviews: Review[] = Reviews.find({user_id: user_id}, {fields: {rating: 1}}).fetch();
  //     if(reviews.length > 0){
  //       let sum = 0;
  //       for(let review of reviews){
  //         sum += review.rating;
  //       }
  //       return Math.round((sum / reviews.length) * 10) / 10;
  //     }
  //   }
  //   return 0;
  // }

  // public getReviewCount(user_id: string = Meteor.userId()) : number {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   if(user && user.profile.mentor){
  //     return Reviews.find({user_id: user_id}).count();
  //   }
  //   return 0;
  // }

  // public hasConsultations(user_id: string = Meteor.userId()) : boolean {
  //   return Consultations.find({user_id: user_id}).count() > 0;
  // }

  // public hasEvents(user_id: string = Meteor.userId()) : boolean {
  //   return Events.find({user_id: user_id}).count() > 0;
  // }

  // public getUserSubtitle(user_id: string = Meteor.userId()) : string {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   if(user.profile != null){
  //     return user.profile.student == true ? 'Student, ' + this.getSpecName(user.profile.spec) : this.getSpecName(user.profile.spec);
  //   }
  //   return '';
  // }

  // public hasPicture(user_id?: string){
  //   if(!user_id)
  //     user_id = Meteor.userId();
  //   let user = Meteor.users.findOne({_id: user_id});
  //   return user && (user.profile.picture != null || user.profile.picture_cropped != null);
  // }

  // public getUserPicture(user_id: string = Meteor.userId(), fallback: string = '/images/user-icon.png') : string {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   if(user && user.profile.picture_cropped){
  //     return user.profile.picture_cropped;
  //   }
  //   else {
  //     return user && user.profile.picture ? user.profile.picture : fallback;
  //   }
  // }

  // public getLetterAvatar(user_id: string = Meteor.userId()) : Object {
  //   let user = Meteor.users.findOne({_id: user_id});
  //   let text = '? ?';
  //   let bg = '#97D819';
  //   if(user && user.profile){
  //     text = user.profile.first_name + ' ' + user.profile.last_name;
  //     bg = user.profile.mentor ? '#5AA8F5' : '#97D819';
  //   }
  //   return {
  //     size: 40,
  //     background: bg,
  //     fontColor: '#FFFFFF',
  //     isSquare: false,
  //     text: text
  //   }
  // }

  // public getMenteeCount(user_id: string = Meteor.userId()) : number {
  //   return Mentees.find({mentor_id: user_id}).count();
  // }

  // public getMentorCount(user_id: string = Meteor.userId()) : number {
  //   return Mentees.find({mentee_id: user_id}).count();
  // }

  // public getFollowerCount(user_id: string = Meteor.userId()) : number {
  //   return Follows.find({followed_id: user_id}).count();
  // }

  // public cropPicture(url: string, width: number = 250, height: number = 250) : string {
  //   if(!url)
  //     return '/images/user-icon.png';
  //   let splitUrl = url.split('upload');
  //   return splitUrl[0] + 'upload/w_' + width + ',h_' + height + ',c_fill,g_auto' + splitUrl[1];
  // }

  // public getVideoThumbnail(videoUrl: string, width?: number, height?: number) : string {
  //   if(!videoUrl){
  //     return '';
  //   }
  //   else {
  //     let splitUrl = videoUrl.split('upload');
  //     let extension = splitUrl[1].split('.');
  //     if(width && height){
  //       return splitUrl[0] + 'upload/h_' + height + ',w_' + width + ',c_fill,g_auto,q_50' + extension[0] + '.jpg';
  //     }
  //     return splitUrl[0] + 'upload/h_250,c_fill,g_auto,q_50' + extension[0] + '.jpg';
  //   }
  // }

  // public getVideoExtension(videoUrl: string, extension: string) : string {
  //   if(!videoUrl){
  //     return '';
  //   }
  //   else {
  //     let splitUrl = videoUrl.split('.');
  //     splitUrl.pop();
  //     return splitUrl.join('.') + '.' + extension;
  //   }
  // }

  // public setVideoQuality(videoUrl: string, quality: number = 50){
  //   // Returns URL to video in different quality (1 - lowest, 100 - highest)
  //   let splitUrl = videoUrl.split('/');
  //   let filename = splitUrl[splitUrl.length - 1];
  //   splitUrl.pop();
  //   splitUrl.pop();
  //   return splitUrl.join('/') + '/q_' + quality + ',h_500/' + filename;
  // }

  // public ownDocument(doc_id: string) : boolean {
  //   // TODO
  //   return true;
  // }

  // public askMentoring(user_id: string){
  //   console.log('NOT IMPLEMENTED');
  // }

  // public getTimeDiff(current: number, posted: number) : string {
  //   var diff = current - posted;
  //   diff = Math.floor(diff / 1000);
  //   var secs_diff = diff % 60;
  //   diff = Math.floor(diff / 60);
  //   var mins_diff = diff % 60;
  //   diff = Math.floor(diff / 60);
  //   var hours_diff = diff % 24;
  //   diff = Math.floor(diff / 24);
  //   var days_diff = diff % 7;
  //   diff = Math.floor(diff / 7);
  //   var months_diff = Math.floor(days_diff / 30);
  //   var years_diff = Math.floor(days_diff / 365);

  //   if(years_diff > 0) {
  //     return years_diff + (years_diff == 1 ? ' year' : ' years') + ' ago';
  //   }
  //   if(months_diff > 0) {
  //     return months_diff + (months_diff == 1 ? ' month' : ' months') + ' ago';
  //   }
  //   if(days_diff > 0) {
  //       return days_diff + (days_diff == 1 ? ' day' : ' days') + ' ago';
  //   }
  //   if(hours_diff > 0) {
  //     return hours_diff + (hours_diff == 1 ? ' hour' : ' hours') + ' ago';
  //   }
  //   if(mins_diff > 0) {
  //     return mins_diff + (mins_diff == 1 ? ' minute' : ' minutes') + ' ago';
  //   }
  //   if(secs_diff > 0) {
  //     return secs_diff + (secs_diff == 1 ? ' second' : ' seconds') + ' ago';
  //   }
  //   return 'a moment ago';
  // }

  // public like(post_id: string, type: number = 0) : void {
  //   Meteor.call('like', post_id, this.share_types[type], (error, result) => {
  //     this.ref.tick();
  //   });
  // }

  // public iLikeIt(post_id: string, type: number = 0) : boolean {
  //   let query: any = {user_id: Meteor.userId()};
  //   query[this.share_types[type]] = post_id;
  //   return Likes.findOne(query) != null;
  // }

  // public iSharedIt(post_id: string, type: number = 0) : boolean {
  //   let query: any = {user_id: Meteor.userId()};
  //   query[this.share_types[type]] = post_id;
  //   return Shares.findOne(query) != null;
  // }

  // public iCommentedIt(post_id: string, type: number = 0) : boolean {
  //   let query: any = {user_id: Meteor.userId()};
  //   query[this.share_types[type]] = post_id;
  //   return Comments.findOne(query) != null;
  // }

  // // 0 - post, 1 - event, 2 - doc
  // public share(content: Post | Doc | Event, type: number = 0) : void {
  //   let params: any = {newPost: false};
  //   params[this.share_types[type].split('_')[0]] = (type != 0) ? content._id : content;
  //   // Open share page and send params to it
  // }

  // public userSearch(query: string, getAll: boolean = false) : Object[] {
  //   // Returns followers/followed people that match with given first name and/or last name
  //   if (query != '' && query != null) {
  //     // Get ids of followers / follows
  //     let viableIds: string[] = [];
  //     let myFollows: Follow[] = Follows.find({user_id: Meteor.userId()}, {fields: {followed_id: 1}}).fetch();
  //     let myFollowers: Follow[] = Follows.find({followed_id: Meteor.userId()}, {fields: {user_id: 1}}).fetch();
  //     for(let follow of myFollows){
  //       viableIds.push(follow.followed_id);
  //     }
  //     for(let follow of myFollowers){
  //       if(viableIds.indexOf(follow.user_id) == -1)
  //         viableIds.push(follow.user_id);
  //     }

  //     if(getAll == true){
  //       return Meteor.users.find({_id: {$in: viableIds}}).fetch();
  //     }

  //     // Proceed with search
  //     let friend: string[] = query.split(' ');
  //     let terms: Object[];
  //     if(friend.length == 1 || friend[1] == ''){
  //       terms = [
  //         {'profile.first_name': {$regex: friend[0], $options: 'i'}},
  //         {'profile.last_name': {$regex: friend[0], $options: 'i'}},
  //       ]
  //     }
  //     if(friend.length > 1 && friend[1] != ''){
  //       terms = [
  //         {'profile.first_name': {$regex: friend[0], $options: 'i'}, 'profile.last_name': {$regex: friend[1], $options: 'i'}},
  //       ]
  //     }
  //     return Meteor.users.find({_id: {$in: viableIds}, $or: terms}).fetch();
  //   }
  // }

  // public networkUserSearch(query: string, countries: any[] = [], spec: any[] = [], mentor: boolean = false) : Object[] {
  //   if (query != '' && query != null) {

  //     // Proceed with search
  //     let friend: string[] = query.split(' ');
  //     let terms: Object[];
  //     let array: any[] = [{_id: {$ne: Meteor.userId()}}];
  //     if(friend.length == 1 || friend[1] == ''){
  //       terms = [
  //         {'profile.first_name': {$regex: friend[0], $options: 'i'}},
  //         {'profile.last_name': {$regex: friend[0], $options: 'i'}},
  //         {'emails.0.address': {$regex: friend[0], $options: 'i'}}
  //       ]
  //     }
  //     if(friend.length > 1 && friend[1] != ''){
  //       terms = [
  //         {'profile.first_name': {$regex: friend[0], $options: 'i'}, 'profile.last_name': {$regex: friend[1], $options: 'i'}},
  //       ]
  //     }
  //     array.push({$or: terms});
  //     if(spec.length > 0) {
  //       console.log('hi');
  //       console.log(spec);
  //       let specObj: Object = {"profile.spec": {$in: spec}};
  //       array.push(specObj);
  //     }
  //     if(countries.length > 0) {
  //       let countryObj: Object = {"profile.address.country": {$in: countries}};
  //       array.push(countryObj);
  //     }
  //     if(mentor == true) {
  //       array.push({"profile.mentor": true});
  //     }
  //     console.log(array);
  //     return Meteor.users.find({$and: array}).fetch();
  //   }
  // }

  // public iBoughtThisDoc(doc_id: string) : boolean {
  //   return Purchases.findOne({user_id: Meteor.userId(), 'doc._id': doc_id}) != null;
  // }

  // public parseDateString(str: string, append?: string) : string {
  //   if(append == null)
  //     append = '';
  //   let split = str.split('T');
  //   let date = split[0].split('-');
  //   let time = split[1].split(':');
  //   return date[2] + '/' + date[1] + '/' + date[0] + ', ' + time[0] + ':' + time[1] + append;
  // }

  // public follow(followed_id: string) : void {
  //   Meteor.call('follow', Meteor.userId(), followed_id);
  // }

  // public unfollow(_id: string) : void {
  //   Meteor.call('unfollow', _id);
  // }

  // public following(user_id: string) : boolean {
  //   return Follows.find({user_id: Meteor.userId(), followed_id: user_id}).count() > 0;
  // }

  // public canMessage(user_id: string) : boolean {
  //   return Follows.find({$or: [{user_id: user_id, followed_id: Meteor.userId()}, {user_id: Meteor.userId(), followed_id: user_id}]}).count() > 0;
  // }

  // public getFollowSuggestions(count: number = 10, mentor: boolean = false, filters: any[] = [], page: number = 0) : any[] {
  //   // Follows of my follows
  //   let results: any[] = [];
  //   let ids: string[] = [];
  //   let filterQuery = {};
  //   let mentorQuery = {};
  //   if(mentor){
  //     mentorQuery = {'profile.mentor': true};
  //   }

  //   if(filters.length <= 0){
  //     filterQuery = {'profile.spec_fields': {$in: filters}};
  //   }

  //   // Get my follows
  //   let myFollows: Follow[] = Follows.find({user_id: Meteor.userId()}, {fields: {followed_id: 1}}).fetch();

  //   // Get follows of my follows
  //   let follows: Follow[] = Follows.find({user_id: {$in: myFollows}, followed_id: {$ne: Meteor.userId()}}, {fields: {followed_id: 1}}).fetch();
  //   for(let follow of follows){
  //     ids.push(follow.followed_id);
  //   }

  //   // Get profiles of follows of my follows
  //   results = Meteor.users.find({_id: {$in: ids}, 'profile.mentor': mentor}, {limit: count - results.length, skip: count * page}).fetch();

  //   // Exclude my existing follows
  //   for(let follow of myFollows){
  //     ids.push(follow.followed_id);
  //   }

  //   // People from same city, excluding the ones already in array
  //   if(Meteor.user().profile.address.city && Meteor.user().profile.address.country && ids.length < count){
  //     results.push.apply(results, Meteor.users.find({$and:[{_id: {$nin: ids, $ne: Meteor.userId()}, 'profile.address.city': Meteor.user().profile.address.city}, mentorQuery, filterQuery]}, {limit: count - results.length, skip: count * page}).fetch());
  //     for(let result of results){
  //       ids.push(result._id);
  //     }
  //   }

  //   // Same country
  //   if(Meteor.user().profile.address.country && Meteor.user().profile.address.country != -1 && ids.length < count){
  //     results.push.apply(results, Meteor.users.find({$and:[{_id: {$nin: ids, $ne: Meteor.userId()}, 'profile.address.country': Meteor.user().profile.address.country}, mentorQuery, filterQuery]}, {limit: count - results.length, skip: count * page}).fetch());
  //     for(let result of results){
  //       ids.push(result._id);
  //     }
  //   }

  //   // Same spec_fields
  //   // if(ids.length < count){
  //   //   results.push.apply(results, Meteor.users.find({$and:[{_id: {$nin: ids, $ne: Meteor.userId()}, 'profile.spec_fields': {$in: Meteor.user().profile.spec_fields}}, mentorQuery, filterQuery]}).fetch());
  //   // }

  //   if(results.length > count){
  //     results.splice(0, count);
  //   }

  //   console.log(results);

  //   return results;
  // }

  public loggedIn() : boolean {
    return Meteor.userId() != null;
  }

  // public userLoaded() : boolean {
  //   return Meteor.user() != null;
  // }

  // public logout() : void {
  //   if(Meteor.userId()){
  //     Meteor.logout();
  //   }
  // }

  public isAdmin() : boolean {
    if(this.loggedIn()){
      if(Meteor.user()){
        let profile = Meteor.user().profile;
        return profile.role != null && profile.role == -1;
      }
    }
    return false;
  }
}

