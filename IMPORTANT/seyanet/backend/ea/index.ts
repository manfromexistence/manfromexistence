import { Elysia } from 'elysia'
//
import { userRoutes } from './routes'
import { error, logger } from './middlewares'
import { connectDB } from './config'
import productRoutes from './routes/productRoutes'

// Create Elysia instance
const app = new Elysia()

// Config MongoDB
connectDB()

// Middlewares
app.use(logger())
app.use(error())

// Root Routes
app.get('/', () => 'Welcome to our API')

// User Routes [api/v1/users]
// app.use(userRoutes)
app.use(productRoutes)

// Start the server
app.listen(9000)

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
)
