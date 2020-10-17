const dbPromised = idb.open("bola-mania", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", {
        unique: false
    });
});

function saveForLater(article, id) {
    getById(id).then(data => {
        if (data) {
            console.log("Artikel sudah disimpan.");
        } else {
            dbPromised
                .then((db) => {
                    var tx = db.transaction("teams", "readwrite");
                    var store = tx.objectStore("teams");
                    store.put(article);
                    return tx.complete;
                })
                .then(function () {
                    M.toast({
                        html: 'Artikel berhasil di simpan'
                    });
                    console.log("Artikel berhasil di simpan.");
                }).catch(error => {
                    M.toast({
                        html: 'Artikel gagal di simpan'
                    });
                    console.log(`Error menyimpan ${error}`);
                });
        }
    })
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (articles) {
                resolve(articles);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(parseInt(id));
            })
            .then(function (article) {
                resolve(article);
            });
    });
}

function deleteByID(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readwrite");
                var store = tx.objectStore("teams");
                return store.delete(parseInt(id));
            })
            .then(function (article) {
                console.log("terhapus");
                resolve(article);
            });
    });

}