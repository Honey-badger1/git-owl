const initialState = {
    commits: [],
    pathToRepo:[]
    
}

const commitsReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'COMMITS_LOADED':

            return {
                ...state,
                commits: action.payload



            };
            case 'GET_PATH':

                return {
                    ...state,
                    pathToRepo: [action.payload]
    
                };
 
                

            default:
            return state;
    }
}





export default commitsReducer;