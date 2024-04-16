const prompt = require("prompt-sync")();
const bcrypt = require('bcrypt');

async function main() {
    console.log("Привіт!");

    let password;
    do {
        password = prompt("--ur password: ");
        if (password.length < 8) {
            console.error("--Мінімальна кількість символів - 8.");
        }
    } while (password.length < 8);

    try {
        const hashedPassword = await hashPassword(password);
        console.log("--hashed:");
        console.log(hashedPassword);


        const match = await verifyPassword(password, hashedPassword);
        if (match) {
            console.log("--success");
        } else {
            console.log("--verif failed.");
        }
    } catch (error) {
        console.error("-error:", error.message);
    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

main();