const express = require(`express`)
const router = require("./pages") 

const register = require(`../controllers/register`) 
const login = require(`../controllers/login`)
const bookappoint = require(`../controllers/book`)
const  isAuthenticated  = require(`../middlewares/auth`)
const isAuthenticateddoctorOrAdmin = require(`../middlewares/authdoctor`)

const editpatient = require(`../controllers/editpatients`)
const viewpatients = require(`../controllers/viewpatients`)
const deleted = require(`../controllers/delete`)
const viewdoctor = require(`../controllers/viewdoctor`)


router.post(`/register`, register.register) // post request from registration
router.post(`/login`, login.login)


router.post(`/bookappointment`, bookappoint.bookappoint)

router.get(`/viewpatient`, viewpatients.viewpatients)

router.get(`/editpatient/:id`,editpatient.editpatients)
router.post(`/editpatient/:id`, editpatient.updatepatient)

router.get(`/delete/:id`, deleted.deletepatient)

router.get(`/patient/viewdoctors`, viewdoctor.viewdoctor)
router.post(`/viewdoctor`, viewdoctor.search)
router.get(`/editdoctor/:id`, viewdoctor.editdoctor)
router.post(`/editdoctor/:id`, viewdoctor.update)
router.get(`/deletedoctor/:id`, viewdoctor.doctordelete)
router.get(`/viewappointment`, bookappoint.viewappointment)
router.post(`/viewappointment`, bookappoint.search)


router.post(`/doctorlogin`, login.doctorlogin)



module.exports = router //exporting the router