# TAREA Despliegue en servidores:

1. Ip para acceder a la web de react
```
13.60.162.42
```
2. Dns para entrar en la aplicacion de nodepop 
```
http://ec2-13-60-162-42.eu-north-1.compute.amazonaws.com:3000/

```
--usuairo natuki@com
--password 1234


# Tarea-NodePoP

install dependencies.

```js
npm install
```

Initilize dataBase:

---The command deletes all contents of the dataBase
```sh
npm run init-db
```

Development:

To start
```js
npm run dev
```

## Api.
localhost:3000

post:
a. Token
/api/login?email=natuki@comd&password=123dsadasdasdas

b. Create advert:
post http://localhost:3000/articulos
body form-data {
    name type text,
    venta type text,
    precio type text,
    foto type file,
    owner type text
}
Headers : Authorization token

```json
{
    "articuloGuardado": {
        "name": "camisa7",
        "precio": 12344,
        "tags": [
            "estilos de vida"
        ],
        "owner": "665c9734ef60cbaca4ed2cce",
        "_id": "665cb3dca08a12ce665a49f1",
        "foto": "foto--1717351388023--47EAA447-DBAB-4F90-9B20-F17BE64694A6.JPG",
        "__v": 0
    }
}
```

get:

a. Articulos. 

/articulos?jwt=.....
```json
{
    "anuncios": [
        {
            "_id": "665c9734ef60cbaca4ed2cd6",
            "name": "coche",
            "venta": true,
            "precio": 4000000,
            "foto": "car.png",
            "tags": [
                "work",
                "motor"
            ],
            "owner": "665c9734ef60cbaca4ed2cce",
            "__v": 0
        },
        {
            "_id": "665c9734ef60cbaca4ed2cd7",
            "name": "Enano rojo",
            "venta": false,
            "precio": 25,
            "foto": "bookEnano.png",
            "tags": [
                "lifestyle"
            ],
            "owner": "665c9734ef60cbaca4ed2cce",
            "__v": 0
        },
        {
            "_id": "665c9734ef60cbaca4ed2cd8",
            "name": "La guia del autoesptopista galáctico",
            "venta": false,
            "precio": 50,
            "foto": "LibroAUTO.png",
            "tags": [
                "lifestyle"
            ],
            "owner": "665c9734ef60cbaca4ed2cce",
            "__v": 0
        },
        {
            "_id": "665c9734ef60cbaca4ed2cd9",
            "name": "servidor",
            "venta": true,
            "precio": 400,
            "foto": "server.png",
            "tags": [
                "work"
            ],
            "owner": "665c9734ef60cbaca4ed2cce",
            "__v": 0
        },
        {
            "_id": "665c9884a8d43a710d3e66c6",
            "name": "camisa5",
            "precio": 12344,
            "tags": [
                "estilos de vida"
            ],
            "owner": "665c9734ef60cbaca4ed2cce",
            "foto": "foto--1717344388890--C437F4C4-3350-4DB9-B5E2-825FFDD73ECD.JPG",
            "__v": 0
        },
        {
            "_id": "665c9960a8d43a710d3e66ce",
            "name": "camisa6",
            "precio": 12344,
            "tags": [
                "estilos de vida"
            ],
            "owner": "665c9734ef60cbaca4ed2cce",
            "foto": "foto--1717344608452--47EAA447-DBAB-4F90-9B20-F17BE64694A6.JPG",
            "__v": 0
        },
        {
            "_id": "665cb3dca08a12ce665a49f1",
            "name": "camisa7",
            "precio": 12344,
            "tags": [
                "estilos de vida"
            ],
            "owner": "665c9734ef60cbaca4ed2cce",
            "foto": "foto--1717351388023--47EAA447-DBAB-4F90-9B20-F17BE64694A6.JPG",
            "__v": 0
        }
    ]
}
```
