const parametros = new URLSearchParams(window.location.search);

const id = parametros.get('idEmpresa')

function montarTabela(json) {

    var table = document.createElement("table");
    table.setAttribute("border", "1");

    var header = table.createTHead();
    var row = header.insertRow();
    var idHeader = row.insertCell();
    var departamentoHeader = row.insertCell();
    var responsavelHeader = row.insertCell();
    idHeader.innerHTML = "<b>Id</b>";
    departamentoHeader.innerHTML = "<b>Departamento</b>";
    responsavelHeader.innerHTML = "<b>Responsável</b>";

    var tbody = document.createElement("tbody");
    json.forEach(function (departamento) {
        var row = tbody.insertRow();
        var idCell = row.insertCell();
        var departamentoCell = row.insertCell();
        var responsavelCell = row.insertCell();
        idCell.textContent = departamento.Id;
        departamentoCell.textContent = departamento.Departamento;
        responsavelCell.textContent = departamento.Responsavel || "Nenhum";
    });


    table.appendChild(tbody);

    return table;
}


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


function verificaParametrosTela (params){
    let cargo = document.getElementById('cg');
    let colaborador = document.getElementById('cl');
    let pergunta = document.getElementById('p');
    let formulario = document.getElementById('fr');

    let btnFrm = document.getElementById('btnFrm');


    if(params.quantd == 0){
        cargo.setAttribute('hidden', true);
        colaborador.setAttribute('hidden', true);
        pergunta.setAttribute('hidden',true)
        formulario.setAttribute('hidden', true)
        btnFrm.onclick = alertCadastre;
    }else if(params.quantcg == 0){
        colaborador.setAttribute('hidden', true);
        pergunta.setAttribute('hidden',true)
        formulario.setAttribute('hidden', true)
        btnFrm.onclick = alertCadastre;
    }if(params.quantcl == 0){
        pergunta.setAttribute('hidden',true)
        formulario.setAttribute('hidden', true)
        btnFrm.onclick = alertCadastre;
    }else if(params.quantpg == 0){
        formulario.setAttribute('hidden', true)
    }
    
}


function alertCadastre(){

        alert('Conclua o processo de cadastro dos Setores e Colaboradores primeiro!')

}