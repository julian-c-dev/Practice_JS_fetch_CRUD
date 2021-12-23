// definition of variables

const url = "http://localhost:3000/api/articles/";
const container = document.querySelector("tbody");

let results = "";

const modalArticle = new bootstrap.Modal(
  document.getElementById("modalArticle")
);
const formArticle = document.querySelector("form");
const description = document.getElementById("description");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const create = document.getElementById("btnCreate");

let option = "";

create.addEventListener("click", () => {
  description.value = "";
  price.value = "";
  stock.value = "";
  modalArticle.show();
  option = "create";
});

// * Function show the results
const show = (articles) => {
  articles.forEach((article) => {
    results += `<tr>
                        <td>${article.id}</td>
                        <td>${article.description}</td>
                        <td>${article.price}</td>
                        <td>${article.stock}</td>
                        <td class="text-center"><a class="btnEdit btn btn-primary mx-1">Edit</a><a class="btnRemove btn btn-danger">Remove</a></td>
                </tr>
        `;
  });
  container.innerHTML = results;
};

// * Show records from API
fetch(url)
  .then((response) => response.json())
  .then((data) => show(data))
  .catch((err) => console.log(err));

// * Function ON (simulated the jQuery one)
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

// * Delete records
on(document, "click", ".btnRemove", (e) => {
  const record = e.target.parentNode.parentNode;
  const id = record.firstElementChild.innerHTML;
  alertify.confirm(
    "This is a confirm dialog.",
    function () {
      fetch(url + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
    },
    function () {
      alertify.error("Cancel");
    }
  );
});

// * Edit records
let idForm = 0;
on(document, "click", ".btnEdit", (e) => {
  console.log("edit");
  const record = e.target.parentNode.parentNode;
  idForm = record.children[0].innerHTML; // ! different way to catch the id (look line 59)
  const descriptionForm = record.children[1].innerHTML;
  const priceForm = record.children[2].innerHTML;
  const stockForm = record.children[3].innerHTML;
  description.value = descriptionForm;
  price.value = priceForm;
  stock.value = stockForm;
  option = "edit";
  modalArticle.show();
});

formArticle.addEventListener("submit", (e) => {
  e.preventDefault();
  if (option == "create") {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description.value,
        price: price.value,
        stock: stock.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const newArticle = [];
        newArticle.push(data);
        location.reload();
      });
  }
  if (option == "edit") {
    fetch(url + idForm, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description.value,
        price: price.value,
        stock: stock.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => location.reload());
  }
  modalArticle.hide();
});
