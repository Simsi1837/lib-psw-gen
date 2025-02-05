const { generatePassword, checkPasswordStrength } = require(".")

const password = generatePassword({ length: 12});
console.log(password); 
console.log(checkPasswordStrength(password));