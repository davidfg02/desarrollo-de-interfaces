console.log("Publicando");
fetch("https://jsonplaceholder.typicode.com/photo")
  .then((response) => response.json())
  .then(
    (j) => (listado.innerHTML = j.map((photo) => `<li><img>${photo.title}</li>`)), //muestra el title en el ul de la pagina
  );
