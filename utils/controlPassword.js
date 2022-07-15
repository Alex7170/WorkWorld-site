module.exports.controlPassword = function(password){
    if (password.length<8) return {result:false, message: "Password have to consist at least 8 symbols"}
    if (password.length>16) return {result:false, message: "Passwordcan maximally consist 16 symbols"}
    let big = false
    let small = false
    let number = false
    for (let i=0; i<password.length; i++){
        if (isNaN(password[i]) == false) number = true
        else if (password[i] == password[i].toUpperCase()) big = true
        else if (password[i] == password[i].toLowerCase()) small = true
    }
    if (big==false) return {result:false, message: "Password have to consist big letter"}
    if (small==false) return {result:false, message: "Password have to consist small letter"}
    if (number==false) return {result:false, message: "Password kave to consist a number"}
    return {result:true}
}