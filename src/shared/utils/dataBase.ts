import mongoose from 'mongoose'
export default async function connectDatabase() {
    try {
        // Use Mongoose to connect to the database by replacing placeholders in the URL
        await mongoose.connect(
            process.env.DATABASE_URL!.replace(
                '<password>',
                process.env.DATABASE_PASSWORD!,
            ),
        )
        console.log('Database Connected Successfully...👍')
    } catch (error: any) {
        console.error(`Error connecting to the database: ${error.message}`)
    }
}
