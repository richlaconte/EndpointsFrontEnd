const recentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_RECENT':
            return [
                ...state,
                {
                    url: action.url,
                    content: action.content
                }
            ]

        case 'SET_RECENTS':
            return action.recents

        default:
            return state;
    }
};

export default recentsReducer;