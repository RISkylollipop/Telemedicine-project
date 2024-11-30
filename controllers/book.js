const {db} = require(`../database`)


exports.bookappoint = (req, res)=>{
    console.log(req.body);
    // firstname: 'KELANI',
    // lastname: 'YUNUS',
    // email: 'kelanikdas1@gmail.com',
    // phone: '08032855040',
    // appointment_date: '2025-10-10',
    // appointment_time: '11:00',
    // doctorId: 'N/A',
    // status: 'Scheduled'
// firstname, email, appointment_date, appointment_time, doctorId status
    const {firstname, lastname, email, appointment_date, appointment_time, status, doctorId} = req.body;

if(!email || !firstname){
    res.redirect(`/bookappointment`)
    res.render(`bookappoint`, {error: `Email and Surname Field is Required`})
}else{
    db.query(`select email from patients where email = ?`,[email], (err, result)=>{
        if(err){console.log(err);
        }else if(!result[0]){
            // res.render(`bookappoint`, {error: `Please Use Your Registered Email address Or `})
            res.redirect(`/bookappointment`)
        }else{
            db.query(`insert into appointment set ?`, {firstname:firstname, email:email, appointment_date:appointment_date, appointment_time:appointment_time, doctor_id:doctorId, status:status},(err, result)=>{
                if(err){console.log(err);
                }else{
                    res.render(`bookappoint`, {message: `User ${firstname}, ${lastname} Appointment Booked Successfully`})
                }
            })
        }
    })
}

    
    
    // res.send(`Form Submitted`)
}


exports.viewappointment = (req, res)=>{
    const appointment = `select 
appointment_id,
appointment_date, 
appointment.firstname, 
appointment.email, 
appointment.doctor_id,
doctors.email as doctoremail,
doctors.specialty,
appointment.status
from 
appointment join doctors
on appointment.doctor_id = doctors.doctor_id`


    db.query(appointment, (err, rows)=>{
        if(err){console.log(err);
        }else{
        res.render(`viewappointment`, { rows })
        }
    })
}


exports.search = (req, res)=>{

    const search = req.body.search
    const appointment = `select 
appointment_id,
appointment_date, 
appointment.firstname, 
appointment.email, 
appointment.doctor_id,
doctors.email as doctoremail,
doctors.specialty,
appointment.status
from 
appointment join doctors
on appointment.doctor_id = doctors.doctor_id where doctors.email like ? or appointment.firstname like ? or appointment.email like ?`
    db.query(appointment, ['%' + search + '%', '%' + search + '%', '%' + search + '%'], (err, rows)=>{
        if(err){console.log(err);
        }else{
            res.render(`viewappointment`, { rows })
        }
    })
}




// if(!email || !firstname){
//     return res.render(`bookappoint`, {error: `Some Details Are Missing`})
// }else{
//     db.query(`select * from patients where email = ?`, [email], (err, result)=>{
//         if(err){
//             console.log(err);
//         }else if(!result[0]){
//             return res.render(`bookappoint`, {error: `NO USER WITH THAT EMAIL`})
//         }
//         else if(result.length > 0){
//             var patientid = result[0].patient_id;
//             db.query(`insert into appointments set ?`, {appointment_date:appointment_date, appointment_time:appointment_time, status:status, patient_id:patientid},(err, result)=>{
//                 if(err){
//                     console.log(err);
                    
//                 }else{
//                     res.render(`bookappoint`,{message: `Patient ${firstname}, Appoint Booked Succefully`})
//                     res.redirect(`/`)
//                 }
//             })
//         }
//     })
// }