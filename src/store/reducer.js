const initialState = {
    currentUserID: "",
    refreshGetMovements: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ACTUALIZAR_USER_ID":
            return { ...state, currentUserID: action.payload }

        // case "ACTUALIZAR_LISTA_DE_MOVIMIENTOS":
        //     return { ...state, refreshGetMovements: !refreshGetMovements }
    
        default:
            return state;
    }
    
}

export { reducer };