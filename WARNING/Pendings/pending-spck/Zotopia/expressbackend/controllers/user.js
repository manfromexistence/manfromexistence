const UserSchema = require('../models/user');
const bcrypt = require('bcryptjs');


const createDa = async (req, res) => {
    try {
        const { name, email, work, phone, password, cpassword } = req.body;
        const emailExits = await UserSchema.findOne({ email: email });
        if (!name || !email || !work || !phone || !password || !cpassword) {
            res.status(500).send('Plz fill all data');
            console.log('Plz fill all data');
        } else {
            console.log('Field verified');
        }
        if (emailExits) {
            res.status(500).send('User already Exists');
            console.log('User already Exists');
        } else {
            console.log('User verified');
        }
        if (password != cpassword) {
            res.send('Wrong cpassword');
            console.log('Wrong cpassword');
        } else {
            const geniunuser = new UserSchema({ name, email, work, phone, password, cpassword });
            const Newregister = await geniunuser.save();
            res.status(201).json({ geniunuser });
            console.log('New User register successfully');
            console.log(req.body);
            console.log(geniunuser);
        }
    } catch (error) {
        res.status(500).json({ message: 'error' })
        console.log(error);
    }
}
const getOneItemYeh = async (req, res) => {
    try {
        const { itemID: userId } = req.params;
        const user = await UserSchema.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'Item does not Exist !!!' })
        }

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
const updateDa = async (req, res) => {
    try {
        const { itemID: userID } = req.params;
        const user = await UserSchema.findByIdAndUpdate({ _id: userID }, req.body, {
            new: true,
            runValidators: true
        })

        if (!user) {
            return res.statusnode(404).json({ messgae: 'No Items with that ID' })
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


const deleteDa = async (req, res) => {
    try {
        const { itemID: userID } = req.params;
        const crud = await UserSchema.findByIdAndDelete({ _id: userID });

        if (!user) {
            return res.status(404).json({ messgae: 'No Items with that ID' })
        }

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}




module.exports = {
    createDa,
    getOneItemYeh,
    updateDa,
    deleteDa
}