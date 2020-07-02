const resourcesList = document.getElementById("resourcesList");
const searchBar = document.getElementById("searchBar");
let freeResources = [];

searchBar.addEventListener("keyup", e => {
  const searchString = e.target.value.toLowerCase();

  const filteredResources = freeResources.filter(resource => {
    return (
      resource.subject.toLowerCase().includes(searchString) ||
      resource.name.toLowerCase().includes(searchString) ||
      resource.link.toLowerCase().includes(searchString)
    );
  });
  displayResources(filteredResources);
});

const loadResources = async () => {
  try {
    const res = await fetch("/free-resources_data.json");
    freeResources = await res.json();
    displayResources(freeResources);
  } catch (err) {
    console.error(err);
  }
};

const displayResources = resources => {
  const htmlString = resources
    .map(resource => {
      return `
            <li class="card card-body customfloatleft">
                <i class="${resource.icon} card-title"></i>
                <h6 class="text-warning">${resource.subject}</h5>
                <h5 class="card-title">${resource.name}</h5>
                <a href="${resource.link}" class="btn btn-primary">Link</a>
            </li>
        `;
    })
    .join("");
  resourcesList.innerHTML = htmlString;
};

loadResources();
