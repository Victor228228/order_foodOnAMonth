"use strict";
// API - сторонние готовые методы и свойства, которые можно использовать
// fetch API - готовые методы и свойства для работы с сервером


/*

fetch('https://jsonplaceholder.typicode.com/todos/1')  //при использовании fetch возвращается промис
  .then(response => response.json()) // response- ответ с сервера, в данном случаем в формате JSON. ////  response.json() - response это ответ от сервера.. мы превращаем (при помощи встроенного метода в fetch) .json() в JavaScript объект. и это все так же возаращется к нам в виде промисса
  .then(json => console.log(json))


*/


// Post запрос или Put
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: "POST", // пост запрос, что бы что-то загрузить
  body: JSON.stringify({name: "Alex"}), // то что отправялем на сервер. в данном случае JSON объект с именем алекс
  headers: {  // заголовки, описывает то,что мы отправялем на сервер
    "Content-type": "application/json"
  }
})
  .then(response => response.json())
  .then(json => console.log(json))
