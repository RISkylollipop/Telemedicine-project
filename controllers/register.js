   const { db } = require(`../database`)  
const bcrypt = require(`bcrypt`)



exports.register = (req, res) => {
    // console.log(req.body)
    // firstname: '',
    // lastname: '',
    // email:
    // phone:
    // address:
    // date_of_birth:
    // gender: 'N/A'
    // password:
    // passwordconfirm:

    // creating a variable to hold post request data from the Registration form
    const { firstname, lastname, email, phone, address, date_of_birth, gender, password, passwordconfirm } = req.body;

    //Validation of email to avoid bypass
    if (!email || !password || !phone) {
        return res.render(`patientregister`, {error: `Some Details are missing`})
        
        //Validating Password to avoid forgetting password
    } else if (password !== passwordconfirm) {
        return res.render(`patientregister`, { error: `Password Does Not Match` })
    }
    // validating email to avoid double registration
    else {
        db.query(`select email from patients where email = ?`, [email], async (err, result) => {
            if (err) {
                console.log(err);

            } else if (result.length > 0) {
                return res.render(`patientregister`, { error: `Email Already Exist` })
            }

            //Hashing of password that will be store in the database
           const hashpassword = await bcrypt.hash(password, 10)

            //Sending the query to send data collected to the database table created in week 6
            db.query(`insert into patients set ?`, { firstname: firstname, lastname: lastname, email: email, phone: phone, address: address, date_of_birth: date_of_birth, gender: gender, password:hashpassword }, (err, result) => {
                if (err) {
                    console.log(err);

                } else {
                    res.render(`patientregister`, { message: `USER REGISTER SUCCESSFULLY` })
                    // res.redirect(`/login`)
                }
            })
        })
    }


    // res.send(`form sumbitted`) to test the form submission, Not included in the code

}


// DoctorRegister

// AdminRegister