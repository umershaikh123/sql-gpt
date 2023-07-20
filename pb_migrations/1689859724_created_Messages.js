migrate((db) => {
  const collection = new Collection({
    "id": "lffc86zybkrj62h",
    "created": "2023-07-20 13:28:44.495Z",
    "updated": "2023-07-20 13:28:44.495Z",
    "name": "Messages",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "aktbf55u",
        "name": "Content",
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
        "id": "mwhn4ohm",
        "name": "SentAT",
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
  const collection = dao.findCollectionByNameOrId("lffc86zybkrj62h");

  return dao.deleteCollection(collection);
})
