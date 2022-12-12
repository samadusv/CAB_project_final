const { where } = require('sequelize');
const db = require('../models/passengers');

// loading user registration page
module.exports.register = (req, res, next) => {
    //register folder
    res.render('register');
}

// for adding user datas to database
module.exports.registerPost = async (req, res, next) => 
    {
    const { firstName, lastName, password, email, mobile, dob, gender } = req.body;
    let existingUser = await db.findOne({
        where: { email: email, password: password }
    });
    if (existingUser) {
        return res.render('register', { message: 'Already Registered.' });
    }
    await db.create(
        {
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            mobile: mobile,
            dob: dob,
            gender: gender
        })

    // going back to user login page
    res.redirect('/login');
    }

//loading user login page
module.exports.login = (req, res, next) => {
    res.render("login");
}



module.exports.loginpost = async (req, res, next) => {
    // console.log("In login post");

    const { email, password } = req.body;
    const passengerFromDb = await db.findOne({
        where: { email: email, password: password }
    });
    if (passengerFromDb == null) {
        return res.render('login', { message: 'No user with this email or password was found' });
    }
    req.session.passengerId = passengerFromDb.Passenger_id;
    req.session.role = 1;
    res.redirect('/passenger');
}



// module.exports.homePage = (req, res, next) => {
//     return res.render('home');
// }

module.exports.passengerDetail = (req, res, next) => {
    res.render('passengerProfile', { data: req.identity.passenger })
}

module.exports.updatePassenger = async (req, res, next) => {
    db.findByPk(req.identity.passenger.id)
        .then(passengerFromDb => {
            res.render('updatePassenger',
                {
                    heading: 'Update Profile',
                    data: passengerFromDb
                });
        });
}

module.exports.updatePassengerPost = async (req, res, next) => {
    await db.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
    },
        {
            where: {
                Passenger_id: req.identity.passenger.id
            }
        }

    )

    res.redirect('/home');

}

module.exports.delete = async (req, res, next) => {



    let id = req.identity.passenger.id;

    let passengerFromDb = await db.findByPk(id);

    if (passengerFromDb != null) {

        await db.destroy({

            where:

            {

                Passenger_id: id

            }

        });

        res.redirect('/login');

    }

}
module.exports.logout = (req,res,next) =>

{
    req.session.passengerId = null;
    return res.redirect('/login');
}