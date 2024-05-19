const parametros = new URLSearchParams(window.location.search);

const id = parametros.get('idEmpresa')
//funçoes de requisicao de parametros para as telas
const buscaParams = async () =>{

    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/retornaParametrosTelas',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            }, 
            body: json
        })
        if (req.ok){
            const resposta = await req.json()

           const params = resposta.retorno;
        
           verificaParametrosTela(params);

        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}

const buscaDept = async () =>{

}

//requisicao de cadastro de departamentos via csv
const cadastraCSV = async (json) => {
    try{
        const requisicao = await fetch('http://localhost:3000/api/departamento',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: json
            });

            if(requisicao.ok){
                alert('Cadastro Realizado com Sucesso!')
                window.location.reload()
            }else{
                alert('Erro de cadastro tente novamente');
            }
    }catch(err){
        alert('Erro de conexao')
            console.log(err)
    }
}

//requisicao que cadastra os cargos via csv
const cadastraCSVCargo = async (json) => {
    try{
        const requisicao = await fetch('http://localhost:3000/api/cadastraCargo',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: json
            });

            if(requisicao.ok){
                alert('Cadastro Realizado com Sucesso!')
                window.location.reload()
            }else{
                alert('Erro de cadastro tente novamente');
            }
    }catch(err){
        alert('Erro de conexao')
            console.log(err)
    }
}

//requisiscao cadastro de departamentos via input
const cadastrarManual = async (event) => {
    event.preventDefault();

    var nome = document.getElementById('nomeDepartamento').value

    if(nome === ''){
        alert('Preencha o nome do Departamento')
    }else{
        const data = [{
            nomeDepartamento: nome,
            idEmpresa: id
        }]

        let json = JSON.stringify(data)
        try{
            const requisicao = await fetch('http://localhost:3000/api/departamento',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: json
            });

            if(requisicao.ok){
                alert('Cadastro Realizado com Sucesso!')
                window.location.reload()
            }else{
                alert('Erro de cadastro tente novamente');
            }
        }catch(err){s
            alert('Erro de conexao')
            console.log(err)
        }
    }
}

//requisiscao cadastro de cargos via input
const cadastrarManualCargo = async (event) => {

    let select = document.getElementById('selectIdDept')
    event.preventDefault();
    let nome = document.getElementById('nomeCargo').value

    if(nome === ''){
        alert('Preencha o nome do Cargo')
    }else{
        const data = [{
            nomeCargo: nome,
            idDepartamento: select.value,
            idEmpresa: id
        }]

        let json = JSON.stringify(data)
        try{
            const requisicao = await fetch('http://localhost:3000/api/cadastraCargo',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: json
            });

            if(requisicao.ok){
                alert('Cadastro Realizado com Sucesso!')
                window.location.reload()
            }else{
                alert('Erro de cadastro tente novamente');
            }
        }catch(err){
            alert('Erro de conexao')
            console.log(err)
        }
    }
}

//requisicao que retorna todos dos departamentos cadastrados de uma empresa
const retornaDepartamentosCadastrados = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/retornaDepartamentos',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            }, 
            body: json
        })
        if (req.ok){
            const resposta = await req.json()
            if(resposta.total === 0){
                alert('Sem registros')
            }

            
            document.getElementById('tabela').appendChild(montarTabela(resposta.departamentos))
        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}

//retornaCargosCadastrados
const retornaCargosCadastrados = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/retornaCargos',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            }, 
            body: json
        })
        if (req.ok){
            const resposta = await req.json()
            if(resposta.total === 0){
                alert('Sem registros')
            }

            
            document.getElementById('tabela').appendChild(montarTabela(resposta.cargos))
        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}


//requisicao que retorna os departamentos cadastrados de uma empresa que irao abastecer o select do cadastro de cargos
const retornaDepartamentosSelect = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/retornaDepartamentoSelect',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            }, 
            body: json
        })
        if (req.ok){
            const resposta = await req.json()
            
            abasteceSelect(resposta.retorno)
        }
    }catch(err){

    }
}