let firebase = require('firebase')

let firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: "https://restaurant-api-js01lc.firebaseio.com",
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
}
// Initialize Firebase
let fb = firebase.initializeApp(firebaseConfig)
let fbRef = fb.database().ref()

exports.getMenu = (request, reply) => {
  fbRef.once('value')
    .then(ourMenu => {
      if (request.params && request.params.category) {
        let { category } = request.params
        if (ourMenu.child(category)) {
          let menuCategory = Object.values(ourMenu.child(category).val())
          reply.status(200).send(menuCategory)
        } else {
          reply.status(401).send('Error: Menu category not found.')
        }
      }
      let categories = Object.keys(ourMenu.val())
      let menu = categories.map(cat => {
        return {
          category: cat,
          items: Object.values(ourMenu.child(cat).val())
        }
      })
      reply
        .status(200)
        .send(menu)
    })
}

exports.searchMenu = (request, reply) => {
  if (request.params && request.params.query) {
    fbRef.once('value')
      .then(ourMenu => {
        let { query } = request.params
        let results = []
        let cats = Object.keys(ourMenu.val())
        cats.forEach(cat => {
          let thisCat = Object.values(ourMenu.child(cat).val())
          let catResults = thisCat.filter(menuItem => menuItem.name.toLowerCase().includes(query.toLowerCase()))
          results = results.concat(catResults)
        })
        reply.status(200).send(results)
      })
  }
}

exports.addToMenu = (request, reply) => {
  // do some stuff
  let { category, item } = request.body
  fbRef.child(category.toString()).push(item)
    .then(() => {
      reply.status(200).send('Menu item added. ')
    }).catch(err => {
      reply.status(500).send('Error creating item: ' + err)
    })
}
