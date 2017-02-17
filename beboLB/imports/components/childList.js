import { Template } from 'meteor/templating';
import { Names } from '../collections/collections';
import './childList.html';

//Childnamelist functions
Template.childListTemplate.helpers({
  //this renders the complete list of childnames. It's still pretty useless, but nice for the visual overview
  'childname': function(){
    return Names.find();
  },
});
