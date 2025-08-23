import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors())

app.use(express.json({limit: "1mb"}))
app.use(express.urlencoded({extended: true, limit: "1mb"}))
app.use(express.static("public"))
app.use(cookieParser())


import adminRouter from './routes/admin.routes.js'


app.use('/api/v1/admin', adminRouter)


export {app}