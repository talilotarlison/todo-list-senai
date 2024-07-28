
const form = document.querySelector('form');
const tarefas = document.querySelector('#taks-list');
const inputTexto = document.querySelector('input[type=text]');
const checkboxes = document.getElementsByName('checkbox-task');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Faça a validação ou processamento adicional aqui

    const formData = new FormData(form);
    let task = formData.get("task").trim(); // Responsavel por limpar string
    let id = Math.floor(Math.random() * 1000);

    if (task == "" || id == null) {
        mensagemErrorAlertaNaTela("O campo não pode ser vazio!Tente novamente.");
        return
    }

    let newTask = new Task(id, task);

    data.addDataTask(newTask);
    let allTasks = data.getAllTasks;

    limparCampoInput();
    listarTodasTarefasTela(allTasks);

});

let listarTodasTarefasTela = (tarefasDados) => {
    tarefas.innerHTML = "";

    if (tarefasDados == "") {
        const texto = "Não existe tarefas cadastradas!"; // Texto para o parágrafo
        const paragrafo = document.createElement("p"); // Cria o elemento <p>
        const textoNode = document.createTextNode(texto); // Cria um nó de texto com o conteúdo
        paragrafo.appendChild(textoNode); // Insere o texto no elemento <p>
        tarefas.appendChild(paragrafo); // Insere o parágrafo dentro da <div>
        return
    }

    tarefasDados.map((task) => {
        componenteTarefa({ id: task.id, tarefa: task.task, status: task.complete });
    })

    eventoEscultaBotoesDelete();
    eventoEscultaBotoesCheckbox(checkboxes)
}

// Class que guarda os dados das tarefas
class TaskData {
    tasks;
    constructor(tasks) {
        this.tasks = tasks;
    }

    addDataTask(task) {
        this.tasks.push(task);
    }

    get getAllTasks() {
        return this.tasks;
    }

    removeTodasTarefa() {
        while (this.tasks.length) {
            this.tasks.pop();
        }

    }

    atualizaDataTask(task) {
        this.tasks.push(task);
    }

}

// Classe que cria as tarefas
class Task {
    id;
    task;
    complete
    constructor(id, task, complete) {
        this.id = id;
        this.task = task;
        this.complete = complete || null;
    }

    get getId() {
        return this.id;
    }

    get getTask() {
        return this.task;
    }

    set setCompleteTask(status) {
        this.task = status;
    }
}

//Componente tarefas

let componenteTarefa = ({ id, tarefa, status }) => {
    let concluidoTarefaTexto = "";
    let concluidaTerefaCheckbox = "";
    if (status == true) {
        concluidoTarefaTexto = "active-checkbox";
        concluidaTerefaCheckbox = "checked"
    }

    tarefas.innerHTML += `<li class="task ${concluidoTarefaTexto}">
                            <input type="checkbox" name="checkbox-task" value=${id} ${concluidaTerefaCheckbox} >
                            <p>${tarefa}</p>
                            <button data-id=${id}>Remove</button>
                        </li>
                        `;
}

// Eventos de escuta dos botoes

let eventoEscultaBotoesDelete = () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        button.addEventListener('click', (evento) => {

            let idExcluir = evento.target.dataset.id;
            excluirTarefaSelecionada(idExcluir);
            removerAlertaTela("Tarefa deletada com sucesso!");
        });
    });
}


// Função excluir dados [Ativa] 

let excluirTarefaSelecionada = (id) => {
    let tarefasDisponiveis = data.getAllTasks.filter((task) => {
        return task.id != id;
    })

    data.removeTodasTarefa();

    tarefasDisponiveis.forEach((tarefa) => { data.atualizaDataTask(tarefa) });
    let allTasks = data.getAllTasks;
    listarTodasTarefasTela(allTasks);
}

// Erro de input 
let limparCampoInput = () => {
    inputTexto.value = "";
    inputTexto.focus();
}

// Modal de alerta erro
let mensagemErrorAlertaNaTela = (msg) => {
    Swal.fire({
        text: msg,
        icon: "error"
    });

    setTimeout(() => {
        inputTexto.style.borderColor = "black";
        inputTexto.focus();
    }, "3000");

    inputTexto.style.borderStyle = 'solid';
    inputTexto.style.borderColor = "red";

}

// Modal de alerta
let removerAlertaTela = (msg) => {
    Swal.fire({
        title: "Perfeito!",
        icon: "success",
        text: msg,
    });
}


// pegar dados id da tarefa selecionada como comluida
let eventoEscultaBotoesCheckbox = (checkboxes) => {
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
            concluirTarefaSelecionada(e.target.value);
        })
    })
}


let concluirTarefaSelecionada = (id) => {
    data.getAllTasks.filter((task) => {
        if (task.id == id) {
            task.complete = !task.complete;
            console.log(task.complete)
        }

        let allTasks = data.getAllTasks;
        listarTodasTarefasTela(allTasks);
    })
}

// Inicializa o banco de tarefas
let data = new TaskData([{ id: 31, task: "Felicidade" }, { id: 321, task: "Amor" }, { id: 331, task: "Paixao", complete: true }]);

// Inicializa as tarefas
let allTasks = data.getAllTasks;
listarTodasTarefasTela(allTasks);
