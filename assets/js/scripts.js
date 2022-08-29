import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


function removePatient(id) {
    const patients = JSON.parse(localStorage.getItem("patients"));

    const newPatients = patients.filter((patient) => {
        return patient.id !== id;
    });

    localStorage.setItem("patients", JSON.stringify(newPatients));
    renderPatients();
}

function renderPatients() {
    const storage = localStorage.getItem("patients");
    const patients = storage ? JSON.parse(storage) : [];
    const tbody = document.querySelector("#table-container table tbody");

    tbody.innerHTML = "";
    patients.forEach((patient) => {
        const tr = document.createElement("tr");
        const id = patient.id;

        tr.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.date}</td>
            <td>${patient.cpf}</td>
            <td>${patient.wpp}</td>
            <td>MANUTENÇÃO</td>
            <td>
                <a href="#" id="edit" class="text-success mx-1 editIcon" data-bs-toggle="modal" data-bs-target="#editPacienteModal"><i class="bi-pencil-square h4"></i></a>
                <a href="#" id="del${id}" class="text-danger mx-1 deleteIcon"><i class="bi bi-trash-fill h4"></i></a>
            </td>
        `;

        tbody.appendChild(tr);
        document.getElementById(`del${patient.id}`).addEventListener("click", ()=>{
            removePatient(patient.id);
            
        });
    });
}

document.addEventListener("DOMContentLoaded", renderPatients);

document.getElementById("add_paciente_form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name");
    const date = document.querySelector("#cpf");
    const cpf = document.querySelector("#cpf");
    const wpp = document.querySelector("#wpp");

    const NewPatient = {
        id: uuidv4(),
        name: name.value,
        date: date.value,
        cpf: cpf.value,
        wpp: wpp.value
    }

    const storage = localStorage.getItem("patients");
    const patients = storage ? JSON.parse(storage) : [];

    localStorage.setItem("patients", JSON.stringify([...patients, NewPatient]));
    if(patients.length > 0){
        alert("Cadastro Realizado!");
    }

    name.value = date.value = cpf.value = wpp.value = "";

    renderPatients();
});