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

//requisiscao de cadastro de colaborador via planiilha csv
const cadastraCSVColaborador = async (json) => {
    try{
        const requisicao = await fetch('http://localhost:3000/api/colaboradores',{
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


const cadastraCSVPergunta= async (json) => {
    try{
        const requisicao = await fetch('http://localhost:3000/api/cadastraPerguntas',{
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
                console.log(Error)
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

//cadastro manual de colaboradores
const cadastrarManualColaborador = async (event) => {
    event.preventDefault();
    let select = document.getElementById('selectCargoCol')
    let nome = document.getElementById('nomeColaborador').value
    let email = document.getElementById('emailColaborador').value
    let senha = document.getElementById('senhaPadrao').value
    let sexo = document.getElementById('sexoColaborador').value
    let idade = document.getElementById('idadeColaborador').value

    if(nome === ''){
        alert('Preencha o nome do Cargo')
    }else{
        const data = [{
            nomeColaborador: nome,
            cargoColaborador: select.value,
            emailColaborador: email,
            senhaColaboradorPadrao: senha,
            idadeColaborador: idade,
            sexoColaborador: sexo,
            idEmpresa: id
        }]

        let json = JSON.stringify(data)
        try{
            const requisicao = await fetch('http://localhost:3000/api/colaboradores',{
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

//requisicao que retorna os colaboradores cadastrados de uma empresa em uma tabela
const retornaColaboradoresCadastrados = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/retornaColaboradores',{
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

            
            document.getElementById('tabela').appendChild(montarTabela(resposta.colaboradores))
        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}


const retornaPerguntasCadastradas = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/retornaPerguntas',{
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

            
            document.getElementById('tabela').appendChild(montarTabela(resposta.perguntas))
        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}

const retornaSelectPerguntasCategoria = async(categoria) => {
    const data = {
        idEmpresa: id,
        idCategoria: categoria
    }

    try{
        const req = await fetch('http://localhost:3000/api/retornaPerguntasCategoria',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.ok){
            const resposta = await req.json()
            if(resposta.total === 0){
                alert('Sem registros')
            }
            abasteceSelectPerguntas(resposta.perguntas)
        }
    }catch(err){
        console.log(err);
    }
}

//requisicao que retorna os cargos cadastrados de uma empresa que irao abastecer o select do cadastro de colaboradores
const retornaCargoSelect = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/retornaCargoSelect',{
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

            
            abasteceSelect(resposta.cargos)
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


//requisicao que retorna as categorias das perguntas
const retornaCategoriaSelect = async () =>{
    try{
        const req = await fetch('http://localhost:3000/api/retornaCategoriaSelect',{
            method: 'GET'
        })
        if(req.ok){
            const resposta = await req.json()
            
            abasteceSelect(resposta.categorias)
        }
    }catch(err){
        console.log(err)
    }
}


//requisicao que cadastra perguntas
const cadastraManualPerguntas = async (event) =>{
    event.preventDefault();
    const pergunta = document.getElementById('pergunta');
    const categoria = document.getElementById('selectCategoria')

    if(pergunta.value  == ''){
        alert("Preencha a pergunta");
    }else if(categoria.value == ''){
        alert('Preencha a Categoria da Pergunta');
    }

    const data = [{
        dsPergunta: pergunta.value,
        notaPergunta: null,
        idEmpresa: id,
        idCategoria: categoria.value
    }]

    try{
        const req = await fetch('http://localhost:3000/api/cadastraPerguntas',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json' 
            },
            body: JSON.stringify(data)
        })
        if(req.ok){
            alert('Cadastro Realizado com Sucesso!')
            window.location.reload()
        }else{
            const errorData = await req.json();
            alert('Erro: ' + errorData.message);
        }
    }catch(err){
        console.log(err)
    }
}

//requisicao que cadastra questioanrios
const cadastraQuestionario = async (event) =>{
    let nome = document.getElementById('nomeQuestionario')
    const categoria = document.getElementById('selectCategoria')
    let p1 = document.getElementById('pergunta1')
    let p2 = document.getElementById('pergunta2');
    let p3 = document.getElementById('pergunta3');
    let p4 = document.getElementById('pergunta4');
    let p5 = document.getElementById('pergunta5');

    if(nome.value == ''){
        return alert('Insira o nome do questionario para cadastrar')
    }else{

        const data = {
            nomeQuestionario: nome.value,
            idEmpresa: id,
            idCategoria: categoria.value,
            idPergunta1: p1.value,
            idPergunta2: p2.value,
            idPergunta3: p3.value,
            idPergunta4: p4.value,
            idPergunta5: p5.value,
        }

        try{
            const req = await fetch('http://localhost:3000/api/cadastraQuestionario',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if(req.ok){
                alert('Cadastro realizado com sucesso')

            }else{
                const errorData = await req.json();
                alert('Erro: ' + errorData.message);
            }
        }catch(err){
            console.log(err)
        }
    }
}



const retornaQuestionariosCadastrados = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/retornaQuestionarios',{
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
            
            document.getElementById('tabela').appendChild(montarTabela(resposta.questionarios))
        }else{
            const errorData = await req.json();
            alert('Erro: ' + errorData.message)
        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}


const notasFuncionarios = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/notasFuncionarios',{
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
            geraGraficoFuncionarios(resposta.notas)
        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}


const notasDepartamento = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/notasDepartamento',{
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
            
            geraGraficoDepartamento(resposta.notas)
        }else{
            const errorData = await req.json();
            alert('Erro: ' + errorData.message)
        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}


const notaEmpresaGeral= async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/notaEmpresaGeral',{
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
            
             geraGraficoEmpresa(resposta.notas.nomeEmpresa, resposta.notas.mediaNotasEmpresa)
        }else{
            const errorData = await req.json();
            alert('Erro: ' + errorData.message)
        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}

const comentarios = async () =>{
    const data = {
        idEmpresa : id
    }
    
    let json = JSON.stringify(data)

    try{
        const req = await fetch('http://localhost:3000/api/comentarios',{
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
            
             exibeComentarios(resposta)
        }else{
            const errorData = await req.json();
            alert('Erro: ' + errorData.message)
        }
    }catch(err){
        alert('Erro de conexao')
        console.log(err)
    }
}