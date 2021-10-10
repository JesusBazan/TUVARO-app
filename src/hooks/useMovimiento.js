
import {API, graphqlOperation} from 'aws-amplify';
import {createMovimiento} from '../graphql/myMutations';

const useMovimiento = () => {

    const crearNuevoMovimiento = async(newMovimiento) => {
        try {
            const data = await API.graphql(graphqlOperation(createMovimiento, {input: newMovimiento}));
            console.log("NUEVO MOVIMIENTO CREADO CON EXITO ---> ",data);
        } catch (error) {
            console.log("ERROR AL CREAR NUEVO MOVIMIENTO ---> ", error);
        }
    }

    return [ crearNuevoMovimiento ]

}

export default useMovimiento;