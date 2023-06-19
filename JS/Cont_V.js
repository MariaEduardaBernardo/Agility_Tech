// Verificar o estado de autenticação ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    // Adicionar listener para o evento onAuthStateChanged
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // O usuário está autenticado
            console.log('Usuário autenticado:', user.email);

            // Exibir o email do usuário
            let userEmailElement = document.getElementById("userEmail");
            userEmailElement.textContent = user.email;

            // Obter o nome do usuário do banco de dados
            db.where("idEmail", "==", user.email.toLowerCase())
                .get()
                .then((snapshot) => {
                    if (!snapshot.empty) {
                        const userData = snapshot.docs[0].data();
                        const userNameElement = document.getElementById("userName");
                        userNameElement.textContent = "" + userData.idName;
                    }
                })
                .catch((error) => {
                    console.log("Erro ao obter o nome do usuário:", error);
                });

            // Exibir o contêiner com as informações do usuário
            document.getElementById("hello-world").style.display = "block";

        } else {
            // O usuário não está autenticado, redirecionar para a página "teste.html"
            window.location.href = "index.html";
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    // ...

    // Adicionar ouvinte de eventos para o botão de sair
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
        firebase.auth().signOut().then(() => {
            // Logout bem-sucedido, redirecionar para a página
            window.location.href = "/AcessoUser.html";
        }).catch((error) => {
            // Ocorreu um erro ao fazer logout
            console.log('Erro ao fazer logout:', error);
        });
    });
});

document.getElementById("infoForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página ao enviar o formulário

    var additionalInfo = document.getElementById("additionalInput").value;
    var additionalParagraph = document.createElement("div");
    additionalParagraph.classList.add("additional-info-item");

    var infoText = document.createElement("span");
    infoText.textContent = additionalInfo;
    additionalParagraph.appendChild(infoText);

    var removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", function () {
        additionalParagraph.remove();
        updateIntroText();
    });
    additionalParagraph.appendChild(removeButton);

    document.getElementById("additionalInfo").appendChild(additionalParagraph);

    // Limpe o formulário
    document.getElementById("infoForm").reset();

    // Verifique se há informações adicionais e atualize a exibição do texto introdutório
    function updateIntroText() {
        var introText = document.getElementById("introText");
        if (document.getElementById("additionalInfo").children.length > 0) {
            introText.style.display = "none"; // Oculta o texto introdutório se houver informações adicionais
        } else {
            introText.style.display = "block"; // Exibe o texto introdutório se não houver informações adicionais
        }
    }

    updateIntroText();
});
