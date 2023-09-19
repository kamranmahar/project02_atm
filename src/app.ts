import inquirer from "inquirer";
import {answerType,user,bank,myaccount} from "./Bank.js"
const userList:user[]=[{userid:"kamran",pin:1234,name:"kamran"}]



let atm= async ()=>{
    let answers:answerType = await inquirer.prompt([{
        name:"userid",
        type:"input",
        message:"Please Provide Your user "    
    },
    {
        name:"userpin",
        type:"number",
        message:"Please Provide Your pin "
    },
    {
        name:"accountType",
        type:'checkbox',
        message:"Please Select Account Option ",
        choices:[
            "Saving","Current"
        ],
        when(answers){
            return answers.userpin;}   
    },
    {
        name:"transactionType",
        type:"list",
        message:"Please Select Transaction Option ",
        choices:[
            "Cash Withdrawal","Fast Cash","Balance Inquiry"
        ],
        when(answers){
            return answers.accountType;}   
        
    },
    {
        name:"amount",
        type:"list",
        message:"Please Select Amount Options ",
        choices:[5000,10000,20000],
       when(answers){
         return answers.transactionType=="Fast Cash";}           
    },
    {

        name:"amount",
        type:"number",
        message:"Please Provide Cash Withdrawal Amount ",
       
        when(answers){
            return answers.transactionType=="Cash Withdrawal";}  
    }
    ]);
 let objBank:bank=new bank(userList);
 let userObj:user=new user(answers.userid,answers.userpin)
 let loginuser:user = objBank.authenticateuser(userObj);
 if(loginuser!=undefined)
 {
 if(loginuser.userid !=="" && loginuser.pin!=0){
               let bankaccount:myaccount=new myaccount(loginuser);
                if(answers.transactionType==="Balance Inquiry"){
                   console.log(`Your Current Balance is ${bankaccount.getmyBalance()} `);
                  
                }
                else if(bankaccount.getmyBalance()>answers.amount){
                    if(answers.transactionType==="Fast Cash"){
                       console.log(`Your Remaning Balance is ${bankaccount.getmyBalance()-answers.amount} `);
                     }
                     else if(answers.transactionType==="Cash Withdrawal"){
                        console.log(`Your Remaning Balance is ${bankaccount.getmyBalance()-answers.amount} `);
                     }
                    
                        let {again} = await inquirer.prompt([{
                            name:"again",
                            type:'checkbox',
                            message:"Do you want to perform other transaction?" ,  
                            choices:[
                                "Yes","No"
                            ],
                            default:false,
                        }]);

                    if(again=="Yes")
                    {
                        atm();     
                    }
                     
                }else{
                    console.log(`Your Current Balance ${bankaccount.getmyBalance()} is insufficent `);
                   
                    let {again} = await inquirer.prompt([{
                        name:"again",
                        type:'checkbox',
                        message:"Do you want to perform other transaction?" ,  
                        choices:[
                            "Yes","No"
                        ],
                        default:false,
                    }]);
                   
                    if(again)
                    {
                        atm();     
                    }
                }
                
   
            }
        }else{
            console.log(`YOu did not provide user and pin`);
            let {again} = await inquirer.prompt([{
                name:"again",
                type:'checkbox',
                message:"Do you want to perform other transaction?" ,  
                choices:[
                    "Yes","No"
                ],
                default:false,
            }]);

        if(again=="Yes")
        {
            atm();     
        }
        }
    }
        atm();


