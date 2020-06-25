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
        if (ourMenu.hasOwnProperty(category)) {
          let menuCategory = ourMenu[category] // use .filter
          // let results = jobsArray.filter(job => job.city === 'Boca Raton')
          reply.status(200).send(menuCategory)
        } else {
          reply.status(401).send('Error: Menu category not found.')
        }
      }
      reply
        .status(200)
        .send(ourMenu)
    })
}

exports.searchMenu = (request, reply) => {
  if (request.params && request.params.query) {
    let { query } = request.params
    if (ourMenu.hasOwnProperty(query.toLowerCase()) || ourMenu.hasOwnProperty(query.toLowerCase() + 's')) {
      // if user enters appetizer(s), soup(s), or entree(s)
      reply.status(200).send(ourMenu[query.toLowerCase()])
    }
    let results = []
    Object.keys(ourMenu).forEach(cat => {
      let catResults = ourMenu[cat].filter(menuItem => menuItem.name.toLowerCase().includes(query.toLowerCase()))
      results = results.concat(catResults)
    })
    reply.status(200).send(results)
  }
}

exports.addToMenu = (request, reply) => {
  // do some stuff
  let { category, item } = request.body
  fbRef.child(category).push(item)
    .then(() => {
      reply.status(200).send('Menu item added. ')
    }).catch(err => {
      reply.status(500).send('Error creating item: ' + err)
    })
}