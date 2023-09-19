interface answerType{
    userid:string,
    userpin:number,  
    accountType:string
    transactionType:string;
    amount:number;
    balance:number;     
}
class user {
    userid:string;
    pin:number;
    name?:string;
  
    constructor(userid:string,pin:number,name?:string)
    {
        this.userid=userid;
        this.pin=pin;
     
        if(name!=undefined)
            this.name=name;
    }
}
class bank{
    userList:user[];

    constructor(_user:user[])
    {
        this.userList=_user;
    }
   authenticateuser(userObj:user):user
   {
    const _userObj:user[]=this.userList.filter((obj)=>{
        return obj.userid==userObj.userid && obj.pin==userObj.pin;
        
    });
    return _userObj[0];
   }
}

class myaccount{
    user:user;
    private balance:number;

    constructor(user:user)
    {
        this.user=user;
        this.balance=Math.floor( Math.random()*100000);
    }
    getmyBalance()
    {
        return this.balance;
    }
}

export {answerType,user,bank,myaccount}