const fs = require("fs").promises;

class Contenedor {
    constructor(path) {
        this.path = path;
    }

    async save(objeto) {
        try {
            let id;
            const leer = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(leer);//Se pasa a formato javascript
            data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1);
            const newProducto = { ...objeto, id };
            data.push(newProducto);
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
            return newProducto.id;
        } catch (err) {
            console.log(`Error al guardar: ${err}`);
        }
    }

    async getById(id) {
        try {
            const leer = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(leer);
            const obj = data.find((obj) => obj.id === id);
            if (!obj) {
                return null;
            }
            return obj;
        } catch (err) {
            console.log(`Error al buscar el id ${id}: ${err}`);
        }
    }

    async getAll() {
        const leer = await fs.readFile(this.path, "utf-8");
        return JSON.parse(leer);
    }

    async deleteByid(id) {
        try {
            const leer = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(leer);
            const obj = data.filter((obj) => obj.id === id);
            await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8");
        } catch (err) {
            console.log(`Error al borrar los ardhivos del id ${id}: ${err}`);
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8");
            console.log('Productos borrados');
        } catch (err) {
            console.log(err);
        }
    }


}

module.exports = Contenedor;
