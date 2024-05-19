

//funções de tela
//verifica os parametros das telas de acordo com dados vindos do banco para disponibilizar (ou noa) as telas
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

//converte arquivo csv em json para mandar pra api
//cadastro de departamento
function csvtoJSON(csv, idEmpresa) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        if(i == 1  && lines[i] == ""){
            alert('Preencha a planilha com algum dado apos o cabeçalho')
        }else if (lines[i] == ""){
            let json = JSON.stringify(result);
            cadastraCSV(json);
            return;
        }
        const obj = {};
        const currentLine = lines[i].split(',');

        obj[headers] = currentLine[0];

        obj['idEmpresa'] = idEmpresa;

        result.push(obj);
    }
}

//cadastro de cargo
function csvtoJsonCargo(csv, idEmpresa, idDepartamento){

    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        if(i == 1  && lines[i] == ""){
            alert('Preencha a planilha com algum dado apos o cabeçalho')
        }else if (lines[i] == ""){
            let json = JSON.stringify(result);
            cadastraCSVCargo(json);
            return;
        }
        const obj = {};
        const currentLine = lines[i].split(',');

        obj[headers] = currentLine[0];

        obj['idEmpresa'] = idEmpresa;

        obj['idDepartamento'] = idDepartamento

        result.push(obj);
    }
}

//monta tabela html a partir do json
function montarTabela(json) {
    var table = document.createElement("table");
    table.setAttribute("border", "1");

    var header = table.createTHead();
    var row = header.insertRow();

    // Extrai as chaves do primeiro objeto do JSON
    var keys = Object.keys(json[0]);
    keys.forEach(function (key) {
        var cell = row.insertCell();
        cell.innerHTML = `<b>${key}</b>`;
    });

    var tbody = document.createElement("tbody");
    json.forEach(function (item) {
        var row = tbody.insertRow();
        keys.forEach(function (key) {
            var cell = row.insertCell();
            cell.textContent = item[key] || "Nenhum";
        });
    });

    table.appendChild(tbody);

    return table;
}



function escondeDivs(){
    let manual = document.getElementById('cardCadastro')
    let csv = document.getElementById('cardCadastroCsv')
    manual.style.display = "none";
    csv.style.display = "none";

}
function abasteceSelect(retorno){
    const departamentosSelect = document.getElementById('selectIdDept')

    retorno.forEach(departamento =>{
        const opcao = document.createElement('option')
        opcao.value = departamento.idDepartamento;
        opcao.text = departamento.nomeDepartamento;
        departamentosSelect.appendChild(opcao)

    })
}

function alertCadastre(){

    alert('Conclua o processo de cadastro dos Setores e Colaboradores primeiro!')

}

function home(){
    window.location.href = `/views/empresaHome.html?idEmpresa=${id}`;
}

function sair() {
    window.location.href = 'login.html'
}