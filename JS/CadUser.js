//Unique Firebase Object
const firebaseConfig = {
  apiKey: "AIzaSyDkgwXqmu2FXCn856hH3J68m_Ju2kwpW_0",
  authDomain: "forcadoberm.firebaseapp.com",
  databaseURL: "https://forcadoberm-default-rtdb.firebaseio.com",
  projectId: "forcadoberm",
  storageBucket: "forcadoberm.appspot.com",
  messagingSenderId: "990008156205",
  appId: "1:990008156205:web:99da9a412825c7f59498a4"
}

// Iniciar Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

// Variable to access database collection
const db = firestore.collection("CadastroUser");

// Initialize Authentication
const auth = firebase.auth();

// Get Submit Form
let submitButton = document.getElementById("submit");
let loginButton = document.getElementById("login");
let logoutButton = document.getElementById("logout");


submitButton.addEventListener("click", (e) => {
  // Prevent Default Form Submission Behavior
  e.preventDefault();

  // Get Form Values
  let userName = document.getElementById("idName").value;
  let userEmail = document.getElementById("idEmail").value;
  let password = document.getElementById("idPw").value;

  firestore
    .collection("fomData")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const fn = doc.data().idName;
        if (userName === fn) {
          console.log("Already Exists");
        }
      });
    });

  // Save Form Data To Firebase
  db.doc()
    .set({
      idName: userName,
      idEmail: userEmail,
      idPw: password,
    })
    .then(() => {
      // Criar conta de usuário com email e senha
      auth
        .createUserWithEmailAndPassword(userEmail, password)
        .then((userCredential) => {
          // Autenticar o usuário
          const user = userCredential.user;
          console.log("Usuário cadastrado e autenticado:", user.email);
        })
        .catch((error) => {
          console.log("Erro ao criar conta de usuário:", error);
        });
    });

  // alert
  alert("Resposta enviada!");

  // clear form after submission
  function clearForm() {
    document.getElementById("clearFrom").reset();
      document.getElementById("idName").value = "";
      document.getElementById("idEmail").value = "";
      document.getElementById("idPw").value = "";
  }
  clearForm();
});


// Verificar o estado de autenticação ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  // Adicionar listener para o evento onAuthStateChanged
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // O usuário está autenticado
    console.log('Usuário autenticado:', user.email);

  } else {
    // O usuário não está autenticado
    console.log('Usuário não autenticado');
    }
  });
});

// Create Event Listener for Login
loginButton.addEventListener("click", (e) => {
  // Prevent Default Form Submission Behavior
  e.preventDefault();

  // Get Form Values
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Sign in the user with email and password
  auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Authentication successful
    const user = userCredential.user;
    console.log('Usuário autenticado:', user.email);
    window.location.href = "index.html";

  })
  .catch((error) => {
  // Authentication failed
  console.log('Erro ao autenticar usuário:', error);
  document.getElementById("error-message").textContent = "Credenciais inválidas";
  });
});


// Sair da conta
// Adicione um evento de clique ao botão de logout
logoutButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Execute o logout do usuário
  auth.signOut()
  .then(() => {

    // Logout bem-sucedido
    console.log('Usuário fez logout');
    removePostElement();

    window.location.href = "HTML/index.html";

    // Oculte o contêiner após o logout
    let post = document.querySelector(".post");
    post.style.display = "none";
  })
  .catch((error) => {
    // Ocorreu um erro durante o logout
    console.log("Erro ao fazer logout:", error);
  });
});
