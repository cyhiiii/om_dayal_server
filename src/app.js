import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.ORIGIN,
}))

app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "1mb" }))
app.use(express.static("public"))
app.use(cookieParser())


import adminRouter from './routes/admin.routes.js'
import employeeRouter from './routes/employee.routes.js'
import leadRouter from './routes/lead.routes.js'
import teacherRouter from './routes/teacher.routes.js'


app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/employee', employeeRouter)
app.use('/api/v1/lead', leadRouter)
app.use('/api/v1/teacher', teacherRouter)

export { app }