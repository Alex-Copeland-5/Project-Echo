document.addEventListener("DOMContentLoaded", () => {
  console.log("document succesfully loaded, baby");
});

// Bind random button only if present on the page
const randomBtn = document.getElementById("randomBtn");
if (randomBtn) {
  randomBtn.addEventListener("click", function () {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    const display = document.getElementById("randomNumberDisplay");
    if (display) {
      display.textContent = "Your random number is " + randomNumber + "!";
    }
  });
}

// Only attempt fetch once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Projects loader: starting fetch for projects.json");
  fetch("../projects.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".project-block");
      if (!container) return; // Only run on Projects page

      // Clear existing static content
      container.innerHTML = "";

      data.projects.forEach((project) => {
        const card = document.createElement("div");
        card.className = "project";

        const imgOrPlaceholder = project.img
          ? (() => {
              const img = document.createElement("img");
              img.src = project.img;
              img.alt = `${project.name} preview`;
              img.loading = "lazy";
              return img;
            })()
          : (() => {
              const ph = document.createElement("div");
              ph.className = "img-placeholder";
              return ph;
            })();

        const title = document.createElement("h2");
        title.textContent = project.name || "Untitled Project";

        const links = document.createElement("div");
        links.className = "project-links";

        if (project.repo) {
          const repoA = document.createElement("a");
          repoA.href = project.repo;
          repoA.target = "_blank";
          repoA.rel = "noopener";
          repoA.textContent = "View Project";
          links.appendChild(repoA);
        }

        card.appendChild(imgOrPlaceholder);
        card.appendChild(title);
        card.appendChild(links);

        container.appendChild(card);
      });
      console.log(`Projects loader: rendered ${data.projects.length} projects`);
    })
    .catch((error) => console.error("Error loading JSON:", error));
});

// Keep a single DOMContentLoaded log
// (other logs above will confirm page readiness and fetch progress)
