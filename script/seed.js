/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Product, OrderItem, Address, Category, Order} = require('../server/db/models')


async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const products = await Promise.all([
    Product.create({ name: 'ferret007', image: 'https://i.pinimg.com/564x/bd/6f/b9/bd6fb9698229c202b7a8bd28a32188fe.jpg', price: '5.45', description: 'scrappy but techy bundle of cuteness', stock: 20, category: ['rodent'] }),
    Product.create({ name: 'prongs020', image: 'https://i.pinimg.com/564x/fd/9f/56/fd9f564d84722c5305f8a5738266612a.jpg', price: '100.85', description: 'elegant and mysterious', stock: 8, category: ['forest']}),
    Product.create({  name: 'styracosaurus808', image: 'https://i.pinimg.com/564x/80/ca/6b/80ca6b06e6466a98bb547ce54a37ee55.jpg', price: '1.45', description: 'huge but affectionate', stock: 5, category: ['forest']}),
    Product.create({ name: 'seahorn001', image: 'https://i.pinimg.com/564x/ee/41/e5/ee41e5229b8d4ee6ffa32855b300f8bc.jpg', price: '100.85', description: 'super cute seahorse', stock: 100, category: ['water'] })
  ])
  console.log(`seeded ${products.length} products`)

  const users = await Promise.all([
    User.create({ firstName: ' Moyouri', lastName: 'Bhattacharjee', email: 'momo@gmail.com', isAdmin: true, password: 'DjangoCoder' }),
    User.create({ firstName: ' Erica', lastName: 'Chai', email: 'echai@gmail.com', isAdmin: true, password: 'DjangoCoderb' }),
    User.create({ firstName: ' Sam', lastName: 'Zhang', email: 'szhang@gmail.com', isAdmin: true, password: 'DjangoCoderc' }),
    User.create({ firstName: ' Caryn', lastName: 'McCarthy', email: 'CMcCarthy@gmail.com', isAdmin: true, password: 'DjangoCoderd' }),
    User.create({ firstName: ' Victor', lastName: 'Bhattacharjee', email: 'vbhattac@gmail.com', isAdmin: false, password: 'DjangoCodernever' })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)

  const addresses = await Promise.all([
    Address.create({  street1: ' 88-14 170th street ', city: 'Jamaica', state: 'NY', country: 'USA', zipcode: 11432 }),
    Address.create({  street1: ' 104-14 Liverpool Ave   ', street2:  ' 1st Floor Apt 1M    ', city: 'Union', state: 'NJ', country: 'USA', zipcode: 10016 })
  ])

  console.log(`seeded ${addresses.length} addresses`)

  const orderitems = await Promise.all([
    OrderItem.create({ quantity: 1, currentPrice: 5.55 }),
    OrderItem.create({ quantity: 3, currentPrice: 3.33 })
  ])

  console.log(`seeded ${orderitems.length} orderitems`)

  const categories = await Promise.all([
    Category.create({ name: 'forest'}),
    Category.create({ name: 'sea'}),
    Category.create({ name: 'water'}),
    Category.create({ name: 'miscellaneous'})
  ])

  console.log(`seeded ${categories.length} categories`)

  const orders = await Promise.all([
    Order.create({ status: 'completed'}),
    Order.create({ status: 'open'}),
    Order.create({ status: 'shipped'})
  ])

  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)

}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
