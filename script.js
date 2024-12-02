window.addEventListener("load", list);

function list() {

    // массив объектов для пунктов списка (исходный)
    let listArr = [
        {id: 0, text: 'develop to-do-list app'},
        {id: 1, text: 'study English'},
        {id: 2, text: 'make cookies'},
    ];

    // элементы формы
    const form = document.querySelector(".add-new-task-form");
    const inputAddElem = document.querySelector(".form-input");
    const ulList = document.querySelector(".task-list"); 

    // * ---- Вывести пункты списка из массива listArr (для примера)
    listArr.forEach( (elem) => addElemToDOM(elem.id, elem.text) );

    // * ---- Показать изначальную статистику
    showStats(listArr.length);

    // * ----- Текст подсказки
    // очистить, если поле ввода в фокусе
    inputAddElem.addEventListener("focus", function() {
            inputAddElem.placeholder = "";
        }
    );
    
    // показать, если не в фокусе
    inputAddElem.addEventListener("blur", function() {
            inputAddElem.placeholder = "Add New Task";
        }
    );

    // * ----- Добавить новые пункты при нажатии на кнопку Add
    form.addEventListener("submit", function(event) {
            event.preventDefault(); // отменить перезагрузку страницы

            let itemId = String(Date.now()); // уникальное значение ID для элемента
            let itemText = inputAddElem.value; // введенное в поле значение

            //запуск функций добавления элемента в DOM и в массив
            addElemToArray(itemId, itemText);
            addElemToDOM(itemId, itemText);

            inputAddElem.value = ''; // очистить поле ввода
            //console.log(listArr);
        }
    );

    // * Функция добавления элемента в массив listArr: 
    // принимает id элемента и его содержимое (text), возвращает объект ключ:значение
    function addElemToArray(id, text) {
        listArr.push( {id, text} );
    }

    // * Функция добавления элемента в DOM: принимает id элемента и его содержимое (text):
    // возвращает пункт списка (элемент li) для каждого элемента массива,
    function addElemToDOM(id, text) {

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

        // получить количество пунктов для вывода статистики и запустить функцию
        let itemsToDo = countItemsForStats();
        showStats(itemsToDo);

        // на строку (тоггл + текст) вешаем обработчик 
        // запускается функция завершения задачи (вычеркивание) или отмены вычеркивания
        label.addEventListener("click", function () { 
            completeElem(li, divToggle, spanText) 
        });
    
        // на кнопку удаления вешаем обработчик - запуск функции удаления задачи из DOM и массива
        spanButton.addEventListener("click", function () { 
            deleteElem(li.dataset.id, li) 
        });  
    }

    // * Функция вычеркивания элемента при выполнении (или отмены операции вычеркивания):
    // принимает сам элемент (li), div (c тогглом) и текст заметки
    function completeElem(elem, toggle, text) {

        // добавить класс (если нет) или удалить (если есть)
        toggle.classList.toggle("toggle-completed"); 
        text.classList.toggle("item-completed");
        elem.classList.toggle("completed");

        // запуск функции подсчета невычеркнутых элементов
        let itemsToDo = countItemsForStats();
        showStats(itemsToDo);
    }

    // * Функция удаления элемента из DOM и массива: принимает id элемента и сам элемент
    function deleteElem(id, item) {

        //удалить из DOM
        item.remove();
        
        // удалить из массива: найти элемент в массиве через его id, а затем его индекс в массиве
        let elem = listArr.find( (elem) => elem.id === id );
        let index = listArr.indexOf(elem);
        listArr.splice(index, 1); // начиная с определенного индекса, удалить 1 элемент

        // запуск функции подсчета невычеркнутых элементов
        let itemsToDo = countItemsForStats();
        showStats(itemsToDo);
    }

    // * Функция подсчета количества невычеркнутых (невыполненных) элементов
    function countItemsForStats() {
        
        // общее количество элементов
        let liItems = document.getElementsByClassName("task-list-item");

        // количество элементов с классом "completed"
        let count = 0;
        for (let i = 0; i < liItems.length; i++) {
            if (liItems[i].classList.contains("completed")) {
                count++;
            }
        }

        // оставшиеся элементы - это невыполненные пункты списка
        return liItems.length - count;
    }

    // * Функция сбора и вывода статистики внизу списка: 
    // принимает длину массива элементов списка, добавляет текст в блоки
    function showStats(amountOfItems) {
        removeOldStats();

        // значение
        let statBlock = document.querySelector(".stat-number");
        let statNumber = getStatNumber(amountOfItems); // вызов функции
        statBlock.prepend(statNumber);

        // окончание слова task
        let endingBlock = document.querySelector(".ending");
        let wordEnding = getWordEnding(amountOfItems); // вызов функции
        endingBlock.textContent = wordEnding;
    }
    
    // возвращает число для статистики
    function getStatNumber(amountOfItems) { 
        return (amountOfItems === 0) ? "no" : amountOfItems;
    }

    // возвращает окончание слова "task" (ед. или мн. число)
    function getWordEnding(amountOfItems) {
        return (amountOfItems === 1) ? "" : "s";
    }

    // * Функция удаления устаревшей статистики
    function removeOldStats() {
        document.querySelector(".stat-number").textContent = "";  
    }

}