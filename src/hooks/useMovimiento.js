
import {API, graphqlOperation} from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import {createMovimiento} from '../graphql/myMutations';
import {listMovimientosByID} from '../graphql/myQueries';

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
    const [listGastos,setListGastos] = useState();
    const [listIngresos,setListIngresos] = useState();
    const [totalIngesoState,setTotalIngresoState] = useState(0);
    const [totalGastoState,setTotalGastoState] = useState(0);
    const [totalSaldoState,setTotalSaldoState] = useState(0);

    const listaGastos = useRef([]);
    const listaIngresos = useRef([]);
    const totalGastos = useRef(0);
    const totalIngresos = useRef(0);
    const totalSaldo = useRef(0);

    const recuperarListaDeMovimientos = async(id) => {
        try {
            const data = await API.graphql(graphqlOperation(listMovimientosByID,{id: id}));
            //console.log("LISTA DE MOVES ---> ",data);
            setListaMovimientos(data.data.listMovimientos.items);
            filtrarGastosIngresos({
                listaGeneral: data.data.listMovimientos.items
            });
        } catch (error) {
            console.log("ERROR AL RECUPERAR LISTA DE MOVIMIENTOS ---> ",error);
        }
    }

    const filtrarGastosIngresos = ({listaGeneral = []}) => {
        listaGeneral.map((item) => {
            if(item.tipo === "Gasto"){
                listaGastos.current.push(item);
            }
            else if(item.tipo === "Ingreso"){
                listaIngresos.current.push(item);
            }
        });
        setListGastos(listaGastos.current);
        setListIngresos(listaIngresos.current);
        getTotal({
            listIngresos: listaIngresos.current,
            listGastos: listaGastos.current
        });

    }

    const getTotal = ({listIngresos = [], listGastos = []}) => {

        let totalIng = 0.0;
        listIngresos.map((item) => {
            totalIng = totalIng + item.Monto
        })
        setTotalIngresoState(totalIng);
        totalIngresos.current = totalIng;

        let totalGas = 0.0;
        listGastos.map((item) => {
            totalGas = totalGas + item.Monto
        })
        setTotalGastoState(totalGas);
        totalGastos.current = totalGas;

        totalSaldo.current = totalIng - totalGas;
        setTotalSaldoState(totalIng - totalGas);
    }

    const crearNuevoMovimiento = async(newMovimiento) => {
        let data = null;
        try {
            data = await API.graphql(graphqlOperation(createMovimiento, {input: newMovimiento}));
            console.log("NUEVO MOVIMIENTO CREADO CON EXITO ---> ",data);
            return data;
        } catch (error) {
            console.log("ERROR AL CREAR NUEVO MOVIMIENTO ---> ", error);
            return data;
        }
    }

    return [ 
        crearNuevoMovimiento,
        recuperarListaDeMovimientos,
        listaGastos,
        listaIngresos,
        totalIngesoState,
        totalGastoState,
        totalSaldoState
    ]

}

export default useMovimiento;