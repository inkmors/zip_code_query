const btnCEP = document.querySelector('#btn-search')
const inputCEP = document.querySelector('#inpt-user')
const body = document.body

btnCEP.addEventListener('click', searchCep)

function searchCep(){
    let cepUser = inputCEP.value

    if(inputCEP.value === ''){
        alert('Erro: Informe um CEP')
        return
    }

    const apiUrl = `https://viacep.com.br/ws/${cepUser}/json/`

    fetch(apiUrl)
    .then(data => {
        if(!data.ok){
            throw new Error('Solicitação má sucedida')
        }
        return data.json()
    })

    .then(response => {
        const divResults = document.querySelector('#results')
        const divAlight = document.createElement('div')
        const showBairro = document.createElement('h3')
        const showLogradouro = document.createElement('h3')
        const showRegiao = document.createElement('h3')
        const showLocalidade = document.createElement('h3')
        const showDdd = document.createElement('h3')

        inputCEP.value = ''
        divResults.innerHTML = ''
        divAlight.style.display = 'flex'
        divAlight.style.flexDirection = 'column'
        divAlight.style.alignItems = 'start'
        divAlight.style.gap = '1rem'
        divAlight.style.backgroundColor = 'rgb(255, 153, 0)'
        divAlight.style.color = 'white'
        divAlight.style.padding = '2em 2em'
        divAlight.style.borderRadius = '10px'

        showBairro.innerHTML = `Bairro: ${response.bairro}`
        showLogradouro.innerHTML = `Rua: ${response.logradouro}`
        showRegiao.innerHTML = `Região: ${response.regiao}`
        showLocalidade.innerHTML = `Cidade: ${response.localidade}, ${response.estado}`
        showDdd.innerHTML = `DDD: 0${response.ddd}`
        divAlight.append(showBairro, showLogradouro, showRegiao, showLocalidade, showDdd)
        divResults.append(divAlight) 
        }     
    )
    .catch(error => {
        const errorP = document.createElement('p')
        errorP.innerHTML = `Erro: ${error}`
        console.error(error)
    })
}

