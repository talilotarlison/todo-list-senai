
const form = document.querySelector('form');
const tarefas = document.querySelector('#taks-list');
const input = document.querySelector('input[type=text]');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // faça a validação ou processamento adicional aqui

    const formData = new FormData(form);
    let task = formData.get("task");
    let id = Math.floor(Math.random() * 1000);

    if (task == "" || id == null) {
        errorAlert("O campo não pode ser vazio!Tente novamente.");
        return
    }

    let newTask = new Task(id, task);
    //console.log(newTask);

    data.addTask(newTask);
    let allTasks = data.getTasks();
    //console.log(data.getTasks());

    limaCampo();
    listaDados(allTasks);

});

let listaDados = (tarefasDados) => {
    tarefas.innerHTML = "";

    if (tarefasDados == "") {
        var texto = "Não existe tarefas cadastradas!"; // Texto para o parágrafo
        var paragrafo = document.createElement("p"); // Cria o elemento <p>
        var textoNode = document.createTextNode(texto); // Cria um nó de texto com o conteúdo
        paragrafo.appendChild(textoNode); // Insere o texto no elemento <p>

        tarefas.appendChild(paragrafo); // Insere o parágrafo dentro da <div>
        return
    }

    tarefasDados.map((task) => {
        componenteTask({ id: task.id, tarefa: task.task });
    })

    eventoBotoes();
}

// class que guarda os dados das tarefas
class TaskData {
    tasks;
    constructor(tasks) {
        this.tasks = tasks;
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
    limpaTasks() {
        this.tasks = [];
    }

}

// classe que cria as tarefas
class Task {
    id;
    task;
    constructor(id, task) {
        this.id = id;
        this.task = task;
    }

    get getId() {
        return this.id;
    }
    get getTask() {
        return this.task;
    }
}

//componente tarefas

let componenteTask = ({ id, tarefa }) => {
    tarefas.innerHTML += `<div class="task" data-idfsui=${id} >
                            <p>${tarefa}</p>
                            <button data-id=${id}>Remove</button>
                        </div>
                        `;
}

// eventos de escuta btns
// https://cursos.alura.com.br/forum/topico-duvida-diferenca-entre-pegar-o-target-do-evento-e-o-proprio-elemento-252118

let eventoBotoes = () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        button.addEventListener('click', (evento) => {

            let idExcluir = evento.target.dataset.id;
            exluirDados(idExcluir);
            removerAlert("Tarefa deletada com sucesso!");
        });
    });
}

// função exluir dados opt1
let exluirDadosFinal = (id) => {

    let filtro = data.getTasks();
    data.limpaTasks();

    filtro.filter((task) => {
        if (task.id != id) {
            data.addTask(task);
            //console.log(task);
        }
    })

    //console.log(filtro);

    listaDados(data.getTasks());

    //console.log(data.getTasks());
}


// [Ativa] função excluir dados opt2 

let exluirDados = (id) => {
    let filtro = data.getTasks().filter((task) => {
        return task.id != id;
    })

    console.log(filtro);
    //data.limpaTasks();

    data.limpaTasks();
    filtro.forEach((tarefa) => { data.addTask(tarefa) });
    let allTasks = data.getTasks();
    listaDados(allTasks);

    //console.log(data.getTasks());
}

// erro de input 
let limaCampo = () => {
    input.value = "";
    input.focus();
}

// modal de alerta erro
let errorAlert = (msg) => {
    Swal.fire({
        text: msg,
        icon: "error"
    });

    setTimeout(() => {
        input.style.borderColor = "black";
        input.focus();
    }, "3000");

    input.style.borderStyle = 'solid';
    input.style.borderColor = "red";

}
// modal de alerta
let removerAlert = (msg) => {
    Swal.fire({
        title: "Perfeito!",
        icon: "success",
        text: msg,
    });
}

// inicializa o banco de tarefas
let data = new TaskData([{ id: 31, task: "Felicidade" }, { id: 321, task: "Amor" }, { id: 331, task: "Paixao" }]);

// inicializa as tarefas
let allTasks = data.getTasks();
listaDados(allTasks);
