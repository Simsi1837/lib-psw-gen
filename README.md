# @simsi1837/lib-psw-gen 🔐

A simple and lightweight password generator that creates secure, customizable passwords containing lowercase letters, uppercase letters, numbers, and symbols.

## Installation

Install the package via npm:

```bash
npm install @simsi1837/password-generator
```

## Usage

### `generatePassword(options)`
Generates a random password based on the given options.

#### Parameters:
- `length` (number, default: `12`): Defines the length of the password.
- `uppercase` (boolean, default: `true`): Includes uppercase letters (A-Z).
- `lowercase` (boolean, default: `true`): Includes lowercase letters (a-z).
- `numbers` (boolean, default: `true`): Includes numeric digits (0-9).
- `symbols` (boolean, default: `false`): Includes special characters (`!@#$%^&*()-_=+[]{}<>?`).
- `excludeSimilar` (boolean, default: `false`): Excludes similar-looking characters (`iIlL1|oO0`).

#### Example:
```javascript
const { generatePassword } = require('@simsi1837/password-generator');

const password = generatePassword({ length: 16, symbols: true, excludeSimilar: true });
console.log(password); // Example output: "A2#dFgH7$kLmN8Pq"
```

### `checkPasswordStrength(password)`
Evaluates the strength of a given password.

#### Parameters:
- `password` (string): The password to be analyzed.

#### Returns:
An object containing:
- `score` (number): A value between `0` and `4` representing the strength level.
- `strength` (string): A description of the password strength (`Very Weak`, `Weak`, `Medium`, `Strong`, `Very Strong`).

#### Example:
```javascript
const { checkPasswordStrength } = require('@simsi1837/password-generator');

const strength = checkPasswordStrength("A2#dFgH7");
console.log(strength);
// Output: { score: 3, strength: "Strong" }
```

