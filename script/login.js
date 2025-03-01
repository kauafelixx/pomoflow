const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMeCheckbox = document.getElementById("remember-me");

// Verifica se há dados salvos no localStorage
window.addEventListener("load", () => {
  const savedEmail = localStorage.getItem("savedEmail");
  const savedPassword = localStorage.getItem("savedPassword");

  if (savedEmail && savedPassword) {
    emailInput.value = savedEmail;
    passwordInput.value = savedPassword;
    rememberMeCheckbox.checked = true; // Marca o checkbox
  }
});

// Função para salvar ou remover os dados do localStorage
function handleRememberMe(email, password, rememberMe) {
  if (rememberMe) {
    localStorage.setItem("savedEmail", email);
    localStorage.setItem("savedPassword", password);
  } else {
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
  }
}

// Função para validar o login
function validateLogin(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    alert("Email ou senha incorretos.");
    return false;
  }

  return true;
}

// Event listener para o formulário de login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const rememberMe = rememberMeCheckbox.checked;

  // Validação simples (opcional)
  if (!email || !password) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (validateLogin(email, password)) {
    // Salva ou remove os dados do localStorage
    handleRememberMe(email, password, rememberMe);

    // Redireciona para a página home
    window.location.href = "home.html";
  }
});
