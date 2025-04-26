import {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContactById,
} from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);

        if (!contact) {
            throw new HttpError(404, 'Not found');
        }

        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedContact = await removeContact(id);

        if (!deletedContact) {
            throw new HttpError(404, 'Not found');
        }

        res.status(200).json(deletedContact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { error } = createContactSchema.validate(req.body);

        if (error) {
            throw new HttpError(400, error.message);
        }

        const { name, email, phone } = req.body;
        const newContact = await addContact(name, email, phone);

        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!Object.keys(req.body).length) {
            throw new HttpError(400, 'Body must have at least one field');
        }

        const { error } = updateContactSchema.validate(req.body);

        if (error) {
            throw new HttpError(400, error.message);
        }

        const updatedContact = await updateContactById(id, req.body);

        if (!updatedContact) {
            throw new HttpError(404, 'Not found');
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};
