const User = require('../../schema-graphql/model/user');
const { AppolloError } = require('apollo-server-express');


module.exports = {
    Mutation: {
    async userRegister(_, { UserLoginInput: { username, email, password, name }} ) {
        const existingUser = await User.findOne({ email })
        if(existingUser){
            throw new AppolloError(' The User already exist in our database with' + email, 'USER ALREADY EXIST');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            name
        });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        newUser.token = token;
        const res = await newUser.save();
        return {
            id: res._id,
            ...res._doc
        }
    },
    async userLogin(_, { UserLoginInput: { email, password }}) {
        const user = await User.findOne({ email })
        if(!user){
            throw new AppolloError('The user does not exist', 'USER DOES NOT EXIST');
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new AppolloError('The credential is not correct', 'CREDENTIAL IS NOT CORRECT');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token;
        return {
            id: user._id,
           ...user._doc
        }
    },
    
},


}
