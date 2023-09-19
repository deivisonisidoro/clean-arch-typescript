import { app } from './app'

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
