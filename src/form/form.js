import "./form.scss";
import "../assets/style/styles.scss";

const form = document.querySelector("form");
const errorElment = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const article = Object.fromEntries(formData.entries());
  if (formValid(article)) {
    try {
      const jason = JSON.stringify(article);
      const response = await fetch("https://restapi.fr/api/articles", {
        method: "POST",
        body: jason,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = response.json();
      console.log(body);
    } catch (e) {
      console.error("e:", e);
    }
  }
});
const formValid = (article) => {
  if (!article.author || !article.categorie || !article.content) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHtml = "";
    errors.forEach((e) => {
      errorHtml += `<li>${e}</li>`;
    });
    errorElment.innerHTML = errorHtml;
    return false;
  } else {
    errorElment.innerHTML = "";
    return true;
  }
};
