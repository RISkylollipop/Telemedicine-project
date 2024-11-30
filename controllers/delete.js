const {db} = require(`../database`)
const { search } = require("../routes/pages")



exports.deletepatient = (req, res)=>{


    const deletequery = `update patients set status = 'disable' where patient_id =?;`

    db.query(`update patients set status = 'disable' where patient_id = ?`,[req.params.id],(err, result)=>{
        if(!err){
            db.query(`select patient_id, firstname, lastname, email, gender, address, phone from patients where status = "active"`, (err, rows)=>{
                if(!err){
                    res.status(200).render(`viewpatients`,{ rows })
                }else{
                    console.log(err);
                    
                }
            })
        }else{
            console.log(`Unable to Delete`, err);
            
        }
    })
}










// exports.deletepatient = (req, res)=>{
//     // console.log(req.body);
// console.log(req.params.id);
// const patientids = req.params.id
// console.log(patientids);


// db.query(`update patients set status = "disable" where patient_id = ?`,[patientids], (err, result)=>{
//     if(err){
//         console.log(err);
        
//     }else{
//         db.query(`select firstname, lastname, email, status, gender, phone, patient_id from patients where status = 'active'`, (err, rows)=>{
//             if(err){
//                 console.log(err);
                
//             }else{
//                 // console.log(rows);
//                 res.render(`viewpatients`, { rows })
//             }
//         })
//     }
// })

// }