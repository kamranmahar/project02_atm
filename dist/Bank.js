class user {
    userid;
    pin;
    name;
    constructor(userid, pin, name) {
        this.userid = userid;
        this.pin = pin;
        if (name != undefined)
            this.name = name;
    }
}
class bank {
    userList;
    constructor(_user) {
        this.userList = _user;
    }
    authenticateuser(userObj) {
        const _userObj = this.userList.filter((obj) => {
            return obj.userid == userObj.userid && obj.pin == userObj.pin;
        });
        return _userObj[0];
    }
}
class myaccount {
    user;
    balance;
    constructor(user) {
        this.user = user;
        this.balance = Math.floor(Math.random() * 100000);
    }
    getmyBalance() {
        return this.balance;
    }
}
export { user, bank, myaccount };
