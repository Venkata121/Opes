const resourcesList = document.getElementById('resourcesList');
const searchBar = document.getElementById('searchBar');
let freeresources = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredResources = freeresources.filter((resource) => {
        return (
            resource.name.toLowerCase().includes(searchString) ||
            resource.house.toLowerCase().includes(searchString)
        );
    });
    displayResources(filteredResources);
});

const loadResources = async () => {
    try {
        const res = await fetch('./free-resources_data.json');
        freeresources = await res.json();
        displayResources(freeresources);
    } catch (err) {
        console.error(err);
    }
};

const displayResources = (resources) => {
    const htmlString = resources
        .map((resource) => {
            return `
            <li class="card card-body">
                <h2 class="card-title">${resource.resourceName}</h2>
                <p class="card-subtitle">Link: ${resource.link}</p>
            </li>
        `;
        })
        .join('');
    resourcesList.innerHTML = htmlString;
};

loadResources();