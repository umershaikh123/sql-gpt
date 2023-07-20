migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lffc86zybkrj62h")

  // remove
  collection.schema.removeField("muj5iy16")

  // remove
  collection.schema.removeField("2pflv4lk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9xa92hrq",
    "name": "ConversationID",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jdnktr5di1ohfmz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2rzg33wu",
    "name": "UserID",
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
  const collection = dao.findCollectionByNameOrId("lffc86zybkrj62h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "muj5iy16",
    "name": "ConversationID",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "jdnktr5di1ohfmz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2pflv4lk",
    "name": "UserID",
    "type": "relation",
    "required": true,
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
  collection.schema.removeField("9xa92hrq")

  // remove
  collection.schema.removeField("2rzg33wu")

  return dao.saveCollection(collection)
})
