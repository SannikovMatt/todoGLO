'use strict';
let todoData = localStorage.getItem('user');
todoData = JSON.parse(todoData);


const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');


console.log(todoData);

if (todoData === null) {
     todoData =new Array();
}




function Task(task) {
    if (task) {
        this.value = task;
    } else { this.value = ''; }

    this.complited = false;

}

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {



        let task = document.createElement('li');
        task.classList.add('todo-item');

        task.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.complited) {
            todoCompleted.append(task);
        } else {
            todoList.append(task);

        }

        task.querySelector('.todo-remove').addEventListener('click', function () {

            task.remove();
            let ind = todoData.indexOf(item);
            todoData.splice(ind, 1);
            render();



        });
        task.querySelector('.todo-complete').addEventListener('click', function () {

            item.complited = !item.complited;
            render();

        });

    });

    let stringJson = JSON.stringify(todoData);
    localStorage.setItem('user', stringJson);

};

todoControl.addEventListener('submit', function (e) {

    e.preventDefault();

    if (headerInput.value) {
        let task = new Task(headerInput.value);

        todoData.push(task);
        headerInput.value = '';
        render();
    }

});








render();