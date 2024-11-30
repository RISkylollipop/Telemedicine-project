const {db} = require(`../database`);
const { login } = require("./login");


exports.editpatients = (req, res)=>{

    const patientid = req.params.id
    db.query(`select * from patients where patient_id = ?`,[patientid], (err, rows)=>{
        if(err){
            console.log(err);
            
        }else{
           
            res.render(`editpatients`, { rows })
        }
    })
}

exports.updatepatient = (req, res)=>{
    console.log(req.body);
//     firstname: 'Oluwadamilare',
//   lastname: 'YUNUS',
//   email: 'kelanikdas1@gmail.com',
//   phone: '08032855040',
//   address: 'ZONE D24 GAA ODOTA AREA ILORIN',
//   gender: 'N/A',
//   date_of_birth: ''
const {firstname, lastname, email, phone, address, gender, date_of_birth} = req.body;

db.query(`update patients set firstname = ?, lastname =?, email = ?, phone = ?, gender = ?, address = ?, date_of_birth = ? where patient_id = ?`, [firstname, lastname, email, phone, gender, address, date_of_birth, req.params.id], (err, result)=>{
    if(err){
        console.log(err);
        
    }else{
        db.query(`select firstname, lastname, email, status, gender, phone, patient_id from patients where status = 'active'`, (err, rows)=>{
            if(err){
                console.log(err);
                
            }else{
                // console.log(rows);
                res.render(`viewpatients`, { rows })
            }
        })
    }
})

}

exports.deletepatient = (req, res)=>{
    console.log(req.body);
//     firstname: 'Oluwadamilare',
//   lastname: 'YUNUS',
//   email: 'kelanikdas1@gmail.com',
//   phone: '08032855040',
//   address: 'ZONE D24 GAA ODOTA AREA ILORIN',
//   gender: 'N/A',
//   date_of_birth: ''
const {firstname, lastname, email, phone, address, gender, date_of_birth} = req.body;
const patientids = [req.params.id]
console.log(req.params.id);
console.log(patientids);



db.query(`update patients set status = 'disable' where patient_id = ?`,[patientids], (err, result)=>{
    if(err){
        console.log(err);
        
    }else{
        db.query(`select firstname, lastname, email, status, gender, phone, patient_id from patients where status = 'active'`, (err, rows)=>{
            if(err){
                console.log(err);
                
            }else{
                // console.log(rows);
                res.render(`viewpatients`, { rows })
            }
        })
    }
})

}