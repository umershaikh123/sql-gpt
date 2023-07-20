migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kik87py5j5oz31a")

  collection.options = {
    "allowEmailAuth": false,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": false,
    "exceptEmailDomains": [],
    "manageRule": null,
    "minPasswordLength": 8,
    "onlyEmailDomains": [],
    "requireEmail": false
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kik87py5j5oz31a")

  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": false,
    "exceptEmailDomains": [],
    "manageRule": null,
    "minPasswordLength": 8,
    "onlyEmailDomains": [],
    "requireEmail": false
  }

  return dao.saveCollection(collection)
})
