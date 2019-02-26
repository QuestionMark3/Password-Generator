generate = (length = 8) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!"#$%&\'()*+,-./:;<=>?@^[\\]^_`{|}~';
    const keys = alphabet + numbers + symbols;
    let password = '';
    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * keys.length);
        let randomKey = keys[index];
        password+=randomKey;
    }
    return password;
}
console.log(generate())