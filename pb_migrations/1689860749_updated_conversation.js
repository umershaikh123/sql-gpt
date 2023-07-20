migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jdnktr5di1ohfmz")

  // remove
  collection.schema.removeField("vbrqkkq9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4lcv2qgl",
    "name": "userID",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "o2b4ylu1rtqq9pe",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jdnktr5di1ohfmz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vbrqkkq9",
    "name": "userID",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kik87py5j5oz31a",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("4lcv2qgl")

  return dao.saveCollection(collection)
})
