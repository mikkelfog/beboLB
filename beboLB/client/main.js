import { Names } from '../imports/collections/collections';
import { rejectednamesList } from '../imports/collections/collections';
import { favoritenamesList } from '../imports/collections/collections';

Template.namegenerator.helpers({

});

// The events that can happen in the namegenerator app
Template.namegenerator.events({
  //Generate a name and set name to current name
  'click .namegenerator': function(){
    /* - prøver at få denne til at lytte på css elementet med class =.last_name, men der sker ikke en skid.
    var familyName = document.getElementById(".last_name").value;
    console.log(familyName);
    */
    var n = Names.find().count();
    console.log(n);
    var r = Math.floor(Math.random() * n);
    console.log(r);
    var current_name = Names.findOne({ number: r}, {fields: {name:true}}).name;
    console.log(current_name);
    $(".name_holder").html(current_name);
    Session.set('current_name', current_name);
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
  }
});

//favoritenamesList functions
Template.favoritenamesListTemplate.helpers({
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
Template.favoritenamesListTemplate.events({
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

//Rejected names list functions
Template.rejectednamesTemplate.helpers({
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
Template.rejectednamesTemplate.events({
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

//Childnamelist functions
Template.childnamelistTemplate.helpers({
  //this renders the complete list of childnames. It's still pretty useless, but nice for the visual overview
  'childname': function(){
    return Names.find();
  },
});
