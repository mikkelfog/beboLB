childnameList = new Mongo.Collection('childnames');
favoritenamesList = new Mongo.Collection('favoritenames');
rejectednamesList = new Mongo.Collection('rejectednames');


if(Meteor.isClient){
  Template.beboApp.helpers({
    'childname': function(){
      return childnameList.find();
    },
    'favoritename': function(){
      return favoritenamesList.find();
    },
    'rejectedname': function(){
      return rejectednamesList.find();
    }
  });
  Template.beboApp.events({
    'click .childname': function(){
      var childnameID = this._id;
      Session.set('selectedchildname', childnameID);
      var selectedchildname = Session.get('selectedchildname');
    },
    'click .favorite': function(){
      var selectedchildname = Session.get('selectedchildname');
      favoritenamesList.insert({
        name: selectedchildname
      });
    },
    'click .reject': function(){
      var selectedchildname = Session.get('selectedchildname');
      rejectednamesList.insert({
        name: selectedchildname
      });
    }
  });
}

if(Meteor.isServer){
  // this code only runs on the server
}
