childnameList = new Mongo.Collection('childnames');
favoritenamesList = new Mongo.Collection('favoritenames');
rejectednamesList = new Mongo.Collection('rejectednames');


if(Meteor.isClient){
  Template.beboApp.helpers({
    /*
    'childname2': function(){
      return childnameList.find().fetch();
    },*/
    'childname': function(){
      return childnameList.find();
    },
    'favoritename': function(){
      return favoritenamesList.find();
    },
    'rejectedname': function(){
      return rejectednamesList.find();
    },
    // this sets the css class "selected" equal to the selected playerId
    'selectedClass': function(){
      var childnameID = this._id;
      var selectedchildname = Session.get('selectedchildID');
      if(childnameID == selectedchildname){
          return "selected"
      }
    }
  });

  //select a name function
  Template.beboApp.events({
    'click .namegenerator': function(){
      var n = childnameList.find().count();
      console.log(n);
      var r = Math.floor(Math.random() * n);
      console.log(r);
      var current_name = childnameList.findOne({ number: r}, {fields: {name:true}}).name;
      console.log(current_name);
      $(".name_holder").html(current_name);
      Session.set('current_name', current_name);
    },
    // select childname function
    'click .childname': function(){
      var childname = this.name;
      var childID = this._id;
      var childNumber = this.number;
      Session.set('selectedchildname', childname);
      var selectedchildname = Session.get('selectedchildname');
      Session.set('selectedchildID', childID);
      var selectedchildID = Session.get('selectedchildID');
      Session.set('selectedchildNumber', childNumber);
      var selectedchildNumber = Session.get('selectedchildNumber');
      console.log(selectedchildname);
      console.log(selectedchildID);
      console.log(selectedchildNumber);
    },
    //add to favorite function
    'click .favorite': function(){
      //Old favorite function
      /*
      var selectedchildname = Session.get('selectedchildname');
      var selectedchildID = Session.get('selectedchildID');
      favoritenamesList.insert({
        name: selectedchildname
      });
      childnameList.remove({
        _id: selectedchildID
      })
      */
      //new favorite function
      var current_name = Session.get('current_name');
      console.log(current_name);
      favoritenamesList.insert({
        name: current_name
      });
    },
    //reject function (add to rejected list)
    'click .reject': function(){
      var selectedchildname = Session.get('selectedchildname');
      var selectedchildID = Session.get('selectedchildID');
      rejectednamesList.insert({
        name: selectedchildname
      });
      childnameList.remove({
        _id: selectedchildID
      })
    },
    //remove from favorites function
    //if something is removed from favorites, it has to be rejected, which is why it goes into the rejected list
    'click .removefromfavorites': function(){
      var selectedchildname = Session.get('selectedchildname');
      var selectedchildID = Session.get('selectedchildID');
      rejectednamesList.insert({
        name: selectedchildname
      });
      //maybe this shouldn't remove it from the childnamelist, but rather keep it there.
      //But since the childnamelist is there for the visual overview right now, it should be removed.
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
      childnameList.insert({
        name: selectedchildname
      });
    },
    //remove from childnamelist function
    'click .removefromchildnamelist': function(){
      var selectedchildID = Session.get('selectedchildID');
      childnameList.remove({
        _id: selectedchildID
      });
    }
  });
  Template.addNameForm.events({
      'submit form': function(event){
        event.preventDefault();
        var childname = event.target.childName.value;
        var childNumber = event.target.childNumber.value;
        childnameList.insert({
          name: childname,
          number: parseInt(childNumber)
        });
        event.target.childName.value = "";
        event.target.childNumber.value = "";
      }
    });
}

if(Meteor.isServer){
  // insert server code here
}
