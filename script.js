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

        //console.log(form);
        //console.log(inputAddElem);
        //console.log(ulList);
        //console.log(listArr);

    //показать изначальную статистику
    let statNumber = document.querySelector(".stat-number");
    showStat(listArr.length); 

    // вывести пункты списка из массива listArr (для примера)
    listArr.forEach(function(elem) {
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

    // при нажатии на кнопку Add -> запуск функций добавления элемента в DOM, и в массив
    form.onsubmit = function(event) {
        event.preventDefault(); // отменить перезагрузку страницы (установлена по умолчанию)
        let itemId = String(Date.now()); // уникальное значение ID для элемента
        let itemText = inputAddElem.value; // введенное в поле значение

            //console.log(itemId);
            //console.log(itemText);

        //запуск функций добавления элемента в DOM, и в массив
        addItemToArray(itemId, itemText);
        addItemToDOM(itemId, itemText);

        inputAddElem.value = ''; // очистить поле ввода
    }

    // функция добавления элемента в массив listArr: принимает id элемента и его содержимое (text)
    function addItemToArray(id, text) {
        listArr.push({id, text});
        //console.log(listArr);

    }

    // функция добавления элемента в DOM: принимает id элемента и его содержимое (text)
    // возвращает пункт списка (элемент li) для каждого элемента массива
    // также запускает функцию подсчета статистики
    function addItemToDOM(id, text) {

        //console.log(listArr);

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

            //console.log(li);
            //console.log(li.dataset.id);
            //console.log(divToggle);
            //console.log(spanText);

        // получить количество пунктов для вывода статистики
        countItemsForStats();

        // на строку (тоггл + текст) вешаем обработчик - запускается функция завершения задачи (вычеркивание) или отмены  вычеркивания
        label.addEventListener("click", function () { completeElem(li, divToggle, spanText) });
    
        // на кнопку удаления вешаем обработчик - запуск функции удаления задачи из DOM и массива
        spanButton.addEventListener("click", function () { deleteElem(li.dataset.id, li) });
        
    }

    // функция вычеркивания элемента при выполнении (или отмены операции вычеркивания)
    // принимает сам элемент (li), div (c тогглом) и текст заметки
    function completeElem(elem, toggle, text) {
            //console.log(toggle);
            //console.log(text);
            //console.log(elem);

        toggle.classList.toggle("toggle-completed"); // добавить класс тогглу (если нет) или удалить (если есть)
        text.classList.toggle("item-completed"); // добавить класс тексту с заметкой (если нет) или удалить (если есть)
        elem.classList.toggle("completed");

        // запуск функции подсчета невычеркнутых элементов
        countItemsForStats();
    }

    // функция удаления элемента из DOM и массива
    // принимает id элемента и сам элемент
    function deleteElem(id, item) {

        //удалить из DOM
        item.remove();
        
        // удалить из массива: найти элемент в массиве через его id, а затем его индекс в массиве
        let elem = listArr.find(elem => elem.id == id);
            //console.log(elem);

        let index = listArr.indexOf(elem);
            //console.log(index);

        // начиная с определенного индекса, удалить 1 элемент
        listArr.splice(index, 1);
            //console.log(listArr); // результирующий массив

        countItemsForStats();

    }

    // функция подсчета количества невычеркнутых (не выполненных) элементов
    function countItemsForStats() {
        
        // общее количество элементов
        let elems = document.getElementsByClassName("task-list-item");
            //console.log(elems);  // элементы списка
            //console.log(elems.length);  // количество элементов списка

        // количество элементов с классом "completed"
        let count = 0;
        for(let i = 0; i < elems.length; i++) {
            if(elems[i].classList.contains("completed")) {
                count++;
            }
        }
            //console.log(count); // количество выполненных пунктов

        // оставшиеся элементы - это невыполненные пункты списка
        let itemsToDo = elems.length - count;
            //console.log(itemsToDo); // количество НЕвыполненных пунктов

        removeOldStat();
        showStat(itemsToDo);

    }

    //функция удаления устаревшей статистики
    function removeOldStat() {
        statNumber.textContent = "";  
    }

    // функция вывода статистики внизу списка: принимает длину массива элементов списка
    function showStat(amountOfItems) {  
        if(amountOfItems == 0) {
            amountOfItems = "no";
        }
        statNumber.prepend(amountOfItems);
    }

}