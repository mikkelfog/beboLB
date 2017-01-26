import { Names } from '../imports/collections/collections';
import { rejectednamesList } from '../imports/collections/collections';
import { favoritenamesList } from '../imports/collections/collections';

Template.beboApp.helpers({
  'childname': function(){
    return Names.find();
  },
  'favoritename': function(){
    return favoritenamesList.find();
  },
  'rejectedname': function(){
    return rejectednamesList.find();
  },
  // this sets the css class "selected" equal to the selected nameId - it's used to help mark the selected name in yellow
  'selectedClass': function(){
    var childnameID = this._id;
    var selectedchildname = Session.get('selectedchildID');
    if(childnameID == selectedchildname){
        return "selected"
    }
  }
});

//Generate a name and set name to current name
Template.beboApp.events({
  'click .namegenerator': function(){
    var n = Names.find().count();
    console.log(n);
    var r = Math.floor(Math.random() * n);
    console.log(r);
    var current_name = Names.findOne({ number: r}, {fields: {name:true}}).name;
    console.log(current_name);
    $(".name_holder").html(current_name);
    Session.set('current_name', current_name);
  },
  // select childname function
  'click .childname': function(){
    var childname = this.name;
    var childID = this._id;
    Session.set('selectedchildname', childname);
    var selectedchildname = Session.get('selectedchildname');
    Session.set('selectedchildID', childID);
    var selectedchildID = Session.get('selectedchildID');
    console.log(selectedchildname);
    console.log(selectedchildID);
  },
  //add to favorite function
  'click .favorite': function(){
    var current_name = Session.get('current_name');
    console.log(current_name);
    favoritenamesList.insert({
      name: current_name
    });
  },
  //reject function (add to rejected list)
  'click .reject': function(){
    var current_name = Session.get('current_name');
    console.log(current_name);
    rejectednamesList.insert({
      name: current_name
    });
  },
  //remove from favorites function
  //if something is removed from favorites, it has to be rejected, which is why it goes into the rejected list
  'click .removefromfavorites': function(){
    var selectedchildname = Session.get('selectedchildname');
    var selectedchildID = Session.get('selectedchildID');
    rejectednamesList.insert({
      name: selectedchildname
    });
    favoritenamesList.remove({
      _id: selectedchildID
    })
  },
  //logic behind following function: if something is removed from rejected, it's because parent is reconsidering,
  //which is why it's added back to childnamelist
  //(but this is only relevant, as long as the nameholder list is there to support the visual overview;
  //IRL, nothing is ever removed from childnamelist)
  'click .removefromrejected': function(){
    var selectedchildname = Session.get('selectedchildname');
    var selectedchildID = Session.get('selectedchildID');
    rejectednamesList.remove({
      _id: selectedchildID
    });
  },
});
