let firebase = require('firebase')

let firebaseConfig = {
  apiKey: "AIzaSyA_x0yIBPXlM2UWS8G4tKrDMHQQ5Ikbt-U",
  authDomain: "restaurant-api-js01lc.firebaseapp.com",
  databaseURL: "https://restaurant-api-js01lc.firebaseio.com",
  projectId: "restaurant-api-js01lc",
  storageBucket: "restaurant-api-js01lc.appspot.com",
  messagingSenderId: "555462821163",
  appId: "1:555462821163:web:a9aa7dc781332b63e4f16e"
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