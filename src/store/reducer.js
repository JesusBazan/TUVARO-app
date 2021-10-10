const initialState = {
    currentUserID: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ACTUALIZAR_USER_ID":
            return { ...state, currentUserID: action.payload }
    
        default:
            return state;
    }
    
}

export { reducer };