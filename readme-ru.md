# To-Do List, приложение со списком задач (HTML | CSS | JS)

[Переключиться на английский | Switch to English](./readme.md)

## О проекте

**Инструменты:** 
![image](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white "Visual Studio Code")

**Языки:** 
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white "HTML") 
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white "CSS") 
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E "JS") 

**Демо:** [Перейти на сайт](https://the-all-spark.github.io/to-do-list-app/) 
![screenshot](./assets/app-screenshot.jpg "Скриншот приложения")

## Реализованный функционал:
1. форма для ввода новых пунктов списка; заготовка ненумерованного списка для вывода пунктов средствами JS (HTML, CSS);
2. удаление подсказки в поле ввода при клике по нему курсором мышки (`on focus`); появление подсказки при клике вне поля (`on blur`) (JS);
3. _добавление_ пунктов в список (а также в массив элементов) при клике на кнопку "Add" или нажатии Enter (JS);
4. _вычеркивание_ пункта при клике на строке (элемент помечается как выполненный) (JS);
5. _удаление_ пункта (в том числе из массива) при клике на корзинку (JS);
6. вывод статистики по количеству пунктов, которые осталось выполнить (пересчитывается при добавлении новых пунктов или удалении имеющихся). Если пункты отсутствуют, выводится "You have no tasks to do". Если остается 1 пункт, выводится "task", для остальных значений - "tasks" (JS).