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

        // console.log("data", doc.data().fname);
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
  clearForm()
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

  // Query the database to check if the user exists
  db.where("idEmail", "==", loginEmail)
    .where("idPw", "==", loginPassword)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("Invalid credentials");
        document.getElementById("error-message").textContent = "Credenciais inválidas. Por favor, verifique seu email e senha.";
      } else {
        // User exists, perform login logic here
        console.log("Login successful");
        // Redirect the user to the desired page after login
        window.location.href = "/HTML/User.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
