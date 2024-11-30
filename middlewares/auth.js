
const jwt = require(`jsonwebtoken`)
const cookieParser = require(`cookie-parser`)


exports.isAuthenticated = (req, res, next)=>{

const token = req.cookies.userRegister;
if(!token){
    return res.render(`patientlogin`, 
        {error: `Please Login Before you can access the page`})
}
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.patients = decoded;
    
    next();
} catch (error) {
    console.log(error);
    return res.redirect(`/signin`)
}

}

// {
//     patient_id: 6,
//     firstname: 'KELANI',
//     iat: 1732452783,
//     exp: 1732463583
//   }