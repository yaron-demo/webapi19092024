const bcrypt=require('bcrypt');
const pass="abc123";
const saltRounds=10;
bcrypt.hash(pass,saltRounds,(err,hashPass)=>{
if(err)
console.log(err.message);
else
console.log(hashPass);
});
let hashFromDb="$2b$10$bHje1uVhtnRN5zZ8Y0yrzO4jqcPRx69FFPrBImo5FJMI2p1WoJylm";
bcrypt.compare(pass,hashFromDb,(err,status)=>{
    if(err)
    console.log(err.message);
    else
    console.log(status);
    });
hashFromDb="$2b$10$9wTfxejyydlNPIMwuxGM8uyHlDJV8HWIyWdaM0TZxxKQTrU1xjmJm";
bcrypt.compare(pass,hashFromDb,(err,status)=>{
    if(err)
    console.log(err.message);
    else
    console.log(status);
    });