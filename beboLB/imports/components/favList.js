import { Names } from '../collections/collections';
import { rejectednamesList } from '../collections/collections';
import { favoritenamesList } from '../collections/collections';
import './favList.html';

//favoritenamesList functions
Template.favListTemplate.helpers({
  //this renders the names in favoritenamesList
  'favoritename': function(){
    return favoritenamesList.find();
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
Template.favListTemplate.events({
  //remove from favorites function
  //if something is removed from favorites, it has to be rejected, which is why it goes into the rejected list
  'click .removefromfavorites': function(){
    var selectedchildname = Session.get('selectedchildname');
    var selectedchildID = Session.get('selectedchildID');
    rejectednamesList.insert({
      name: selectedchildname,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    favoritenamesList.remove({
      _id: selectedchildID
    })
  },
  // select childname function
  'click .childname': function(){
    var childname = this.name;
    var childID = this._id;
    var owner = this.owner;
    var username = this.username;
    Session.set('selectedchildname', childname);
    var selectedchildname = Session.get('selectedchildname');
    Session.set('selectedchildID', childID);
    var selectedchildID = Session.get('selectedchildID');
    console.log(selectedchildname);
    console.log(selectedchildID);
    console.log(owner);
    console.log(username);
  }
});
