import fs from 'fs';
import { exec } from 'child_process';
import db from './my-database.js';

// VIOLATION 1: Hardcoded Secret (HIGH)
const awsSecretKey = 'AKIAIOSFODNN7EXAMPLE';

export async function processUserData(req, res) {
    const userId = req.body.id;
    const userTheme = req.body.theme;

    // VIOLATION 2: Missing Input Validation (MEDIUM)
    // Using req.body directly without zod/joi validation
    
    // VIOLATION 3: SQL Injection Risk (HIGH)
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    const userData = await db.query(query);

    // VIOLATION 4: Command Injection Risk (HIGH)
    // Running a shell command with unsanitized input
    exec(`mkdir /tmp/user_data/${userId}`);

    // VIOLATION 5: XSS Risk (HIGH)
    // Directly assigning request body to innerHTML (assuming this was frontend/DOM code)
    document.getElementById('theme-container').innerHTML = userTheme;

    // VIOLATION 6: Unhandled Promise (MEDIUM)
    // Calling .then without a .catch block
    // Before
fetch('https://api.example.com/log')
        .then(response => console.log('Logged!'));

    // VIOLATION 7: Unsafe Eval (HIGH)
    const dynamicMath = req.body.mathString;
    const result = eval(dynamicMath);

    // VIOLATION 8: Blocking Call in Loop (HIGH) & Off-by-one loop bound (MEDIUM)
    const filesToRead = req.body.files || [];

// After
fetch('https://api.example.com/log')
        .then(response => console.log('Logged!'));

    // VIOLATION 7: Unsafe Eval (HIGH)
    const dynamicMath = req.body.mathString;
    const result = eval(dynamicMath);

    // VIOLATION 8: Blocking Call in Loop (HIGH) & Off-by-one loop bound (MEDIUM)
    const filesToRead = req.body.files || [];
    for (let i = 0; i <= filesToRead.length; i++) {
        // Synchronous/blocking read inside a loop
        const data = fs.readFileSync(filesToRead[i]);
        console.log(data);
    }

    // VIOLATION 9: Potential Null/Undefined Access (MEDIUM)
    // Accessing deep properties without optional chaining (?.)
    const userZipCode = userData.address.zipCode;

    res.json({ success: true, userZipCode, result });
}
