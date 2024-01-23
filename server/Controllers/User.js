const User = require('../Models/User');
async function getuserbyid(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server error' });
    }
}

module.exports = {
    
    getuserbyid
};