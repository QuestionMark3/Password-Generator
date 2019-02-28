// Key pools
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789';
const symbols = '!"#$%&\'()*+,-./:;<=>?@^[\\]^_`{|}~';

// Function for calculating intersection of two char arrays converted from strings
intersection = (str1, str2) => {
    let charArr1 = str1.split('');
    let charArr2 = str2.split('');
    let interArr = charArr1.filter( value => charArr2.includes(value) );
    return interArr;
}

// Function for randomly generating password
// Key Pool parameters are booleans that specifying what characters are used
generate = (length = 12, sym = true, caps = true, num = true, low = true) => {
    let keys = '';
    if (low === true) {
        keys += lowercase;
    }
    if (caps === true) {
        keys += uppercase;
    }
    if (num === true) {
        keys += numbers;
    }
    if (sym === true) {
        keys += symbols;
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * keys.length);
        let randomKey = keys[index];
        password+=randomKey;
    }
    return password;
}

// Function for testing password entropy (Using E = log_2(R^L), where 
// E = entropy, R = pool size, L = password length)
entropy = (password) => {
    // Determine pool of characters
    let keys = '';

    for (let keyPool of [lowercase, uppercase, numbers, symbols]) {
        let inter = intersection(password, keyPool);
        if (inter.length !== 0) {
            keys += keyPool;
        }
    }

    // Calculate entropy
    let pool = keys.length;
    let length = password.length;
    let entrop = Math.log2(Math.pow(pool, length));
    return entrop;
}

// Obtain strength from entropy
strength = (entrop) => {
    let stren;
    if (entrop < 28){
        stren = 'Very Weak';
    }
    else if (entrop <= 35){
        stren = 'Weak';
    }
    else if (entrop <= 59){
        stren = 'Reasonable';
    }
    else if (entrop <= 127){
        stren = 'Strong';
    }
    else {
        stren = 'Very Strong';
    }
    return stren;
}

password = generate(20, false);
entropy = entropy(password);
strength = strength(entropy);
console.log(`PASSWORD: ${password}`);
console.log(` ENTROPY: ${entropy}`);
console.log(`STRENGTH: ${strength}`);
