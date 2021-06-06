const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
      } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


require('colors');

//  otro metodo --> manual
// const { mostrarMenu, pausa } = require('./helpers/mensajes');

//console.clear(); // limpieza de consola

const main = async ()=>{

  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if ( tareasDB ) {
      // Establecer las tareas 
    tareas.cargarTareasFromArray( tareasDB );
  }

  do {
    // espera a que tengamos una respuesta de menu
    // opt = await mostrarMenu({opt});

    // Imprime el menú
    opt = await inquirerMenu();

    switch (opt) {
        case '1':
        // crear tarea

        const desc = await leerInput('Descripción : ');
        tareas.crearTarea(desc);
        break;

        case '2':
        // listar tarea
        tareas.listadoCompleto();
        // console.log( tareas.listadoArr );
        break;

        case '3':
          tareas.listarPendientesCompletadas(true);
        break;

        case '4':
        tareas.listarPendientesCompletadas(false);
        break;

        case '5':
         const ids = await mostrarListadoChecklist( tareas.listadoArr );
         tareas.toogleCompletadas( ids );
        break;

        case '6':
        const id = await listadoTareasBorrar( tareas.listadoArr);
        if ( id !== '0') {
          const ok = await confirmar('¿Está seguro?');

          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea Borrada!!!');
          }
          break;
        }
       
    }

    // al presionar 0 se sale del menú 
    // if ( opt !== '0' ) await pausa();

    // grabamos el arreglo con las tareas
    guardarDB( tareas.listadoArr );

    await pausa();


  } while ( opt !== '0' );

  // mostrarMenu();

  // pausa();
}


main();


