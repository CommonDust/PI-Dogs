import axios from "axios"


export const GET_DOGS = "GET_DOGS"
export const DETAIL_DOG = 'DETAIL_DOG'
export const GET_DOG_BY_NAME = 'GET_DOG_BY_NAME'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const GET_FILTER_TEMPERAMENTS = 'GET_FILTER_TEMPERAMENTS'
export const GET_FILTER_RACE = 'GET_FILTER_RACE'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT'
export const ORDER_BY_ASCENDESCEN = 'ORDER_BY_ASCENDESCEN'
export const BRING_29_LESS = "BRING_29_LESS"

export const getDogs = () => {
    return (dispatch) => {
        axios.get("http://localhost:3001/dogs")
        .then((response) => {
            dispatch({type: GET_DOGS, payload: response.data})
        })
    }
}



export const detailDog = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs/${id}`)
        .then((response) => {
            dispatch({type: DETAIL_DOG, payload: response.data})
            
        })
    }
}



export const nameDog = (payload) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs?name=${payload}`)
        .then(response => dispatch({type:GET_DOG_BY_NAME, payload:response.data}), 'Can´not load your dog' );
    }
}




export const getTemperaments = ()=>{
    return (dispatch) => {
        axios.get(`http://localhost:3001/temperament`)
        .then(response => dispatch({type:GET_TEMPERAMENTS, payload:response.data}))
    }
}

export const FilterByTemperament = (payload) => {
    return{
        type: GET_FILTER_TEMPERAMENTS,
        payload
    }
};

export function OrderByName(payload) {
    return { 
        type: ORDER_BY_NAME,
        payload
    }
};

export function OrderByWeight(payload) {
    return { 
        type: ORDER_BY_WEIGHT,
        payload
    }
};

export function OrderAscenDescen(payload) {
    return {
        type: ORDER_BY_ASCENDESCEN,
        payload
    }
}

export function postDog(payload) {
    return async function () {
        const data = await axios.post("http://localhost:3001/dogs", payload); 
        return data;
    }
}


