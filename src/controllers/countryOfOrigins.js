const { CountryOfOrigin } = require('../models');

const GetCountryOfOrigins = async (req, res) => {
    try {
        const countryOfOrigins = await CountryOfOrigin.findAll();
        res.json(countryOfOrigins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const CreateCountryOfOrigin = async (req, res) => {
    try {
        const { ConstryName } = req.body;
        console.log(ConstryName);
        const countryOfOrigin = await CountryOfOrigin.create({ CountryName: ConstryName });
        res.status(200).json(countryOfOrigin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteCountryOfOrigin = async (req, res) => {
    try {
        const { id } = req.query;
        
        const associatedRecords = await OtherTable.findOne({ where: { id: id } });
        
        if (associatedRecords) {
            return res.status(400).json({ error: 'Cannot delete: Country of origin is associated with other records.' });
        }else{
            const countryOfOrigin = await CountryOfOrigin.destroy({ where: { id:id } });
            res.status(200).json(countryOfOrigin);
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { 
    GetCountryOfOrigins,
    CreateCountryOfOrigin
}