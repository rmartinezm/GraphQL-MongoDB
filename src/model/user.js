import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    username: String,
    courses: [String]
});

const User = mongoose.model('users', UserSchema);

export default User;