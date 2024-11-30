const express = require(`express`)
const router = express.Router()
const bcrypt = require(`bcrypt`)
const {db} = require(`../database`)
const jwt = require(`jsonwebtoken`)
const cookieParser = require(`cookie-parser`)

exports.login = (req, res)=>{
// console.log(req.body);


    const {email, password} = req.body;

    if(!password || !email){
        return res.render(`patientlogin`, {error: `Some Details are missing`})
    } 
    else{
        db.query(`select * from patients where email = ?`,[email], async (err, result)=>{
            if(err){
                console.log(err);
                
            }else if(!result.length > 0 || !await bcrypt.compare(password, result[0].password)){
                return res.render(`patientlogin`, {error: `Invalid Email or Password`})
            }
            
            const token = jwt.sign({ patient_id: result[0].patient_id, firstname:result[0].firstname, email: result[0].email }, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES

            })
            const cookieoptions = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
            }
// console.log(cookieoptions);
// console.log(process.env.JWT_SECRET);


            res.cookie('userRegister', token, cookieoptions)
            res.redirect(`/dashboard`)
        })

    }

    // res.send(`form submitted`)
}

exports.doctorlogin = (req, res)=>{
    const {email, password} = req.body
    // console.log(req.body);
    if(!email || !password){
        return res.render(`doctorlogin`, {error: `Please input Email and Password`})
    }else{
        db.query(`select * from doctors where email = ?`,[email], async(err, result)=>{
            if(err){console.log(err);
            }else if(!result.length > 0 || !await bcrypt.compare(password, result[0].password)){
                return res.render(`doctorlogin`, {error: `Invalid Email Or Password`})
            }

            const token = jwt.sign({role: 'doctor', doctor_id: result[0].doctor_id, firstname: result[0].firstname}, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES
            })

        const cookieoptions = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'Lax' 
        }

        res.cookie(`userRegister`, token, cookieoptions)
        res.redirect(`/doctor/dashboard`)
        })
    }

    
}

exports.adminlogin = (req, res)=>{
    console.log(req.body);
    if(!email || !password){
        return res.render(`doctorlogin`, {error: `Please input Email and Password`})
    }else{
        db.query(`select * from admins where email = ?`,[email], async(err, result)=>{
            if(err){console.log(err);
            }else if(!result.length > 0 || !await bcrypt.compare(password, result[0].password)){
                return res.render(`adminlogin`, {error: `Invalid Email Or Password`})
            }

            const token = jwt.sign({role: 'admin', doctor_id: result[0].admin_id, firstname: result[0].firstname}, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES
            })

        const cookieoptions = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: 'Lax' 
        }

        res.cookie(`userRegister`, token, cookieoptions)
        res.redirect(`/admin/dashboard`)
        })
    }

}