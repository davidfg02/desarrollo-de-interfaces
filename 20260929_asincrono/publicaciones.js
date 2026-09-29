console.log("Publicando");
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => console.log(json));

//muestra el title en un ul en la pagina HTML
