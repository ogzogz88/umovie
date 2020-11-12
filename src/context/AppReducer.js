import { Watchlist } from "../components/Watchlist";

export function AppReducer(state, action) {
    switch (action.type) {
        case 'ADD_MOVIE_TO_WATCHLIST':
            return { ...state, watchlist: [...state.watchlist, action.payload] };
        case 'ADD_MOVIE_TO_WATCHED':
            return { ...state, watched: [...state.watched, action.payload] }
        case 'REMOVE_MOVIE_FROM_WATCHLIST':
            return { ...state, watchlist: state.watchlist.filter(movie => movie.id !== action.payload.id) };
        case 'REMOVE_MOVIE_FROM_WATCHED':
            return { ...state, watched: state.watched.filter(movie => movie.id !== action.payload.id) }
        default:
            return state;
    }
}