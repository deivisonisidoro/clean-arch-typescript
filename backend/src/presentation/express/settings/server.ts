import { app } from './app'

/**
 * Port number for the server to listen on.
 * Default is 3333, can be overridden with the PORT environment variable.
 */
const PORT = process.env.PORT || 3333

/**
 * Start the server and listen on the specified port.
 */
app.listen(PORT, () =>
  console.log(`Server is running in http://localhost:${PORT}`),
)
