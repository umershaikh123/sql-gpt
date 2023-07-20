migrate((db) => {
  const collection = new Collection({
    "id": "jdnktr5di1ohfmz",
    "created": "2023-07-20 13:27:18.753Z",
    "updated": "2023-07-20 13:27:18.753Z",
    "name": "conversation",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("jdnktr5di1ohfmz");

  return dao.deleteCollection(collection);
})
