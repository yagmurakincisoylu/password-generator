const passOne = document.getElementById("passOne");
const passTwo = document.getElementById("passTwo");
const passThree = document.getElementById("passThree");
const passFour = document.getElementById("passFour");
const genBtn = document.getElementById("genBtn");
const passLength = document.getElementById("passLength");
const output = document.getElementById("output");
const tooltipText = document.querySelectorAll(".tooltip-text");
let genBtnClicked = false;

const allPasswords = [];
allPasswords.push(passOne, passTwo, passThree, passFour);

passLength.addEventListener("input", () => {
    output.textContent = passLength.value;
});

const generatePassword = password => {
    const length = Number(passLength.value),
        startPoint = 33,
        endPoint = 127;
    let retVal = "";
    for(let i = 0; i < length; i++){
        retVal += String.fromCharCode((Math.floor(Math.random() * (endPoint - startPoint)) + startPoint));
    }

    password.children[1].textContent = retVal;

    for (let i = 0; i < tooltipText.length; i++) {
        tooltipText[i].textContent = `Copy`;
    }

    genBtnClicked = true;
};

genBtn.addEventListener("click", () => {
    for(let i = 0; i < allPasswords.length; i++){
        generatePassword(allPasswords[i]);
    }
});

const copyPass = (text, i) => {
    navigator.clipboard.writeText(text);
    for (let j = 0; j < tooltipText.length; j++) {
        if (j === i) {
            tooltipText[j].textContent = `Copied`;
        } else {
            tooltipText[j].textContent = `Copy`;
        }
    }
};

allPasswords.forEach((password, i)=> {
    password.addEventListener("click", () => {
        const copyText =  password.children[1].textContent;
        if(genBtnClicked) {
            copyPass(copyText, i);
        }
    });
})