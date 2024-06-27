window.addEventListener("load", list);

function list() {

    // массив для пунктов списка (исходный)
    let listArr = [
        {id: 0, text: 'develop to-do-list app'},
        {id: 1, text: 'study English'},
        {id: 2, text: 'make cookies'},
    ];

    //элементы формы
    const form = document.querySelector(".add-new-task-form");
    const inputAddElem = document.querySelector(".form-input");
    const ulList = document.querySelector(".task-list"); 

    //показать статистику
    let statNumber = document.querySelector(".stat-number");
    showStat(listArr.length);

                console.log(form);
                console.log(inputAddElem);
                console.log(ulList); // исходный массив
                console.log(listArr);

    // вывести пункты списка из массива listArr (для примера)
    listArr.forEach(function(elem) {
                console.log(elem);
        addItemToDOM(elem.id, elem.text);
    });

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
        event.preventDefault(); // отменить перезагрузку страницы (установлена по умолчанию)
        let itemId = String(Date.now()); // уникальное значение ID для элемента
        let itemText = inputAddElem.value; // введенное в поле значение

                //console.log(itemId);
                //console.log(itemText);

        //запуск функций добавления элемента в DOM и в массив
        addItemToDOM(itemId, itemText);
        addItemToArray(itemId, itemText);

        inputAddElem.value = ''; // очистить поле ввода
    }

    // функция добавления элемента в DOM: принимает id элемента и его содержимое (text)
    // возвращает пункт списка (элемент li) для каждого элемента массива
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
        let divToggle = document.createElement('div');
        divToggle.className = "task-list-item-toggle";
        label.prepend(divToggle);

        // создать вложенный в label элемент span (с текстом заметки)
        let spanText = document.createElement('span');
        spanText.className = "item-text";
        spanText.textContent = text;
        label.append(spanText);

        // создать вложенный в li элемент span (с кнопкой Удалить)
        let spanButton = document.createElement('span');
        spanButton.className = "delete-btn";
        spanButton.setAttribute("title", "Delete Task");
        li.append(spanButton);

                console.log(li);

                console.log(li.dataset.id);
                console.log(divToggle);
                console.log(spanText);

        // на строку (тоггл + текст) вешаем обработчик - при клике запускается функция завершения задачи 
        label.addEventListener("click", function () { completeElem(label, li.dataset.id, divToggle, spanText) });
        //label.addEventListener("click", completeElem);
    }

    // функция добавления элемента в массив listArr: принимает id элемента и его содержимое (text)
    function addItemToArray(id, text) {
        listArr.push({id, text});
                // console.log(listArr);
                // console.log(listArr.length);
        removeOldStat();
        showStat(listArr.length);
    }

    //функция удаления устаревшей статистики
    function removeOldStat() {
        statNumber.textContent = "";  
    }

    // функция вывода статистики внизу списка: принимает длину массива элементов списка
    function showStat(itemNum) {
        statNumber.prepend(itemNum);
    }

    // вычеркнуть элемент при выполнении
    function completeElem(item, id, toggle, text) {
        console.log("Вычеркиваем!");
        console.log(item);
        console.log(id);
        console.log(toggle);
        console.log(text);

        toggle.classList.add("toggle-completed"); //добавить класс тогглу
        text.classList.add("item-completed"); // добавить класс тексту с заметкой


    }

    
    

}