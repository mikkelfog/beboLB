import { Template } from 'meteor/templating';
import { Names } from '../collections/collections';
import { rejectednamesList } from '../collections/collections';
import { favoritenamesList } from '../collections/collections';
import './namegenerator.html'

Template.namegenerator.helpers({

});

// The events that can happen in the namegenerator app
Template.namegenerator.events({
  //Generate a name and set name to current name
  'click .namegenerator': function(){
    var familyName = $(".last_name").val(); //Det sidste jeg tilføjede var '()' bag val. Hvad gjorde den Søren?
    var n = Names.find().count();
    var r = Math.floor(Math.random() * n);
    var current_name = Names.findOne({ number: r}, {fields: {name:true}}).name;
    $(".name_holder").html(current_name + " " + familyName);
    Session.set('current_name', current_name);
  },
  //add to favorite
  'click .favorite': function(){
    var current_name = Session.get('current_name');
    favoritenamesList.insert({
      name: current_name,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    var familyName = $(".last_name").val();
    var n = Names.find().count();
    var r = Math.floor(Math.random() * n);
    var current_name = Names.findOne({ number: r}, {fields: {name:true}}).name;
    $(".name_holder").html(current_name + " " + familyName);
    Session.set('current_name', current_name);
  },
  //reject function (add to rejected list)
  'click .reject': function(){
    var current_name = Session.get('current_name');
    rejectednamesList.insert({
      name: current_name,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    var familyName = $(".last_name").val();
    var n = Names.find().count();
    var r = Math.floor(Math.random() * n);
    var current_name = Names.findOne({ number: r}, {fields: {name:true}}).name;
    $(".name_holder").html(current_name + " " + familyName);
    Session.set('current_name', current_name);
  }
});
