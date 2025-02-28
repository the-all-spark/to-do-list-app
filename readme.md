# To-Do List Application (HTML | CSS | JS)

[Switch to Russian | Переключиться на русский](./readme-ru.md)

## About the project
A list of tasks in To Do List format. You can add new items to the list, cross off completed tasks (with the ability to undo this action), and delete them. The number of uncompleted tasks is displayed at the bottom of the list.

**Tools:** 
![image](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white "Visual Studio Code")

**Stack:** 
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white "HTML") 
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white "CSS") 
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E "JS") 

**Demo:** [Link](https://the-all-spark.github.io/to-do-list-app/)   
<img src="./assets/app-screenshot.jpg" width="400" alt="App screenshot, start view">
<img src="./assets/delete_app-screenshot.jpg" width="400" alt="Delete and cross out an item, app screenshot">
<img src="./assets/add_app-screenshot.jpg" width="400" alt="Add an item, app screenshot">
<img src="./assets/new_item_app-screenshot.jpg" width="400" alt="New item, app screenshot">

## Realized functionality:
1. form for entering new list items; preparation of unnumbered list for outputting items using JS (HTML, CSS);
2. removal of a tooltip in the input field when clicking on it with the mouse cursor (`on focus`); appearance of a tooltip when clicking outside the field (`on blur`) (JS);
3. _adding_ items to the list (as well as to the array of items) when clicking on the "Add" button or pressing Enter (JS);
4. _crossing out_ the item when clicking on a line (the item is marked as completed) (JS);
5. _deleting_ the item (including from the array) when clicking on the basket (JS);
6. output statistics on the number of items left to be executed (statistics is recalculated when adding new items or deleting existing ones). If there are no items, "You have no tasks to do" is displayed. If 1 item remains, word "task" is displayed, for the other values word "tasks" is shown (JS).