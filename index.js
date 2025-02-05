const crypto = require('crypto');

const generatePassword = (options = {}) => {
  const {
    length = 12,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
    excludeSimilar = false
  } = options;

  if (length < 1) {
    throw new Error('Password length must be at least 1');
  }

  let charset = '';
  const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijkmnpqrstuvwxyz';
  const numberChars = '23456789';
  const symbolChars = '!@#$%^&*()-_=+[]{}<>?';

  if (uppercase) charset += uppercaseChars;
  if (lowercase) charset += lowercaseChars;
  if (numbers) charset += numberChars;
  if (symbols) charset += symbolChars;

  if (excludeSimilar) {
    charset = charset.replace(/[ilLI|`oO0]/g, '');
  }

  if (!charset) {
    throw new Error('At least one character type must be selected');
  }

  let password = '';
  const charsetLength = charset.length;

  // Ensure at least one character from each selected character type
  const requiredChars = [];
  if (uppercase) requiredChars.push(uppercaseChars);
  if (lowercase) requiredChars.push(lowercaseChars);
  if (numbers) requiredChars.push(numberChars);
  if (symbols) requiredChars.push(symbolChars);

  for (let i = password.length; i < length; i++) {
    password += charset[crypto.randomInt(charsetLength)];
  }

  // Fill the rest of the password with random characters from the charset
  for (let i = password.length; i < length; i++) {
    password += charset[crypto.randomInt(charsetLength)];
  }

  // Shuffle the password to ensure randomness
  password = password.split('').sort(() => 0.5 - Math.random()).join('').slice(0, length);

  return password;
};

const checkPasswordStrength = (password) => {
  const strengths = {
    0: 'Very Weak',
    1: 'Weak',
    2: 'Medium',
    3: 'Strong',
    4: 'Very Strong'
  };

  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return {
    score: Math.min(score, 4),
    strength: strengths[Math.min(score, 4)]
  };
};

module.exports = {
  generatePassword,
  checkPasswordStrength
};