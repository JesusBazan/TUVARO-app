const initialState = {
    currentUserID: "",
    refreshGetMovements: false,
    listGastos: [],
    listIngresos: [],
    ingresosTotal: 0,
    gastosTotal: 0,
    saldoTotal: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ACTUALIZAR_USER_ID":
            return { ...state, currentUserID: action.payload }

        case "ACTUALIZAR_LISTA_DE_MOVIMIENTOS":
            return { ...state, refreshGetMovements: !state.refreshGetMovements }

        case "LLENAR_LISTA_GASTOS":
            console.log("lista gastos ---> ",action.listaGastos);
            return { ...state, listGastos: action.listaGastos}

        case "LLENAR_LISTA_INGRESOS":
            return { ...state, listIngresos: action.listaIngresos}

        case "ACTUALIZAR_INGRESO_TOTAL":
            return { ...state, ingresosTotal: action.ingresoTotal}

        case "ACTUALIZAR_GASTOS_TOTAL":
            return { ...state, gastosTotal: action.gastoTotal}

        case "ACTUALIZAR_SALDO_TOTAL":
            return { ...state, saldoTotal: action.saldoTotal}
    
        default:
            return state;
    }
    
}

export { reducer };