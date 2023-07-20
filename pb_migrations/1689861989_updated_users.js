migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2b4ylu1rtqq9pe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lde5dp9d",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2b4ylu1rtqq9pe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lde5dp9d",
    "name": "email",
    "type": "email",
    "required": true,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
})
