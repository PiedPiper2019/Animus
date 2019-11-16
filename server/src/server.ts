import {app} from "./api/api"
import {randomWallet} from "./ethereum"
import mongoose from 'mongoose'


// Settings
const PORT: any = process.env.PORT || 3000
const dbAddress = '127.0.0.1:27017' // db location
const dbName = 'animus'  // db name

//console.log(randomWallet)

// Connect to db
mongoose.connect(`mongodb://${dbAddress}/${dbName}`, { useNewUrlParser: true })
.then(() => { console.log('Database ('+dbAddress+') connected')})
.catch(err => { console.error('Database ('+dbAddress+') connection error', err)})


// Start the API
app.listen(PORT, () => console.log(`API Server started on port ${PORT}`))