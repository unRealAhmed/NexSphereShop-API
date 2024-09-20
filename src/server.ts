import dotenv from 'dotenv'
import app from './app/app'
import connectDatabase from './shared/utils/dataBase'

dotenv.config()
connectDatabase()

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
