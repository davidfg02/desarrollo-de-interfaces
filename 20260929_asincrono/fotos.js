console.log("Publicando");
fetch("https://jsonplaceholder.typicode.com/photos")
  .then(response => response.json())
  .then(j => galeria.innerHTML = j.map(t  => `<img src="${t.url}" width="50">`))