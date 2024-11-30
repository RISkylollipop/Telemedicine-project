const express = require(`express`)  
const http = require(`http`)
const { db } = require(`./database`)  
const router = require(`./routes/pages`) 
const { hash, compare } = require("bcrypt")
const cookieParser = require("cookie-parser")
const { isAuthenticated } = require(`./middlewares/auth`)
const { isAuthenticateddoctorOrAdmin } = require(`./middlewares/authdoctor`)
const path = require(`path`)

const app = express() 
const port = 3505 




app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use(express.json())


app.use(`/`, require(`./routes/pages`))
app.use(`/auth`, require(`./routes/auth`))

app.set(`view engine`, `hbs`)

app.use(express.static(`public`))
app.use(express.static(`public/images`))


app.set(`view engine`, 'hbs')

app.get(`/bookappointment`, (req, res)=>{
    db.query(`select * from doctors where status = 'active'`, (err, rows)=>{
        if(err){console.log(err);
        }else{
            res.status(200).render(`bookappoint`, { rows })
        }
    })
})




router.get(`/logout`, (req, res)=>{
    res.clearCookie(`userRegister`)
    res.redirect(`/login`)
})
router.get(`/doctorlogout`, (req, res)=>{
    res.clearCookie(`doctorRegister`)
    res.redirect(`/doctorlogin`)
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})