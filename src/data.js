import fs from 'fs/promises';

const dbSerialized = await fs.readFile('./src/db.json');
const db = JSON.parse(dbSerialized);

export async function getCats() {
    return db.cats;
}

export async function getCatById(catId) {
    return db.cats.find(cat => cat.id === catId);
}

export async function saveCat(catData) {
    db.cats.push({
        id: db.cats[db.cats,length - 1].id + 1,
        ...catData
    })

    await saveDb()
}

export async function editCat(catId, catData) {
    db.cats.map(cat => cat.id === catId ? {id: catId, ...catData} : cat);

    await saveDb();
}

async function saveDb() {
    const dbSerialized = JSON.stringify(db, null, 2);
    await fs.writeFile('./src/db.json', dbSerialized, {encoding: "utf-8"});
}