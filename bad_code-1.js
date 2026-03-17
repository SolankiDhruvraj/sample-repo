// 1. HARDCODED_SECRET (HIGH +3) - Matches /(secret|password|token|apikey).*['"][a-zA-Z0-9_-]+['"]/i
const apiKey = 'sk-abc123456789';

async function processUserRequest(req, res) {
  // 2. MISSING_INPUT_VALIDATION (MEDIUM +2) - Matches /(req\.body...)/ without validation library
  const userData = req.body;
  
  // 3. XSS_RISK (HIGH +3) - Matches /innerHTML\s*=\s*[^;]+(req\.|request\.|body|query|params)/
  document.getElementById('display').innerHTML = req.body.userInput;
  
  // 4. UNSAFE_EVAL (HIGH +3) - Matches /\beval\s*\(/
  eval(userData.script);
  
  // 5. SQL_INJECTION_RISK (HIGH +3) - Matches /\b(db|query|execute|sql)\s*\(\s*`[^`]*\$\{[^}]+\}[^`]*`/ 
  const users = await db.query(`SELECT * FROM users WHERE name = '${userData.name}'`);
  
  // 6. COMMAND_INJECTION_RISK (HIGH +3) - Matches /\b(exec|spawn|execFile)\s*\(/
  const { exec } = require('child_process');
  exec(`rm -rf ${userData.path}`);
  
  // 7. BLOCKING_CALL_IN_LOOP (HIGH +3) - Matches /for\s*\([^)]*\)\s*{[\s\S]{0,80}\b(await|fs\.(readFileSync|writeFileSync)|execSync)\b/
  for (const item of userData.items) {
    const data = fs.readFileSync(item.path);
  }

  // 8. DEEP_NESTED_LOOPS (MEDIUM +2) - Matches /\b(for|while)\b[\s\S]{0,120}\b.../
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        console.log("O(n^3)");
      }
    }
  }

  // 9. POTENTIAL_NULL_UNDEFINED_ACCESS (MEDIUM +2) - Matches /\b([a-zA-Z_$][\w$]*)\.([a-zA-Z_$][\w$]*)\.([a-zA-Z_$][\w$]*)/
  const city = userData.address.city;
  
  // 10. OFF_BY_ONE_LOOP_BOUND (MEDIUM +2) - Matches /\b(for|while)\s*\([^<>=]*<=\s*length\b/
  for (let i = 0; i <= users.length; i++) {
    console.log(users[i]);
  }

  // 11. UNHANDLED_PROMISE (MEDIUM +2) - Matches /\.then\(/ without /\.catch\(/
  fetch('https://api.example.com').then(response => response.json());
  
  // 12. SILENT_CATCH (LOW +1) - Matches /catch\s*\(\s*\)\s*{[^}]*}/
  try { 
    doRiskyThing(); 
  } catch () {}
}
