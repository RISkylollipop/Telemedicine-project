const {db} = require(`../database`);
const { login } = require("./login");

exports.viewdoctor = (req, res)=>{
    db.query(`select * from doctors where status = 'active'`, (err, rows)=>{
        if(err){console.log(err);
        }else{
            res.status(200).render(`viewdoctors`, { rows })
        }
    })
}

exports.search = (req, res)=>{
    // console.log(req.body);
    const search = req.body.search
db.query(`select * from doctors where firstname like ? or lastname like ? or email like ? or specialty like ?`, ['%'+ search + '%','%'+ search + '%','%'+ search + '%','%'+ search + '%'], (err, rows)=>{
    if(err){
        console.log(err);
        
    }else{
        res.render(`viewdoctors`, {rows})
    }
})
    
}

exports.editdoctor = (req, res)=>{
    db.query(`select * from doctors where doctor_id = ?`,[req.params.id], (err, rows)=>{
        if(err){console.log(err);
        
        }else{
            res.render(`editdoctors`, { rows })
        }
    })
    
}

exports.update = (req, res)=>{
    // console.log(req.body); 
//     firstname: 'Sally sue',
//   lastname: 'Sue',
//   email: 'sallysue@healthcare.org',
//   phone: '5551211001',
//   address: '',
//   gender: 'N/A',
//   date_of_birth: ''
    const {firstname, lastname, email, gender, phone, address, date_of_birth} = req.body

    db.query(`update doctors set firstname = ?, lastname = ?, email = ?, gender = ?, phone = ?, date_of_birth = ?, address = ? where doctor_id = ?`,[firstname, lastname, email, gender, phone, date_of_birth, address, req.params.id], (err, result)=>{
        if(err){console.log(err);
        }else{
            db.query(`select * from doctors where status = 'active'`, (err, rows)=>{
               if(err){console.log(err);
               }else{
                res.render(`viewdoctors`, { rows })
               }
            })
        }
    })


}

exports.doctordelete = (req, res)=>{
    db.query(`update doctors set status = 'disable' where doctor_id = ?`, [req.params.id], (err, result)=>{
        if(err){
            console.log(err);
            
        }else{
            db.query(`select * from doctors where status = 'active'`, (err, rows)=>{
                res.render(`viewdoctors`, { rows })
                // res.render(`viewdoctors`, {message: `Doctor Data Updated Successfully`})
            })
        }
    })
}