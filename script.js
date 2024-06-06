window.addEventListener("load", list);

function list() {
    console.log("Запуск!");

    // массив для пунктов списка
    let listArr = [];

    //элементы формы
    const form = document.querySelector(".add-new-task-form");
    const inputAddElem = document.querySelector(".form-input");
    const ulList = document.querySelector(".task-list"); 

    console.log(form);
    console.log(inputAddElem);
    console.log(ulList);
    console.log(listArr);

    //очистить текст подсказки, если поле ввода в фокусе
    inputAddElem.onfocus = function(){
        inputAddElem.placeholder = "";
    }
    // показать текст подсказки, если не в фокусе
    inputAddElem.onblur = function(){
        inputAddElem.placeholder = "Add New Task";
    }

    // при нажатии на кнопку Add -> запуск функций добавления элемента в DOM и в массив
    form.onsubmit = function(event) {
        event.preventDefault(); // убрать перезагрузку страницы (установлена по умолчанию)
        let itemId = String(Date.now()); // уникальное значение ID для элемента
        let itemText = inputAddElem.value; // введенное значение

        console.log(itemId);
        console.log(itemText);

        //запуск функций добавления элемента в DOM и в массив
        addItemToDOM(itemId, itemText);
        addItemToArray(itemId, itemText);

        inputAddElem.value = ''; // очистить поле ввода
    }

    // функция добавления элемента в DOM
    function addItemToDOM(id, text) {

        // создать элемент li
        let li = document.createElement('li');
        li.className = "task-list-item";
        li.setAttribute("data-id", id);
        ulList.prepend(li);

        // создать вложенный в li элемент label
        let label = document.createElement('label');
        label.className = "task-list-item-label";
        li.prepend(label);

        // создать вложенный в label элемент div (c тогглом)
        let div = document.createElement('div');
        div.className = "task-list-item-toggle";
        label.prepend(div);

        // создать вложенный в label элемент span (с текстом заметки)
        let spanText = document.createElement('span');
        spanText.textContent = text;
        label.append(spanText);

        // создать вложенный в li элемент span (с кнопкой Удалить)
        let spanButton = document.createElement('span');
        spanButton.className = "delete-btn";
        spanButton.setAttribute("title", "Delete Task");
        li.append(spanButton);

        console.log(li);
    }


    // функция добавления элемента в массив listArr
    /*function addItemToArray() {
            
    }*/

    console.log(listArr);

}