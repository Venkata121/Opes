const resourcesList = document.getElementById('resourcesList');
const searchBar = document.getElementById('searchBar');
let freeResources = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredResources = freeResources.filter((resource) => {
        return (
            resource.name.toLowerCase().includes(searchString) ||
            resource.house.toLowerCase().includes(searchString)
        );
    });
    displayResources(filteredResources);
});

const loadResources = async () => {
    try {
        const res = await fetch('/free-resources_data.json');
        freeResources = await res.json();
        displayResources(freeResources);
    } catch (err) {
        console.error(err);
    }
};

const displayResources = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="card card-body">
                <h2 class="card-title">${character.name}</h2>
                <p class="card-subtitle">House: ${character.house}</p>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();