

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

//cadastro de colaborador via planilha csv
function csvtoJsonColaborador(csv, idEmpresa){

    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(';');
    

    for (let i = 1; i < lines.length; i++) {
        if(i == 1  && lines[i] == ""){
            alert('Preencha a planilha com algum dado apos o cabeçalho')
        }else if (lines[i] == ""){
            let json = JSON.stringify(result);
            cadastraCSVColaborador(json);
            return;
        }
        const obj = {};
        const currentLine = lines[i].split(';');

        for (let j = 0; j<headers.length; j++){
            obj[headers[j]] = currentLine[j];
        }
        

        obj['idEmpresa'] = idEmpresa;

        result.push(obj);
    }
}

function csvtoJsonPergunta(csv, idEmpresa){

    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(';');
    

    for (let i = 1; i < lines.length; i++) {
        if(i == 1  && lines[i] == ""){
            alert('Preencha a planilha com algum dado apos o cabeçalho')
        }else if (lines[i] == ""){
            let json = JSON.stringify(result);
            cadastraCSVPergunta(json);
            return;
        }
        const obj = {};
        const currentLine = lines[i].split(';');

        for (let j = 0; j<headers.length; j++){
            obj[headers[j]] = currentLine[j];
        }
        

        obj['idEmpresa'] = idEmpresa;

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
//essa funcao é  muito pica na moral
function abasteceSelect(retorno){
    const departamentosSelect = document.querySelector('select')

    retorno.forEach(valor =>{
        const opcao = document.createElement('option')
        opcao.value = valor.Id;
        const campo = Object.keys(valor).filter(key => key !== "Id")
        opcao.text = valor[campo[0]];
        departamentosSelect.appendChild(opcao)

    })
}

let perguntas 
function abasteceSelectPerguntas(retorno){

    perguntas = retorno;
    const select1 = document.getElementById('pergunta1')

    retorno.forEach(valor =>{
        const opcao = document.createElement('option')
        opcao.value = valor.Id;
        const campo = Object.keys(valor).filter(key => key !== "Id")
        opcao.text = valor[campo[0]];
        select1.appendChild(opcao)

    })
}

function abasteceSelect3(json, select){
    json.forEach(valor =>{
        const opcao = document.createElement('option')
        opcao.value = valor.Id;
        const campo = Object.keys(valor).filter(key => key !== "Id")
        opcao.text = valor[campo[0]];
        select.appendChild(opcao)

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


const criaCard = () => {
    const contentDiv = document.getElementById('realizarCadastro');
    contentDiv.innerHTML = `
            <div id="cardCadastro" class="left">
                <div style="margin: 20px;">
                    <h2 id="tituloCard">Cadastro Questionário</h2>
                </div>
                <div style="display: flex; justify-content: center; width: 100%;">
                    <div style="display: flex; flex-direction: column; align-items: center; width: 200%;">
                        <div id="bgSelect" style="width: 100%;">
                            <input id="nomeQuestionario" placeholder="Nome Questionario" style="width: 80%;"/>
                        </div>
                        <div id="bgSelect" style="width: 90%;">
                            <select class="select" id="pergunta1" style="width: 100%;">
                                <option value="" selected>Selecione...</option>
                            </select>
                        </div>
                        <div id="bgSelect" style="width: 90%;">
                            <select class="select" id="pergunta2" style="width: 100%;" disabled>
                                <option value="" selected>Selecione...</option>
                            </select>
                        </div>
                        <div id="bgSelect" style="width: 90%;">
                            <select class="select" id="pergunta3" style="width: 100%;" disabled>
                                <option value="" selected>Selecione...</option>
                            </select>
                        </div>
                        <div id="bgSelect" style="width: 90%;">
                            <select class="select" id="pergunta4" style="width: 100%;" disabled>
                                <option value="" selected>Selecione...</option>
                            </select>
                        </div>
                        <div id="bgSelect" style="width: 90%;">
                            <select class="select" id="pergunta5" style="width: 100%;" disabled>
                                <option value="" selected>Selecione...</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div style="display: flex; justify-content: center; margin: 5px;">
                    <button id="cadForm" type="button" onclick="cadastraQuestionario(event)" style="width: 100%" class="button-disabled">Cadastrar</button>
                    <button id="restart" type="button" onclick="reiniciaForm(event)" style="width: 100%" class="button-disabled" title="Reiniciar Formulario"><img src="../assets/img/8678658_restart_line_icon.png"></img></button>
                </div>
            </div>
    `;




    let p1 = document.getElementById('pergunta1');
    let p2 = document.getElementById('pergunta2');
    let p3 = document.getElementById('pergunta3');
    let p4 = document.getElementById('pergunta4');
    let p5 = document.getElementById('pergunta5');
    let jsonsempergunta;
    let restart = document.getElementById('restart');

    
    p1.addEventListener('change', function(){
       
        const idParaRemover = parseInt(p1.value, 10);


         jsonsempergunta = perguntas.filter(pergunta => pergunta.Id !== idParaRemover);
        abasteceSelect3(jsonsempergunta, p2);
        p2.removeAttribute('disabled');
        restart.classList.remove('button-disabled');
        
    })
    p2.addEventListener('change', function(){
       
        const idParaRemover = parseInt(p2.value, 10);


         jsonsempergunta = jsonsempergunta.filter(pergunta => pergunta.Id !== idParaRemover);
        abasteceSelect3(jsonsempergunta, p3);
        p3.removeAttribute('disabled');
        
    })
    p3.addEventListener('change', function(){
       
        const idParaRemover = parseInt(p3.value, 10);


         jsonsempergunta = jsonsempergunta.filter(pergunta => pergunta.Id !== idParaRemover);
        abasteceSelect3(jsonsempergunta, p4);
        p4.removeAttribute('disabled');
        
    })
    p4.addEventListener('change', function(){
       
        const idParaRemover = parseInt(p4.value, 10);


         jsonsempergunta = jsonsempergunta.filter(pergunta => pergunta.Id !== idParaRemover);
        abasteceSelect3(jsonsempergunta, p5);
        p5.removeAttribute('disabled');
        
    })
    p5.addEventListener('change', function(){
        document.getElementById('cadForm').removeAttribute('disabled')
        document.getElementById('cadForm').classList.remove('button-disabled');
    })


}


const reiniciaForm = (event) =>{
    event.preventDefault();
    document.getElementById('nomeQuestionario').value = ''
    document.getElementById('pergunta1').value = ""
    document.getElementById('pergunta2').value = ""
    document.getElementById('pergunta3').value = ""
    document.getElementById('pergunta4').value = ""
    document.getElementById('pergunta5').value = ""

    document.getElementById('cadForm').classList.add('button-disabled');
    document.getElementById('restart').classList.add('button-disabled');
    document.getElementById('pergunta2').setAttribute('disabled', true);
}


 
