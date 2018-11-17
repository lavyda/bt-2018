import {
    GET_ALL_RESULTS,
    GET_LATEST_RESULT,
    IS_LYNIS_AVAILABLE,
    ARE_PACKAGES_AVAILABLE,
    SCAN_START,
    SCAN_SUCCESS,
    SCAN_ERROR,
    SELECT_RESULT,
    DELETE_RESULT
} from '../actions'

const initialState = {
    inProgress: false,
    allResults: [],
    selectedResult: null,
    packagesAvailable: { state: true }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RESULTS:
            return Object.assign({}, state, {
                allResults: action.results
            })
        case GET_LATEST_RESULT:
            return Object.assign({}, state, {
                selectedResult: action.result
            })
        case IS_LYNIS_AVAILABLE:
            return { ...state, lynisAvailable: action.isAvailable }
        case ARE_PACKAGES_AVAILABLE:
            return { ...state, packagesAvailable: action.areAvailable }
        case SCAN_START:
            return Object.assign({}, state, {
                inProgress: true
            })
        case SCAN_SUCCESS:
            const { result } = action
            return Object.assign({}, state, {
                inProgress: false,
                allResults: [result, ...state.allResults],
                selectedResult: result
            })
        case SCAN_ERROR:
            return Object.assign({}, state, {
                inProgress: false
            })
        case DELETE_RESULT:
            return state
        case SELECT_RESULT:
            const newState = Object.assign({}, state, {
                selectedResult: state.allResults.find(result => result.report_datetime_end === action.id)
            })
            return newState
        default:
            return state
    }
}

export default reducer