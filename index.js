var _ = require('underscore');

var lista =[1,2,3,4,5,6]; _.each(lista, function(item){
    console.log(item);
});

var employeesCollection = [
    {
        "id":1,
        "name":"Soni",
        "designation":"SE",
        "salary":25000
    },
    {
        "id":2,
        "name":"Rohit",
        "designation":"SSE",
        "salary":35000
    },
    {
        "id":3,
        "name":"Akanksha",
        "designation":"Manager",
        "salary":45000
    },
    {
        "id":4,
        "name":"Mohan",
        "designation":"Accountant",
        "salary":30000
    },
    {
        "id":5,
        "name":"Gita",
        "designation":"SSE",
        "salary":35000
    },
];

var cargos = _.map(employeesCollection, function(employee){
    return {nombre: employee.name, cargo: employee.designation};
});

console.log(cargos);
console.log(_.pluck(employeesCollection, "name"));

var empleados_sse = _.chain(employeesCollection)
    .filter(function(employee){
        return employee.designation === 'SSE';
    })
    .map(function(employee){
        return {nombre: employee.name, id: employee.id};
    })
    .value();

console.log(empleados_sse);

var param_replacer = require('./lib/replace');



function replaceParams(text, replacements, language = 'es') {
if (!replacements[language]) {
    language = 'es';
}
let escaped = text.replace(/%([^%\n\r]+)%/g, (_, p1) => {
    return `\x01${p1}\x02`;
});
let result = escaped;
let hasParams = true;
while (hasParams) {
    hasParams = false;
    result = result.replace(/\x01([^%\n\r]+)\x02/g, (_, p1) => {
    let value = replacements[language][p1];
    if (value !== undefined) {
        hasParams = true;
        return value;
    } else {
        return `%${p1}%`;
    }
    });
}
return result.replace(/\x01/g, '%').replace(/\x02/g, '%');
}

const objetivo = '%hello% %world%%! -- %world% %hello%!';
const idioma = 'es';
const reemplazos = {
    'en': {
        'hello': 'Hello',
        'world': 'World',
    },
        'es': {
        'hello': 'Hola',
        'world': 'Mundo',
    },
    };
const resultado = replaceParams(objetivo, reemplazos, idioma);
console.log(resultado);