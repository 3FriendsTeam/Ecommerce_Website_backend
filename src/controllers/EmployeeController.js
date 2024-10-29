const {Employee} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




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
const getAllEmployee = async (req, res) => {
    try{
    const data = await Employee.findAll();
    res.send(data);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}
module.exports = {
    createEmployee,
    getAllEmployee
}