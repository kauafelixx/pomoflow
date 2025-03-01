const registerForm = document.getElementById("register-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

// Função para validar o formulário
function validateForm(email, password, confirmPassword) {
  if (!email || !password || !confirmPassword) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem.");
    return false;
  }

  return true;
}

// Função para salvar os dados no localStorage
function saveUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    alert("Este email já está cadastrado.");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registro concluído! Faça login para continuar.");
  window.location.href = "index.html"; // Redireciona para a página de login
}

// Event listener para o formulário de registro
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (validateForm(email, password, confirmPassword)) {
    saveUser(email, password);
  }
});
