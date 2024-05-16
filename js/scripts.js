
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