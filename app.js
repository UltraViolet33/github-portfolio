// nav bar
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});

// portfolio projects
const selectPortfolioCategories = document.querySelector(
  "#portfolios-categories"
);

function getPortfoliosCategories() {
  const projects = getLocalStorageData("projects_github_portfolio");
  return Object.keys(projects);
}

function fillSelectPortfolios(portfoliosCategories) {
  for (const cat of portfoliosCategories) {
    selectPortfolioCategories.innerHTML += `<option value="${cat}">${cat}</option>`;
  }
}

const saveLocalStorage = (data, key) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

selectPortfolioCategories.addEventListener("change", function () {
  displayProjectsPortfolio(selectPortfolioCategories.value);
});

fetch("./projects.json")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    saveLocalStorage(data, "projects_github_portfolio");
    const portfoliosCategories = getPortfoliosCategories();
    fillSelectPortfolios(portfoliosCategories);
    displayProjectsPortfolio(null);
    allProjects = getLocalStorageData("projects_github_portfolio");
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

function displayOneProject(project) {
  let html = `<div class="project">
                <h4 class="project-title">${project.name}</h4>
                <div class="project-desc">
                  <p>${project.description}</p>
                  <p class='techs'>${project.techs.join("|")}</p>
                  <a href="${
                    project.github_link
                  }" target="_blank" class="link-code">See source code</a>
                </div>
              </div>`;

  return html;
}

function displayProjectsPortfolio(categoryName = null) {
  let projects = getLocalStorageData("projects_github_portfolio");
  const portfoliosCategories = getPortfoliosCategories();

  projects = categoryName
    ? projects[categoryName]
    : projects[portfoliosCategories[0]];

  const htmlProjects = projects.map((project) => displayOneProject(project));
  let divProjects = document.getElementById("grid");
  divProjects.innerHTML = htmlProjects;
}

function displayAllProjects(data) {
  const htmlProjects = data.map((project) => displayOneProject(project));
  let divProjects = document.getElementById("grid");
  divProjects.innerHTML = htmlProjects;
}