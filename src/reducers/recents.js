const recentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_RECENT':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    content: action.content
                }
            ]

        case 'SET_RECEMTS':
            return action.recents

        default:
            return state;
    }
};

export default recentsReducer;