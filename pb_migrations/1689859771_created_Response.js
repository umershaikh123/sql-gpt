migrate((db) => {
  const collection = new Collection({
    "id": "k6hrx1lj6ovqb6b",
    "created": "2023-07-20 13:29:31.367Z",
    "updated": "2023-07-20 13:29:31.367Z",
    "name": "Response",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "m8mccczc",
        "name": "MessageID",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "lffc86zybkrj62h",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "w3sr5qs6",
        "name": "responseContent",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ymdpvwav",
        "name": "sentAt",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k6hrx1lj6ovqb6b");

  return dao.deleteCollection(collection);
})
