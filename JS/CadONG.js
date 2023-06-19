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
  const db = firestore.collection("CadastroONG");

  // Initialize Authentication
  const auth = firebase.auth();

  // Get Submit Form
  let submitButton = document.getElementById("submit");
  let loginButton = document.getElementById("login");
  let logoutButton = document.getElementById("logout");

  // Create Event Listener To Allow Form Submission
  submitButton.addEventListener("click", (e) => {
  // Prevent Default Form Submission Behavior
  e.preventDefault();

  // Get Form Values
  let userName = document.getElementById("validationCustom01").value;
  let userEmail = document.getElementById("validationCustom02").value;
  let password = document.getElementById("validationCustom05").value;


  firestore
  .collection("fomData")
  .get()
  .then((snapshot) => {
  snapshot.docs.forEach((doc) => {
  const fn = doc.data().validationCustom01;
  if (userName === fn) {
  console.log("Already Exists");
  }
  });
  });

  // Save Form Data To Firebase
  db.doc()
  .set({
  validationCustom01: userName,
  validationCustom02: userEmail,
  validationCustom05: password,
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
  })

  // clear form after submission
  function clearForm() {
  document.getElementById("clearFrom").reset();
  }
  clearForm();
  });

  // Set initial display to none for the element with class "post"
  document.addEventListener("DOMContentLoaded", () => {
    let postContent = document.querySelector(".post");
    postContent.style.display = "none";
  });


  // Verificar o estado de autenticação ao carregar a página
  window.addEventListener('DOMContentLoaded', () => {
    // Adicionar listener para o evento onAuthStateChanged
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // O usuário está autenticado
      console.log('Usuário autenticado:', user.email);


      let greetingElement = document.getElementById("greeting");
      greetingElement.textContent = "Bem-vindo, " + user.email + "!";

b
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
      window.location.href = "/HTML/User.html";

      // Exibir o contêiner após o login
      let container = document.querySelector(".container");
      container.style.display = "block";

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

      window.location.href = "index.html";

      // Oculte o contêiner após o logout
      let post = document.querySelector(".post");
      post.style.display = "none";
    })
    .catch((error) => {
      // Ocorreu um erro durante o logout
      console.log("Erro ao fazer logout:", error);
    });
  });
