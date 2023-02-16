const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const db_uri = process.env.db_uri

mongoose.connect(db_uri, (err) => {
    err ? console.log(`No se pudo conectar a MongoDB: ${err.message}`)
    :
    console.log('MongoDB conectado OK')
})
