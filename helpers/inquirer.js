const inquirer = require('inquirer');
require('colors');

const preguntas = [
  { type: 'list',
    name: 'opcion',
    message: 'Qué desea hacer?',
    choices: [
      {value: 1, name: `${'1'.cyan}. Buscar ciudad`},
      {value: 2, name: `${'2'.cyan}. Historial`},
      {value: 0, name: `${'0'.cyan}. Salir`},
    ]
  }
];

const inquirerMenu = async() => {
  console.clear();
  console.log('==========================='.green);
  console.log('   Seleccione una opción   '.white);
  console.log('===========================\n'.green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
}

const pausa = async() => {
  const question = [
    { type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`
    }
  ];
  console.log('\n');
  return await inquirer.prompt(question);
}

const leerInput = async (mensaje) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message: mensaje,
      validate( value ) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listarTareas = async(tareas = []) => {
  const choices = tareas.map( (tarea, i) => {
    return { value: tarea.id, name: (i + 1) + '. ' + tarea.desc }
  });
  choices.unshift({value:'0', name: '0. Cancelar'})

  const pregunta = [
    { type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ];
  const { id } = await inquirer.prompt(pregunta);
  return id;
}

const marcarTareas = async(tareas = []) => {
  const choices = tareas.map( (tarea, i) => {
    return {
      value: tarea.id,
      name: (i + 1) + '. ' + tarea.desc,
      checked: !!tarea.completadoEn
    }
  });

  const pregunta = [
    { type: 'checkbox',
      name: 'ids',
      message: 'Completar',
      choices
    }
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
}

const confirmar = async (mensaje) => {
  const preguntas = [
    { type: 'confirm', name: 'ok', message: mensaje }
  ]
  const { ok } = await inquirer.prompt(preguntas);
  return ok;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarTareas,
  confirmar,
  marcarTareas
}
