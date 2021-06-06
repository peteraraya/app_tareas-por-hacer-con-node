const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  // Transformaremos en unn arreglo nuestro listado
  // usamos un getter para crear un nuevo arreglo
  get listadoArr() {
    const listado = [];

    // nos regresa un arreglo de todas las llaves
    Object.keys(this._listado).forEach((key) => {
      // console.log(key);
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea( id ){

      if ( this._listado[id] ) {
          delete this._listado[id];
      }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // console.log(this._listado);

    this.listadoArr.forEach((tarea, i) => {
      console.log();
      const idx = `${i + 1}`.green;
      // console.log(idx);
      const { desc, completadoEn } = tarea;

      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      console.log(`${idx}. ${desc} :: ${estado} `);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      // console.log(idx);
      const { desc, completadoEn } = tarea;

      const estado = completadoEn ? "Completada" : "Pendiente";

      if (completadas) {
         contador +=1;
         console.log(`${idx}. ${desc} :: ${completadoEn.green} `);
      }else{
        contador += 1;
        console.log(`${idx}. ${desc} :: ${estado.red} `);
      }


    });
  }

  toogleCompletadas(ids = []) {

    ids.forEach((id) => {

      const tarea = this._listado[id]; // extraemos tarea
      // si la tarea no estaba previamente completa
      if ( !tarea.completadoEn ) {
           tarea.completadoEn = new Date().toISOString();
      }

    });

    this.listadoArr.forEach((tarea) => {
        // si no existe la tarea
        if ( !ids.includes(tarea.id) ) {
            // const tarea = this._listado[id]; // obtenemos la tarea
            // tarea.completadoEn = null;
            this._listado[tarea.id].completadoEn = null; // eliminamos las que no esten
        }
    });

  }


}

module.exports = Tareas;

/***
 * _listado:
 *  {uuuid-21221213-1231232-2: {id:12, desc:asd, completadoEn:3847837 } },
 *  {uuuid-21221213-1231232-2: {id:12, desc:asd, completadoEn:3847837 } },
 *  {uuuid-21221213-1231232-2: {id:12, desc:asd, completadoEn:3847837 } },
 *  {uuuid-21221213-1231232-2: {id:12, desc:asd, completadoEn:3847837 } },
 */
