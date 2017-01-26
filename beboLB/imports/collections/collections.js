//Declare our collection
import { Mongo } from 'meteor/mongo';

export const Names = new Mongo.Collection('names');
export const favoritenamesList = new Mongo.Collection('favoritenamesList');
export const rejectednamesList = new Mongo.Collection('rejectednamesList');
