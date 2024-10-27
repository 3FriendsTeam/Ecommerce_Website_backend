const {Employee} = require("../models");

const createEmployee = async (req, res) => {
    try{
    const {ProfileImage, Username, Password, Role, FullName, DateOfBirth, Gender, Address, IDNumber, EmployeeID} = req.body;
    const employee = await Employee.create({ProfileImage, Username, Password, Role, FullName, DateOfBirth, Gender, Address, IDNumber, EmployeeID});
    res.status(201).json(employee);
    }
    catch(error){
        
    }
}


module.exports = {
    
}