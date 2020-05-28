import "./assets/style/styles.scss";
import "./index.scss";

const articleElment = document.querySelector(".article-container");
const createArticles = (articles) => {
  const articlesDom = articles.map((article) => {
    const articleDom = document.createElement("div");
    articleDom.classList.add("article");
    articleDom.innerHTML = `
    <img
              src="${article.img}"
              alt="profil"
            />
            <h2>${article.title}</h2>
            <p class="article-author">${article.author}-${article.categorie}</p>
            <p class="article-content">
              ${article.content}
            </p>
            <div class="article-actions">
              <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
            </div> 
    `;
    return articleDom;
  });

  articleElment.innerHTML = "";
  articleElment.append(...articlesDom);
  const deletebutton = articleElment.querySelectorAll(".btn-danger");
  deletebutton.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        console.log(articleId);
        const response = await fetch(
          `https://restapi.fr/api/articles/${articleId}`,
          { method: "DELETE" }
        );
        const body = await response.json();
        console.log(body);
        fetchArticle();
      } catch (e) {
        console.log(e);
      }
    });
  });
};

const fetchArticle = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/articles");
    const articles = await response.json();
    console.log(articles);
    createArticles(articles);
  } catch (e) {
    console.log("e:", e);
  }
};

fetchArticle();
