const Address = require('../models/Address');


exports.getAddresses = async (req, res) => {
  try {
    
    const userId = req.query.userId || req.body?.userId;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.createAddress = async (req, res) => {
  try {
    const { fullName, phone, address, city, state, pincode, isDefault, userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
 
    if (isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }
    
    const newAddress = new Address({
      userId,
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      isDefault,
    });
    
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(400).json({ error: error.message });
  }
};

// Update an address
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDefault } = req.body;
    
    // If setting as default, unset other defaults
    if (isDefault) {
      const addr = await Address.findById(id);
      await Address.updateMany({ userId: addr.userId }, { isDefault: false });
    }
    
    const address = await Address.findByIdAndUpdate(id, req.body, { new: true });
    res.json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    res.json({ message: 'Address deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
