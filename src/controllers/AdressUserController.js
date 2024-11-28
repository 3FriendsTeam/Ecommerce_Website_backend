const { Customer, ShippingAddress, OrderCustomer  } = require('../models');
const admin = require('../config/firebaseAdmin.js');

const getAddressByIdCustomer = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        const address = await Customer.findByPk(uid, {
            include: [{ model: ShippingAddress,  where: { IsDeleted: false } }]
        });
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addAddress = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
  
      const { RecipientName, PhoneNumber, City, District, Ward, SpecificAddress } = req.body;
  
      if (!RecipientName || !PhoneNumber || !City || !District || !Ward || !SpecificAddress) {
        return res.status(400).json({ error: "Thiếu thông tin địa chỉ" });
      }
  
      const newAddress = await ShippingAddress.create({
        RecipientName: RecipientName,
        PhoneNumber: PhoneNumber,
        City: City,
        District:District,
        Ward:District,
        SpecificAddress:SpecificAddress,
        IsDeleted : false,
        CustomerID: uid
      });
  
      res.status(201).json(newAddress);
    } catch (error) {
    console.log(error);
      res.status(500).json({ error: error.message });
    }
};

const updateAddress = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
  const { id } = req.query;
  const { RecipientName, PhoneNumber, City, District, Ward, SpecificAddress } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const address = await ShippingAddress.findOne({ where: { id: id, CustomerID: uid } });

    if (!address) {
      return res.status(404).json({ error: "Địa chỉ không tồn tại" });
    }

    address.RecipientName = RecipientName || address.RecipientName;
    address.PhoneNumber = PhoneNumber || address.PhoneNumber;
    address.City = City || address.City;
    address.District = District || address.District;
    address.Ward = Ward || address.Ward;
    address.SpecificAddress = SpecificAddress || address.SpecificAddress;

    await address.save();

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAddress = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const { id } = req.query;
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
      const address = await ShippingAddress.findOne({ where: { id: id, CustomerID: uid } });
      if (!address) {
        return res.status(404).json({ error: "Địa chỉ không tồn tại" });
      }
      const order = await OrderCustomer.findOne({ where: { AddressID: id } });
      if (order) {
        address.IsDeleted = 'true';
        await address.save();
        return res.status(200).json({ message: 'Địa chỉ đã được đánh dấu là xóa' });
      }
      await address.destroy();
      res.status(204).json({ message: 'Địa chỉ đã được xóa thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    getAddressByIdCustomer,
    addAddress,
    updateAddress,
    deleteAddress
};
