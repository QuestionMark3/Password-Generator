// Key pools
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789';
const symbols = '!"#$%&\'()*+,-./:;<=>?@^[\\]^_`{|}~';

// Function for randomly generating password
generate = (length = 15) => {
    const keys = lowercase + uppercase + numbers + symbols;
    let password = '';
    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * keys.length);
        let randomKey = keys[index];
        password+=randomKey;
    }
    return password;
}

// Function for testing password strength (Using E = log_2(R^L), where 
// E = entropy, R = pool size, L = password length)
stren = (password) => {
    // Calculate entropy
    const keys = lowercase + uppercase + numbers + symbols;
    let pool = keys.length;
    let length = password.length;
    let entropy = Math.log2(Math.pow(33, length));
    // Obtain strength from entropy
    let strength;
    if (entropy < 28){
        strength = 'Very Weak';
    }
    else if (entropy <= 35){
        strength = 'Weak';
    }
    else if (entropy <= 59){
        strength = 'Reasonable';
    }
    else if (entropy <= 127){
        strength = 'Strong';
    }
    else {
        strength = 'Very Strong';
    }
    return strength;
}

password = generate();
strength = stren(password);
console.log(`PASSWORD: ${password}`);
console.log(`STRENGTH: ${strength}`);
