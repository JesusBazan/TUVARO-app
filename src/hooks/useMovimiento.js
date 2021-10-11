
import {API, graphqlOperation} from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import {createMovimiento} from '../graphql/myMutations';
import {listMovimientosByID} from '../graphql/myQueries'

const DATA = [
    {
        id: "1",
        Monto: 105, 
        categoria: "transporte", 
        descripcion: "pasajes de la semana", 
        tipo: "gasto", 
    },
    {
        id: "2",
        Monto: 105, 
        categoria: "transporte", 
        descripcion: "pasajes de la semana", 
        tipo: "gasto", 
    },
    {
        id: "3",
        Monto: 105, 
        categoria: "transporte", 
        descripcion: "pasajes de la semana", 
        tipo: "gasto", 
    },
];

const useMovimiento = () => {

    //const listaMovimientos = useRef(DATA);
    const [listaMovimientos, setListaMovimientos] = useState();

    const recuperarListaDeMovimientos = async(id) => {
        try {
            const data = await API.graphql(graphqlOperation(listMovimientosByID,{id: id}));
            console.log("LISTA DE MOVES ---> ",data);
            setListaMovimientos(data.data.listMovimientos.items);
        } catch (error) {
            console.log("ERROR AL RECUPERAR LISTA DE MOVIMIENTOS ---> ",error);
        }
    }

    const crearNuevoMovimiento = async(newMovimiento) => {
        try {
            const data = await API.graphql(graphqlOperation(createMovimiento, {input: newMovimiento}));
            console.log("NUEVO MOVIMIENTO CREADO CON EXITO ---> ",data);
        } catch (error) {
            console.log("ERROR AL CREAR NUEVO MOVIMIENTO ---> ", error);
        }
    }

    return [ 
        crearNuevoMovimiento,
        recuperarListaDeMovimientos,
        listaMovimientos
    ]

}

export default useMovimiento;