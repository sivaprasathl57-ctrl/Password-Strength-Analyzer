const sets = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[{]}|;:',<.>/?`~"
};
async function loadCommonPasswords() {
  try {
    const res = await fetch("common-passwords.json");
    return await res.json();
  } catch (error) {
    console.error("Error loading JSON:", error);
    return [];
  }
}
function checkLength(pwd) {
  return pwd.length >= 8;
}
function charClasses(pwd) {
  return {
    lower: /[a-z]/.test(pwd),
    upper: /[A-Z]/.test(pwd),
    digit: /\d/.test(pwd),
    symbol: /[^A-Za-z0-9]/.test(pwd)
  };
}
function estimateEntropy(pwd) {
  let pool = 0;
  const classes = charClasses(pwd);
  if (classes.lower) pool += sets.lower.length;
  if (classes.upper) pool += sets.upper.length;
  if (classes.digit) pool += sets.digits.length;
  if (classes.symbol) pool += sets.symbols.length;
  return pwd.length * Math.log2(pool || 1);
}
function generateSuggestions(pwd) {
  const suggestions = [];
  if (!checkLength(pwd)) suggestions.push("Use at least 8 characters.");
  const classes = charClasses(pwd);
  if (!classes.upper) suggestions.push("Add uppercase letters.");
  if (!classes.digit) suggestions.push("Add numbers.");
  if (!classes.symbol) suggestions.push("Add symbols.");
  return suggestions;
}
function getLabel(entropy) {
  if (entropy < 28) return "Very Weak";
  if (entropy < 36) return "Weak";
  if (entropy < 60) return "Moderate";
  if (entropy < 128) return "Strong";
  return "Very Strong";
}
async function analyzePassword(pwd) {
  const bar = document.getElementById("strengthBar");
  const label = document.getElementById("strengthLabel");
  const entropyLabel = document.getElementById("entropyLabel");
  const suggestionsList = document.getElementById("suggestions");
  if (!pwd) {
    bar.style.width = "0%";
    label.textContent = "Strength: ";
    entropyLabel.textContent = "Entropy: ";
    suggestionsList.innerHTML = "";
    return;
  }
  const commonPasswords = await loadCommonPasswords();
  if (commonPasswords.includes(pwd)) {
    bar.style.width = "10%";
    bar.style.background = "red";
    label.textContent = "Strength: Very Weak (common password)";
    entropyLabel.textContent = "Entropy: N/A";
    suggestionsList.innerHTML = "<li>Do not use common passwords.</li>";
    return;
  }
  const entropy = estimateEntropy(pwd);
  const strengthLabel = getLabel(entropy);
  label.textContent = `Strength: ${strengthLabel}`;
  entropyLabel.textContent = `Entropy: ${entropy.toFixed(2)} bits`;
  let percent = Math.min(entropy, 128) / 128 * 100;
  bar.style.width = percent + "%";
  bar.style.background =
    strengthLabel === "Very Weak" ? "red" :
    strengthLabel === "Weak" ? "orange" :
    strengthLabel === "Moderate" ? "yellow" :
    strengthLabel === "Strong" ? "lightgreen" : "green";
  const suggs = generateSuggestions(pwd);
  suggestionsList.innerHTML = suggs.map(s => `<li>${s}</li>`).join("");
}
document.getElementById("passwordInput").addEventListener("input", e => {
  analyzePassword(e.target.value);
});


