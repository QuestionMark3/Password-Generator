// Key pools
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789';
const symbols = '!"#$%&\'()*+,-./:;<=>?@^[\\]^_`{|}~';

// Function for calculating intersection of two char arrays converted from strings
intersection = (str1, str2) => {
	str1 = str1 + '';
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
        stren = ['Very Weak', 'Brown'];
    }
    else if (entrop <= 35){
        stren = ['Weak', 'Red'];
    }
    else if (entrop <= 59){
        stren = ['Reasonable', 'Orange'];
    }
    else if (entrop <= 127){
        stren = ['Strong', '#22dd00'];
    }
    else {
        stren = ['Very Strong', '#ffd700'];
    }
    return stren;
}

// Event listener that calls generate() and enters the password to the input field
update = () => {
	let field = document.getElementById('password');
    let low = document.getElementById('low').checked;
    let up = document.getElementById('up').checked;
    let num = document.getElementById('num').checked;
    let sym = document.getElementById('sym').checked;
	let password = generate(20, sym, up, num, low);
	field.value = password;
    let strenTxt = document.getElementById('strength');
    let brk = document.getElementById("break");
    // Removing strength when a new password is generated and general formatting
    if (strenTxt.innerHTML !== ''){
        strenTxt.innerHTML = '';
        let container = document.getElementById("container");
        let options = document.getElementById('options');
        let brk = document.createElement("br");
        brk.id = 'break';
        container.insertBefore(brk, options);
    }
}

// Event listener that calls strength() and displays the value
test = () => {
	let strenTxt = document.getElementById('strength');
	let password = document.getElementById('password').value;
	let stren = strength(entropy(password));
	strenTxt.innerHTML = stren[0];
	strenTxt.style.color = stren[1];
    // General formatting 
    let container = document.getElementById("container");
	let brk = document.getElementById("break");
	if (brk !== null){
		container.removeChild(brk);
	}
}

let gen = document.getElementById("gen");
let tes = document.getElementById("test");
gen.addEventListener("click", update);
tes.addEventListener("click", test);
document.addEventListener("keydown", event => {
  if (event.keyCode === 13) {
   event.preventDefault();
   tes.click();
  }
});
