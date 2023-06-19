//Unique Firebase Object
const firebaseConfig = {
    apiKey: "AIzaSyDkgwXqmu2FXCn856hH3J68m_Ju2kwpW_0",
    authDomain: "forcadoberm.firebaseapp.com",
    projectId: "forcadoberm",
    storageBucket: "forcadoberm.appspot.com",
    messagingSenderId: "990008156205",
    appId: "1:990008156205:web:99da9a412825c7f59498a4"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Variable to access database collection
const db = firestore.collection("CadastroUser");

//Get Submit Form
let submitButton = document.getElementById("submit");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault();

    //Get Form Values
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

    //Save Form Data To Firebase
    db.doc()
        .set({
            idName: userName,
            idEmail: userEmail,
            idPw: password
        })
        .then(() => { })
        .catch((error) => {
            console.log(error);
        });

    //alert
    alert("Resposta enviada!");

    //clear form after submission
    function clearForm() {
        document.getElementById("clearFrom").reset();
    }
    clearForm();
});

//Get Login Form
let loginButton = document.getElementById("login");

//Create Event Listener To Allow Login
loginButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault();

    //Get Form Values
    let loginEmail = document.getElementById("email").value;
    let loginPassword = document.getElementById("password").value;

    // Validate Form Inputs
    if (loginEmail.trim() === '' || loginPassword.trim() === '') {
        console.log("Invalid credentials");
        document.getElementById("error-message").textContent =
            "Credenciais inválidas. Por favor, preencha todos os campos.";
        return;
    }

    // Authenticate User
    db.where("idEmail", "==", loginEmail.toLowerCase())
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                // User does not exist
                console.log("Invalid credentials");
                document.getElementById("error-message").textContent =
                    "Credenciais inválidas. Por favor, verifique seu email e senha.";
            } else {
                // User exists, check password
                const user = snapshot.docs[0].data();
                if (user.idPw === loginPassword) {
                    // Password is correct, perform login logic here
                    console.log("Login successful");
                    // Redirect the user to the desired page after login
                    // ...

                    // Exibir o nome do usuário autenticado
                    document.getElementById("user-name").textContent = user.idName;
                    document.getElementById("user-email").textContent = user.idEmail;
                    document.getElementById("hello-world").style.display = "block";
                } else {
                    // Password is incorrect
                    console.log("Invalid credentials");
                    document.getElementById("error-message").textContent =
                        "Credenciais inválidas. Por favor, verifique seu email e senha.";
                }
            }
        })
        .catch((error) => {
            console.log("Error getting user data:", error);
        });
});

//Sair da conta
// Lidar com o clique no botão "Sair"
document.getElementById("logout").addEventListener("click", function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            // Logout bem-sucedido
            document.getElementById("hello-world").style.display = "none"; // Ocultar o elemento "Olá Mundo"
        })
        .catch(function (error) {
            // Tratar erros de logout, se necessário
            console.log("Erro ao fazer logout:", error);
        });
});

// Verificar o estado de autenticação do usuário ao carregar a página
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // O usuário está autenticado
                console.log("Usuário autenticado:", user);
                // Exibir o elemento "Olá Mundo"
                document.getElementById("hello-world").style.display = "block";
            } else {
                // O usuário não está autenticado
                console.log("Usuário não autenticado");
                // Ocultar o elemento "Olá Mundo"
                document.getElementById("hello-world").style.display = "none";
            }
        });
    })
    .catch(function (error) {
        console.log("Erro ao configurar a persistência da autenticação:", error);
    });
