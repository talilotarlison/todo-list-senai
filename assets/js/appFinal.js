
const form = document.querySelector('form');
const tarefas = document.querySelector('#taks-list');
const inputTexto = document.querySelector('input[type=text]');
const checkboxes = document.getElementsByName('checkbox-task');

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

// objeto literal 
class TarefasEstados {

    // metodo excluir dados 
    excluirTarefaSelecionada(id) {
        let tarefasDisponiveis = data.getAllTasks.filter((task) => {
            return task.id != id;
        })

        data.removeTodasTarefa();

        tarefasDisponiveis.forEach((tarefa) => { data.atualizaDataTask(tarefa) });
        let allTasks = data.getAllTasks;
        Tarefas.listarTodasTarefasTela(allTasks);
    }

    // metodo concluir dados 
    concluirTarefaSelecionada(id) {
        data.getAllTasks.filter((task) => {
            if (task.id == id) {
                task.complete = !task.complete;
                console.log(task.complete)
            }

            let allTasks = data.getAllTasks;
            Tarefas.listarTodasTarefasTela(allTasks);
        })
    }

    listarTodasTarefasTela(tarefasDados) {
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
            Tarefas.criaTemplateTarefa({ id: task.id, tarefa: task.task, status: task.complete });
        })

        EventosTarefas.eventoEscultaBotoesDelete();
        EventosTarefas.eventoEscultaBotoesCheckbox(checkboxes)
    }

    //Componente tarefas

    criaTemplateTarefa({ id, tarefa, status }) {
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
}

// eventos da aplicação
class Eventos {

    // Eventos de escuta dos botoes

    eventoEscultaBotoesDelete() {
        const buttons = document.querySelectorAll('button');

        buttons.forEach((button) => {
            button.addEventListener('click', (evento) => {

                let idExcluir = evento.target.dataset.id;
                Tarefas.excluirTarefaSelecionada(idExcluir);
                EventosTarefas.removerAlertaTela("Tarefa deletada com sucesso!");
            });
        });
    }

    // pegar dados id da tarefa selecionada como comluida
    eventoEscultaBotoesCheckbox(checkboxes) {
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", (e) => {
                Tarefas.concluirTarefaSelecionada(e.target.value);
            })
        })
    }

    // Modal de alerta erro
    mensagemErrorAlertaNaTela(msg) {
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
    // Erro de input 
    limparCampoInput() {
        inputTexto.value = "";
        inputTexto.focus();
    }
    // Modal de alerta
    removerAlertaTela(msg) {
        Swal.fire({
            title: "Perfeito!",
            icon: "success",
            text: msg,
        });
    }

}

function adicionaNovaTarefa() {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Faça a validação ou processamento adicional aqui

        const formData = new FormData(form);
        let task = formData.get("task").trim(); // Responsavel por limpar string
        let id = Math.floor(Math.random() * 1000);

        if (task == "" || id == null) {
            EventosTarefas.mensagemErrorAlertaNaTela("O campo não pode ser vazio!Tente novamente.");
            return
        }

        let newTask = new Task(id, task);

        data.addDataTask(newTask);
        let allTasks = data.getAllTasks;

        EventosTarefas.limparCampoInput();
        Tarefas.listarTodasTarefasTela(allTasks);

    });

}

// Inicializa o banco de tarefas
let data = new TaskData([{ id: 31, task: "Felicidade" }, { id: 321, task: "Amor" }, { id: 331, task: "Paixao", complete: true }]);

let EventosTarefas = new Eventos();
let Tarefas = new TarefasEstados;

// Inicializa as tarefas
let allTasks = data.getAllTasks;
Tarefas.listarTodasTarefasTela(allTasks);

adicionaNovaTarefa();
