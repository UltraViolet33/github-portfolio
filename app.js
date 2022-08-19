fetch("./projects.json")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    displayAllProjects(value);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

function displayOneProject(project) {
  let html = `<div class="project">
                <h4 class="project-title">${project.name}</h4>
                <div class="project-desc">
                  <p>${project.description}</p>
                  <a href="${project.github_link}" target="_blank" class="link-code">See sourcecode</a>
                </div>
              </div>`;

  return html;
}

function displayAllProjects(data) {
  const htmlProjects = data.map((project) => displayOneProject(project));
  let divProjects = document.getElementById("grid");
  divProjects.innerHTML = htmlProjects;
}

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});
