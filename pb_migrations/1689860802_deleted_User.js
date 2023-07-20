migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kik87py5j5oz31a");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "kik87py5j5oz31a",
    "created": "2023-07-20 13:25:44.616Z",
    "updated": "2023-07-20 13:42:56.469Z",
    "name": "User",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5cp9mzdi",
        "name": "authID",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "allowEmailAuth": false,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": false,
      "exceptEmailDomains": [],
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": [],
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
})
