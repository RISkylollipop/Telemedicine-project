const {db} = require(`../database`)


exports.viewpatients = (req, res)=>{
    db.query(`select firstname, lastname, email, status, gender, phone, patient_id from patients where status = 'active'`, (err, rows)=>{
        if(err){
            console.log(err);
            
        }else{
            // console.log(rows);
            res.render(`viewpatients`, { rows })
        }
    })
}

