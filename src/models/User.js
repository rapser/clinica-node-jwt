const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    documentType: Number,
	lastname: String,
	surname: String,
	documentNumber: String,
	name: String,
	gender : String,
	borndate : String,
	phone : String,
	photo : String,
	typeInsurance : String,
	haveInsurance : Boolean
},{
    versionKey: false
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password);
};

module.exports = model('user', userSchema);
