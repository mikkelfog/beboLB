// add family name form
Template.addfamilyNameForm.events({
  'submit form': function(){
    event.preventDefault();
    var familyName = event.target.familyName;
  }
});
