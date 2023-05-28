const initialState = {
    dataA: null,
    dataB: null,
    distance: null,
};

const distanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA_A':
            return { ...state, dataA: action.payload };
        case 'SET_DATA_B':
            return { ...state, dataB: action.payload };
        case 'SET_DISTANCE':
            return { ...state, distance: action.payload };
        default:
            return state;
    }
};

export default distanceReducer;
