const searchDiv = document.querySelector('.search-container');
const galleryDiv = document.querySelector('.gallery');
let users;

/*fetch data on 12 users from the US,
 turning the data to json format,
 assigning the result to the "users" variable then calling the "drawUsers" function */
fetch('https://randomuser.me/api/?nat=us&results=12')
    .then(res => res.json())
    .then(data => users = data.results)
    .then(drawUsers);

//assigning every user to a card div and appending it to the gallery Div 
function drawUsers() {
    users.forEach((user, index) => {
        const cardDiv = document.createElement('div');
        user.cardDiv = cardDiv;
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
    <div class="card-img-container">
        <img class="card-img" src=${user.picture.thumbnail} alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
    `;
        //listening to events on certein elements on the page and execute somthing after
        cardDiv.addEventListener('click', () => displayUser(user, index));
        document.getElementById('search-input').addEventListener('keyup', () => searchUsers());
        document.getElementById('search-submit').addEventListener('click', () => searchUsers());

        galleryDiv.appendChild(cardDiv);

    })
}

//when called show user info
function displayUser(user, index) {
    const userInfoDiv = document.createElement('div');
    const userDob = new Date(user.dob.date);
    const userDobToString = userDob.toLocaleDateString();
    userInfoDiv.innerHTML =
        `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${user.picture.thumbnail} alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city}</p>
            <hr>
            <p class="modal-text">${user.cell}</p>
            <p class="modal-text">${user.location.street}, ${user.location.state}, ${user.location.postcode}</p>
            <p class="modal-text">Birthday: ${userDobToString}</p>
        </div>  
        <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
    </div>
    `;
    const closeBtn = userInfoDiv.querySelector('#modal-close-btn');
    const nextBtn = userInfoDiv.querySelector('#modal-next');
    const prevBtn = userInfoDiv.querySelector('#modal-prev');

    const nextUserIndex = index + 1;
    const prevUserIndex = index - 1;


    if (users.hasOwnProperty(nextUserIndex)) {
        nextBtn.addEventListener('click', () => {
            userInfoDiv.remove();
            displayUser(users[nextUserIndex], nextUserIndex);
        })
    } else {
        nextBtn.remove();
    }

    if (users.hasOwnProperty(prevUserIndex)) {
        prevBtn.addEventListener('click', () => {
            userInfoDiv.remove();
            displayUser(users[prevUserIndex], prevUserIndex);
        })
    } else {
        prevBtn.remove();
    }



    closeBtn.addEventListener('click', () => {
        userInfoDiv.remove();
    })
    document.body.prepend(userInfoDiv);
}


const form = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;

searchDiv.innerHTML = form;

const searchInput = document.querySelector('.search-input');

/*when called this function tests if value entered in the search input excist in any user first or last name,
if so then show that user and if not hide the user*/

function searchUsers() {
    const value = searchInput.value.trim();
    if (value) {
        users.forEach(user => {
            if (user.name.first.includes(value) || user.name.last.includes(value)) {
                user.cardDiv.style.display = "";
            } else {
                user.cardDiv.style.display = "none";
            }
        });
    } else {
        users.forEach(user => user.cardDiv.style.display = "");
    }
};




