
// abrir o menu
document.addEventListener("DOMContentLoaded", function () {
  const menuContainer = document.getElementById("menu-container");

  fetch("./menu.html") // Caminho para o arquivo menu.html
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar o menu.");
      }
      return response.text();
    })
    .then(data => {
      menuContainer.innerHTML = data;
    })
    .catch(error => {
      console.error("Erro ao carregar o menu:", error);
    });
});




// abrir o carrossel de exames
document.addEventListener("DOMContentLoaded", function () {
  const carrosselContainer = document.getElementById("carrossel"); // Onde o carrossel será carregado

  fetch('carrossel_exames.html') // Carrega o arquivo carrossel_exames.html
    .then(response => response.text()) // Converte a resposta para texto
    .then(data => {
      carrosselContainer.innerHTML = data; // Insere o conteúdo no container

      // Após carregar o conteúdo, carregue o script do carrossel
      const script = document.createElement("script");
      script.src = "./JS/carrossel_exames.js";
      script.defer = true; // Garante que o script será executado após o HTML ser analisado
      document.body.appendChild(script);
    })
    .catch(error => console.error('Erro ao carregar o carrossel:', error)); // Tratamento de erro
});

// abrir o carrossel de galeria
document.addEventListener("DOMContentLoaded", function () {
  const carrosselContainer = document.getElementById("carrossel_galeria"); // Onde o carrossel será carregado

  fetch('carrossel_galeria.html') // Carrega o arquivo carrossel_galeria.html
    .then(response => response.text()) // Converte a resposta para texto
    .then(data => {
      carrosselContainer.innerHTML = data; // Insere o conteúdo no container

      // Após carregar o conteúdo, carregue o script do carrossel
      const script = document.createElement("script");
      script.src = "./JS/carrossel_galeria.js";
      script.defer = true; // Garante que o script será executado após o HTML ser analisado
      document.body.appendChild(script);
    })
    .catch(error => console.error('Erro ao carregar o carrossel:', error)); // Tratamento de erro
});


// abrir o footer
document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.getElementById("footer"); // Onde o footer será carregado
  fetch('footer.html') // Carrega o arquivo footer.html
    .then(response => response.text()) // Converte a resposta para texto
    .then(data => {
      footerContainer.innerHTML = data; // Insere o conteúdo do menu no container
    })
    .catch(error => console.error('Erro ao carregar o footer:', error)); // Tratamento de erro
});

// Inclui o botão de WhatsApp dinamicamente
fetch('whatsapp-button.html')
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
  })
  .catch(error => console.error('Erro ao carregar o botão de WhatsApp:', error));

// Função para formatar o número de telefone com limite de caracteres
document.getElementById("celular").addEventListener("input", function (event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, ""); // Remove tudo que não é número

  // Limita o número de caracteres a 11 (xx xxxxx-xxxx)
  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  // Formatação (xx) xxxxx-xxxx
  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (value.length > 0) {
    value = value.replace(/^(\d{0,2})/, "($1");
  }

  input.value = value; // Define o valor formatado no input
});

//funcao para abrir o link em nova aba 
function resultados_medico() {
  const encodedUrl = atob("aHR0cDovL21lZGltYWdlbXNzcDMuZGRucy5uZXQ6ODA4MS9jc2FkdndlYi9Eb2N0b3IvTG9naW4vSW5kZXg"); // Link codificado em Base64
  window.open(encodedUrl, '_blank'); // Abre em nova aba
}

function resultados_paciente() {
  const encodedUrl = atob("aHR0cDovL21lZGltYWdlbXNzcDMuZGRucy5uZXQ6ODA4MS9jc2FkdndlYi9QYXRpZW50L0xvZ2luL0luZGV4"); // Link codificado em Base64
  window.open(encodedUrl, '_blank'); // Abre em nova aba
}

function whatsapp() {
  const encodedUrl = atob("aHR0cHM6Ly93YS5tZS81NTM1OTk3MjI2NDc5P3RleHQ9T2wlQzMlQTFHJTIxK0dvc3RhcmlhK2RlK2FnZW5kYXIlMjBtZXVzJTIwZXhhbWVzJTIx");
  window.open(encodedUrl, '_blank'); // Abre em nova aba
}

function sendEmail() {
  // Captura os dados do formulário
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var celular = document.getElementById('celular').value;
  var mensagem = document.getElementById('mensagem').value;

  // Cria o objeto com os dados do formulário
  var data = {
      nome: nome,
      email: email,
      celular: celular,
      mensagem: mensagem
  };

  // Faz a requisição para a API usando jQuery
  $.ajax({
      url: 'https://apiduzani.duckdns.org/email_medimagem',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(response) {
          if (response.success) {
            document.getElementById("successModal").style.display = "block";

            // Limpa os campos do formulário
            document.getElementById('nome').value = "";
            document.getElementById('email').value = "";
            document.getElementById('celular').value = "";
            document.getElementById('mensagem').value = "";
          } else {
            alert("Ocorreu um erro ao enviar o email. Tente novamente mais tarde.");
          }
      },
      error: function(error) {
        alert("Ocorreu um erro. Tente novamente.");
      }
  });
}
function closeModal() {
  // Fecha a modal
  document.getElementById("successModal").style.display = "none";
}

// Fechar o modal ao clicar fora da área de conteúdo
window.addEventListener("click", function(event) {
  var modal = document.getElementById("successModal");
  if (event.target === modal) {
    closeModal();
  }
});