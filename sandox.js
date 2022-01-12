let zipCodeField = document.querySelector('#app input');
let button = document.querySelector('#app form button');
let content = document.querySelector('#app main');


button.addEventListener('click', (e) => {
    e.preventDefault();

    // formatando o valor do cep
    let zipCode = zipCodeField.value;
    zipCode = zipCode.trim();
    zipCode = zipCode.replace(' ', '');
    zipCode = zipCode.replace('.', '');

    // requisição ajax com axios
    axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then(response => {
            
            // jogando um erro dentro da response pro catch
            if (response.data.erro){
                throw new Error('CEP inválido');
            }

            // colocando o conteúdo da api dentro do html
            content.innerHTML = '';
            createLine(response.data.logradouro + ' - ' + response.data.bairro);
            createLine(response.data.localidade + '/' + response.data.uf);
        })
        .catch(error => {
            content.innerHTML = '';
            console.error(error);
            createLine('Digite um CEP válido');
        });
        
});

// função que cria os elementos html
const createLine = (text) => {
    let line = document.createElement('p');
    let textContent = document.createTextNode(text)

    line.appendChild(textContent);
    content.appendChild(line);
}





