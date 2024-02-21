import render from './render.js'
import store from './store.js'
import { addTodo,deleteTodo,CheckTodo,editTodo } from './store.js';

window.addEventListener("todoschange",()=>{
    render();
})

const storeFromLocalStorage=JSON.parse(localStorage.getItem("store"));
if(storeFromLocalStorage?.todos.length > 0){
  store.todos=storeFromLocalStorage.todos;
}else{ 
  localStorage.setItem("store", JSON.stringify(store));
  render();
} 

// form get
 
const form=document.querySelector("#form");
const todoTitleInput=document.querySelector('.todo-title-input');

form.addEventListener("submit",(e)=>{
 e.preventDefault();
 const todoTitle=todoTitleInput.value;
 if(todoTitle!=''){
  const newTodo={
    id :crypto.randomUUID(),
    title:todoTitle,
    completed: false            
  };
  addTodo(newTodo);
  todoTitleInput.value='';
 }
})

const todos=document.querySelector(".todos");
todos.addEventListener('click',(e)=>{
  let target=e.target;
  if(target.classList.contains("delete-todo-button")){
    const li=target.closest('.todo').dataset.id;
    deleteTodo(li)
  };
}) 

        // can use click event also
        
todos.addEventListener('change',(e)=>{
  let target=e.target;
  if(target.classList.contains("todo-checkbox")){
    const li=target.closest('.todo').dataset.id;
    CheckTodo(li)
  };
}) 

todos.addEventListener('click',(e)=>{
  let target=e.target;
  if(target.classList.contains("edit-todo-button")){
    const li=target.closest('.todo');
    const id = li.dataset.id;
    const newTitle = prompt("Enter new title for this todo:");
    if (newTitle !== null && newTitle.trim() !== "") {
      editTodo(id, newTitle);
    }
  }
});
