let ourMenu = {
  appetizers: [{
    name: 'Egg Rolls',
    price: 3.99,
    vegetarian: false
  }, {
    name: 'Spring Roll',
    price: 1.99,
    vegetarian: true
  }, {
    name: 'Spare Ribs',
    price: 5.99,
    vegetarian: false
  }],
  soups: [{
    name: 'Egg Drop',
    price: 3.99,
    vegetarian: false
  }, {
    name: 'Wonton',
    price: 3.99,
    vegetarian: false
  }, {
    name: 'Vegetable',
    price: 3.99,
    vegetarian: true
  }],
  entrees: [{
    name: 'Kung Pao Chicken',
    price: 12.99,
    vegetarian: false
  }, {
    name: 'Buddha\'s Delight',
    price: 11.99,
    vegetarian: true
  }, {
    name: 'General Tso Chicken',
    price: 12.99,
    vegetarian: false
  }, {
    name: 'Sesame Beef',
    price: 14.99,
    vegetarian: false
  }]
}

exports.getMenu = (request, reply) => {
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
}

exports.addToMenu = (request, reply) => {
  // do some stuff
  console.log(request.body)
  reply.status(200).send('Menu item added. ')
}

// forcing a change