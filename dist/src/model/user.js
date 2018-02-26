export default class User {

    constructor(_id='', email='', password='', username='', courses=[]){
        this._id = _id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.courses = courses;
    }

}