
const express = require(`express`)
const router = express.Router()
const { isAuthenticated } = require(`../middlewares/auth`)
const { isAuthenticateddoctorOrAdmin } = require(`../middlewares/authdoctor`)


// This is the route to home page
router.get(`/`, (req, res)=>{
    res.render(`home`)
})
// This is the route to display registration form
router.get(`/register`, (req, res)=>{
    res.render(`patientregister`)
})

router.get(`/login`, (req, res)=>{
    res.render(`patientlogin`)
})
router.get(`/doctorlogin`, (req, res)=>{
    res.render(`doctorlogin`)
})

router.get(`/`, (req, res)=>{
    res.render(`home`)
})

router.get(`/dashboard`, isAuthenticated, (req, res)=>{
    res.render(`dashboard`, {patients: req.patients})
})

router.get(`/doctor/dashboard`, isAuthenticateddoctorOrAdmin, (req, res)=>{
    res.render(`doctordashboard`, {doctors: req.doctors})
})

router.get('/admin/dashboard', isAuthenticateddoctorOrAdmin, (req, res)=>{
    res.render(`admindashboard`)
})
router.get(`/patient/viewdoctors`, isAuthenticated)
router.get(`/viewappointment`, isAuthenticateddoctorOrAdmin)
router.get(`/patient`, (req, res)=>{
    res.render(`patient`)
})




// We are exporting the router that we created to hold 
// the return value from the express at the top
module.exports = router