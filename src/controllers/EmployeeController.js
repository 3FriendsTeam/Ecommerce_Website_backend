const {Employee} = require("../models");

const createEmployee = async (req, res) => {
    try{
    const {ProfileImage, Username, Password, PositionID, FullName, DateOfBirth, Gender, Address, Email, PhoneNumber,CreatedBy} = req.body;
    const employee = await Employee.create({ProfileImage: ProfileImage, Username: Username, Password: Password, PositionID: PositionID, FullName: FullName, DateOfBirth: DateOfBirth, Gender: Gender, Address: Address, Email: Email, PhoneNumber: PhoneNumber,CreatedBy: CreatedBy});
    res.status(201).json(employee);
    }
    catch(error){
       res.status(500).json({error: error.message}); 
    }
}

module.exports = {
    createEmployee
}