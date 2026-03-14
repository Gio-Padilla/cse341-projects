// This is the Controllers file
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['contact']
    //#swagger.description = 'Return JSON data for all contacts'
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    // Would need to add db('project1') if it was not part of the url in the env file
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['contact']
    //#swagger.description = 'Return JSON data for one specified contact'
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: userId});
    // Would need to add db('project1') if it was not part of the url in the env file
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0])
    });
};

const createContact = async (req, res) => {
    //#swagger.tags=['contact']
    //#swagger.description = 'Create a contacts'
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user.');
    };
};

const updateContact = async (req, res) => {
    //#swagger.tags=['contact']
    //#swagger.description = 'Update an already existing contact'
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.');
    };
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['contact']
    //#swagger.description = 'Delete the spesified ID of a contact'
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user.');
    };
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};