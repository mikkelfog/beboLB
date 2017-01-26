//only executed on the server
import { Meteor } from 'meteor/meteor';
import { Names } from '../imports/collections/collections';
import { rejectednamesList } from '../imports/collections/collections';
import { favoritenamesList } from '../imports/collections/collections';


Meteor.startup(() => {
  if (Names.find().count() === 0) {
      console.log("Importing private/products.json to db")
      var data = JSON.parse(Assets.getText('trialnames.json')); //meteor looks for this file in the "private" folder
      data.forEach(function (item, index, array) {
          Names.insert(item);
      });
  };
  var numberofnames = Names.find().count();
  console.log(numberofnames);
});
