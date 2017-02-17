import { Template } from 'meteor/templating';
import { rejectednamesList } from '../collections/collections';
import './rejectList.html';

//Rejected names list functions
Template.rejectListTemplate.helpers({
  //this code renders the rejectednamesList
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
Template.rejectListTemplate.events({
  //logic behind following function: if something is removed from rejected, it's because parent is reconsidering,
  //which is why it's just removed from here, and thus allowed to be shown again in namegenerator
  'click .removefromrejected': function(){
    var selectedchildname = Session.get('selectedchildname');
    var selectedchildID = Session.get('selectedchildID');
    rejectednamesList.remove({
      _id: selectedchildID
    });
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
  }
});
