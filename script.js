window.addEventListener("load", list);

function list() {
    console.log("Запуск!");

    let addElemInput = document.querySelector(".form-input");
    console.log(addElemInput);




    //скрыть текст подсказки если поле ввода в фокусе
    addElemInput.onfocus = function(){
        addElemInput.placeholder = "";
    }


}