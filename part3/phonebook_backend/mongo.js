const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.h2im5at.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log('contact saved!')
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
  })
} else {
  console.log('Please provide password, name and phone number as arguments to save the contact in db: node mongo.js <password> <name> <phononumber>')
  process.exit(1)
}




