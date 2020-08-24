export const validAccountSignUp = {

    mobilePhone: '12126712234'
  };


  export const validAccountLogin = {

    email: 'waqas.zulfiqar22@gmail.com',
    password: 'waqas3934961',
    mobilePhone: '12126712234'
  };



  export const wrongData = {
    wrongEmail: 'waqas.@.com',
    wrongPhoneNumber: '0303333156',
    notRegisteredEmail: 'waqas@gmail.com'

  };

  export const facebookLogin = {
    fbEmail: 'waqas.zulfiqar22@gmail.com',
    fbPassword: 'waqas3934961'

  };
  
  export const gmailLogin = {
    email: 'waqas.zulfiqar22@gmail.com',
    passowrd: 'waqas3934961'

  };

    // outOfRangeAdress = "Mahwah, NJ 07430, United States";
    // inRangeAddress ="123 Allen St, New York, NY 10002";




export function generateEmail() {
    const d = new Date();
    const myEmailAdress = (`waqas.zulfiqar22+${d.getTime()}@gmail.com`);
    console.log(myEmailAdress);
    return myEmailAdress;
  };

