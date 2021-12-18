// definition of variables

const url = "http://localhost:3000/api/articulos/";
const container = document.querySelector("tbody");

let results = "";

const modalArticle = new bootstrap.Modal(
  document.getElementById("modalArticle")
);
const formArticle = document.querySelector("form");
const description = document.getElementById("description");
const price = document.getElementById("price");
const stock = document.getElementById("stock");

let option = "";

btnCreate.addEventListener("click", () => {
  description.value = "";
  price.value = "";
  stock.value = "";
  modalArticle.show();
  option = "create";
});

// function show the results
const show = (article) => {
  article.forEach((article) => {
    results += `<tr>
                        <td>${article.id}</td>
                        <td>${article.description}</td>
                        <td>${article.price}</td>
                        <td>${article.stock}</td>
                        <td class="text-center"><a class="btnEdit btn btn-primary">Edit</a><a class="btnRemove btn btn-danger">Remove</a></td>
                </tr>
        `;
  });
  container.innerHTML = results;
};

// show registers
fetch(url)
  .then(response.json())
  .then((data) => show(data))
  .catch((err) => console.log(err));
