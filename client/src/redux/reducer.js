import { GET_DOGS, DETAIL_DOG, GET_DOG_BY_NAME, GET_TEMPERAMENTS, GET_FILTER_TEMPERAMENTS, ORDER_BY_WEIGHT, ORDER_BY_NAME, ORDER_BY_ASCENDESCEN } from "./actions"


const initialState = {
    allDogs: [],
    details: [],
    dogs: [],
    temperaments: [],
}

    const reducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_TEMPERAMENTS:
                const filteresTemp = action.payload.filter((temp) => temp.name !== "");
                return {
                  ...state,
                  temperaments: filteresTemp,
                };
          
              case GET_FILTER_TEMPERAMENTS:
                const allDogs = state.dogs;
                let filteredDogs = [];
                if (action.payload === "Todos") {
                  filteredDogs = allDogs;
                } else {
                  for (let i = 0; i < allDogs.length; i++) {
                    
                    let found = allDogs[i].temperaments.find((t) => t === action.payload);
                    if (found) {
                      filteredDogs.push(allDogs[i]);
                    } 
                  }
                }
                return {
                    ...state,
                    allDogs: filteredDogs,
                  };

        case GET_DOGS: 
            
        action.payload.forEach(element => {
          if (!element.temperaments[0]) {
            element.temperaments[0] = "no-temperaments" //eliminamos arreglos vacios de temperamentos
          }
        });
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };

            case DETAIL_DOG:
                let myDetails = action.payload
        if (!myDetails.temperaments) { 
        myDetails.temperaments = "no-temperaments"
        }
        return {
        ...state,
        details: myDetails
        };

        case GET_DOG_BY_NAME:
            
        return {
                ...state,
                allDogs: action.payload
            }
            
        
              case ORDER_BY_WEIGHT:
      const sortedWeight =
        action.payload === "min_weight"
          ? state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return 1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return -1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
      };

      case ORDER_BY_NAME:
      const sortedName =
        action.payload === "A-Z"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedName,
      };
      
      case ORDER_BY_ASCENDESCEN:
        return{
          ...state,
          dogs: state.dogs.reverse()
        }
      
      default:
            return { ...state };
    }
}

export default reducer