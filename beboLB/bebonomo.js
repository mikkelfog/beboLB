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

  //select a name function
  Template.beboApp.events({
    'click .namegenerator': function(){
      var n = childnameList.find().count();
      console.log(n);
      var r = Math.floor(Math.random() * n);
      console.log(r);
      var current_name = childnameList.find({number:r},{_id});
      console.log(current_name);
      //var current_name = childnameList[Math.floor(Math.random()*childnameList.length)].childnamelist;
      //console.log(current_name);
      //$(".name_holder").html(current_name);
    },
    'click .childname': function(){
      var selectedchildname = this.name;
      var selectedchildID = this._id;
      Session.set('selectedchildname', selectedchildname);
      var selectedchildname = Session.get('selectedchildname');
      Session.set('selectedchildID', selectedchildID);
      var selectedchildID = Session.get('selectedchildID');
      console.log(selectedchildname);
      console.log(selectedchildID);
    },
    //add to favorite function
    'click .favorite': function(){
      var selectedchildname = Session.get('selectedchildname');
      var selectedchildID = Session.get('selectedchildID');
      favoritenamesList.insert({
        name: selectedchildname
      });
      childnameList.remove({
        _id: selectedchildID
      })
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
    }
  });
  Template.addNameForm.events({
      'submit form': function(event){
        event.preventDefault();
        var childname = event.target.childName.value;
        var childNumber = event.target.childName.value;
        childnameList.insert({
          name: childname,
          score: parseInt(childNumber)
        });
        event.target.childName.value = "";
        event.target.childNumber.value = "";
      }
    });
}

if(Meteor.isServer){
  // insert server code here
}
