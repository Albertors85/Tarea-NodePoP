'use strict';

const readline = require('node:readline');
const connection = require('./lib/connectMoogoose');
const {Articulo, User}= require('./modelos')

/*
const Articulo = require('./modelos/Articulo');
const User = require('./modelos/user');*/


main().catch(err => console.log(err, 'Ha habido un error cargando'));

async function main(){

    await new Promise ((resolve)=> connection.once('open',resolve));

    const borrar = await preguntar('Estas seguro que quieres borrar el contenido de la base de datos? (NO)')
    if (!borrar){
        process.exit();
    };

    await initAnuncios();
    await initUsers();
    connection.close();

    async function initUsers(){
        const deleted = await User.deleteMany();
        console.log(`eliminados ${deleted.deletedCount} usuarios`)
        const inserted = await User.insertMany([
            {email: 'user@example.com', password:'1234'},
            {email: 'natuki@com', password:'1234'},
            {email: 'natukiBetty@com', password:'1234'}
        ]);
        console.log('has creado dos usuarios')
    }

    async function initAnuncios(){

        // borrar todos
        const deleted = await Articulo.deleteMany();
        console.log("Has borrados todos los anuncios");


        //crear anuncios
        const create = await Articulo.insertMany([
            {name:'IphonePro' ,venta:false ,precio:1500 ,foto:'IphPro.png' ,tags:['work','mobile']},           
            {name:'Iphone' ,venta:true ,precio:700 ,foto:'Iphn.png' ,tags:['mobile']},
            {name:'coche' ,venta:true ,precio:4000000 ,foto:'car.png' ,tags:['work','motor']},
            {name:'Enano rojo' ,venta:false ,precio:25 ,foto:'bookEnano.png' ,tags:['lifestyle']},
            {name:'La guia del autoesptopista galáctico' ,venta:false ,precio:50 ,foto:'LibroAUTO.png' ,tags:['lifestyle']},
            {name:'servidor' ,venta:true ,precio:400 ,foto:'server.png',tags:['work']},
        ]);
        console.log (`Has creados ${create.length} anuncios`);

    };


 };

function preguntar(texto){
    return new Promise((resolve, reject)=>{
        const ifc = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        ifc.question(texto, respuesta =>{
            ifc.close();
            resolve(respuesta.toLowerCase()==='si');
        })
    });
    
};