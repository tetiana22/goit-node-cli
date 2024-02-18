const crypto = require("crypto");
const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }

  const newContacts = contacts.filter(({ id }) => id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return index;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
}

module.exports = { listContacts, addContact, removeContact, getContactById };
