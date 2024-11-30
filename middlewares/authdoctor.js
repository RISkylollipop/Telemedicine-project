const jwt = require(`jsonwebtoken`)
const cookieParser = require(`cookie-parser`)


exports.isAuthenticateddoctorOrAdmin = (req, res, next)=>{
const token = req.cookies.userRegister;
if(!token){
    if(req.url.includes(`/doctor`)){
        return res.render(`doctorlogin`, {error: `Please Login Before you can access the page`})

    }else if(req.url.includes(`/admin`)){
        return res.render(`adminlogin`, {error: `Please Login Before you can access the page`})
    }
        
}
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    
    if(decoded.role === 'doctor'){
        console.log(decoded);
        req.doctors = decoded;
        next();
    }else if(decoded.role === 'admin'){
        req.admins = decoded
        next();
    }else{
        res.redirect(`/`)
    }
    
    
    
} catch (error) {
    console.log(error);
    return res.redirect(`/doctorlogin`)
}

}

// exports.isAuthenticatedadmin = (req, res, next)=>{
//     const token = req.cookies.userRegister;
//     if(!token){
//         return res.render(`adminlogin`, 
//             {error: `Please Login Before you can access the page`})
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         req.admins = decoded;
        
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.redirect(`/adminlogin`)
//     }
    
//     }

// {
//     patient_id: 6,
//     firstname: 'KELANI',
//     iat: 1732452783,
//     exp: 1732463583
//   }