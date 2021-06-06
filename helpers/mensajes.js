require('colors');

const mostrarMenu = () =>{

  return new Promise( (resolve,reject) =>{
    console.clear();

    console.log('==================='.green);
    console.log(' Seleccione Opción   '.green);
    console.log('===================\n'.green);

    console.log(`${'1.'.green} Crear tarea`);
    console.log(`${'2.'.green} Listar tareas`);
    console.log(`${'3.'.green} Listar tareas completadas `);
    console.log(`${'4.'.green} Listar tareas pendientes `);
    console.log(`${'5.'.green} Completar tareas`);
    console.log(`${'6.'.green} Borrar Tarea`);
    console.log(`${'0.'.green} Salir \n`);


    // Preparar interfaz que le vamos a mostrar al usuario
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Seleccione una opción : ', (opt) => {
      console.log({ opt });
      readline.close();
      resolve(opt);
    });

  });

}

const pausa = () =>{

  return new Promise((resolve, reject) =>{
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\n Presione ${'Enter'.green} para continuar \n`, (opt) => {
      readline.close();
      resolve();
    });

  });

}


// exportamos nuestras funciones

module.exports = {
  mostrarMenu,
  pausa,
}