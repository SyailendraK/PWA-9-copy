var base_url = "https://api.football-data.org/v2/";
const KEY = '1dc0ff54955b4ba3a4b660a35cb4c573';
var no = 1;
var loading = document.getElementById('loading');

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getArticleById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        loading.setAttribute('style', 'display: block;');
        fetch(base_url + "competitions/" + idParam + "/standings", {
                headers: {
                    'X-Auth-Token': KEY
                }
            })
            .then(status)
            .then(json)
            .then(function (data) {
                var articleHTML = `
                <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img src="assets/img/${idParam}.png" onerror="this.src='assets/img/error-image.png'" />
                </div>
                <div class="card-content">
                    <span class="card-title">${data.competition.name}</span>
                    ${data.competition.area.name}
                    <br>
                    <div class="overflow-scroll-x">
                    <table class="highlight">
                        <thead>
                            <tr class="centered-text">
                                <th>Posisi</th>
                                <th>Klub</th>
                                <th>Main</th>
                                <th>Menang</th>
                                <th>Seri</th>
                                <th>Kalah</th>
                                <th>Poin</th>
                                <th>Goal</th>
                                <th>Kebobolan</th>
                                <th>Selisih</th>
                            </tr>
                        </thead>
                        <tbody>`;
                data.standings[0].table.forEach(club => {
                    articleHTML += `<tr>
                    <td class="centered-text">${club.position}</td>
                    <td><a href="./article.html?id=${club.team.id}&team=true" ><img class="img-table" src="${club.team.crestUrl}" onerror="this.src='assets/img/error-image.png'" alt="Logo ${club.team.name}">${club.team.name}</a></td>
                    <td class="centered-text">${club.playedGames}</td>
                    <td class="centered-text">${club.won}</td>
                    <td class="centered-text">${club.draw}</td>
                    <td class="centered-text">${club.lost}</td>
                    <td class="centered-text">${club.points}</td>
                    <td class="centered-text">${club.goalsFor}</td>
                    <td class="centered-text">${club.goalsAgainst}</td>
                    <td class="centered-text">${club.goalDifference}</td>
                </tr>`
                })
                articleHTML += `</tbody>
                    </table>
                    </div>
                </div>
                </div>
            `;
                document.getElementById("body-content").innerHTML = articleHTML;
                resolve(data);
                loading.setAttribute('style', 'display: none;');
            }).catch(error => {
                console.log(`API Error : ${error}`);
                loading.setAttribute('style', 'display: none;');
            });
    });
}

function getTeam() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        loading.setAttribute('style', 'display: block;');
        fetch(base_url + "teams/" + idParam, {
                headers: {
                    'X-Auth-Token': KEY
                }
            })
            .then(status)
            .then(json)
            .then(function (data) {
                var articleHTML = `
                        <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${data.crestUrl}" onerror="this.src='assets/img/error-image.png'" class="img-team"/>
                        </div>
                        <div class="card-content">
                            <span class="card-title centered-text">${data.name}</span>
                            <p class="centered-text">${data.area.name}</p>
                            <br>
                            <div class="overflow-scroll-x">
                            <table class="highlight">
                                <thead>
                                    <tr class="centered-text">
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Umur</th>
                                        <th>Posisi</th>
                                        <th>Kenegaraan</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>`;
                data.squad.forEach(squad => {
                    articleHTML += `<tr>
                            <td class="centered-text">${no}</td>
                            <td class="centered-text">${squad.name}</td>
                            <td class="centered-text">${getAge(squad.dateOfBirth)}</td>
                            <td class="centered-text">${squad.position}</td>
                            <td class="centered-text">${squad.nationality}</td>
                            <td class="centered-text">${squad.role}</td>
                        </tr>`
                })
                articleHTML += `</tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                    `;
                document.getElementById("body-content").innerHTML = articleHTML;
                resolve(data);
                loading.setAttribute('style', 'display: none;');
            }).catch(error => {
                loading.setAttribute('style', 'display: none;');
                console.log(`API Error : ${error}`);
            });
    });
}

function getSavedArticles() {
    loading.setAttribute('style', 'display: block;');
    getAll().then(function (saved) {
        var articlesHTML = "";
        saved.forEach(function (data) {
            articlesHTML += `
            <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                <a onclick="if(confirm('Ingin menghapus tim ini?')){deleteSaved(${data.id})}"><h5 class="delete">X</h5></a>
                <img src="${data.crestUrl}" onerror="this.src='assets/img/error-image.png'" class="img-team"/>
            </div>
            <a href="./article.html?id=${data.id}&saved=true">
            <div class="card-content">
                <span class="card-title centered-text">${data.name}</span>
            </div>
            </a>
            </div>
            `;


        });
        document.getElementById("body-content").innerHTML = articlesHTML;
        loading.setAttribute('style', 'display: none;');
    });
}

function getSavedArticleById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    loading.setAttribute('style', 'display: block;');
    getById(idParam).then(function (data) {
        var articleHTML = `
                        <h3 class="centered-text">Squad Tim Favorit</h3>
                        <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${data.crestUrl}" onerror="this.src='assets/img/error-image.png'" class="img-team"/>
                        </div>
                        <div class="card-content">
                            <span class="card-title centered-text">${data.name}</span>
                            <p class="centered-text">${data.area.name}</p>
                            <br>
                            <div class="overflow-scroll-x">
                            <table class="highlight">
                                <thead>
                                    <tr class="centered-text">
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Umur</th>
                                        <th>Posisi</th>
                                        <th>Kenegaraan</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>`;
        data.squad.forEach(squad => {
            articleHTML += `<tr>
                            <td class="centered-text">${no}</td>
                            <td class="centered-text">${squad.name}</td>
                            <td class="centered-text">${getAge(squad.dateOfBirth)}</td>
                            <td class="centered-text">${squad.position}</td>
                            <td class="centered-text">${squad.nationality}</td>
                            <td class="centered-text">${squad.role}</td>
                        </tr>`
        })
        articleHTML += `</tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                    `;
        document.getElementById("body-content").innerHTML = articleHTML;
        loading.setAttribute('style', 'display: none;');
    });
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function deleteSaved(id) {
    await deleteByID(id);
    getSavedArticles();
}