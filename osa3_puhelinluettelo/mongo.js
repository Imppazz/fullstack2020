const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

console.log(password)

const url =
  `mongodb+srv://fullstack2020:${password}@cluster0-dotbh.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    const name = process.argv[3]
    const number= process.argv[4]

    console.log(name)
    console.log(number)

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(response => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    })
}