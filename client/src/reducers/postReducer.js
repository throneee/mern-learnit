import {
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
} from '../contexts/constants';

export const postReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_POST:
            return {
                ...state,
                postLoading: false,
                posts: [...state.posts, payload],
            };
        case POSTS_LOADED_SUCCESS:
            return {
                ...state,
                postLoading: false,
                posts: payload,
            };
        case POSTS_LOADED_FAIL:
            return {
                ...state,
                postLoading: false,
                posts: [],
            };
        case UPDATE_POST:
            const updatedPosts = state.posts.map((post) => {
                return post._id === payload._id ? payload : post;
            });

            return {
                ...state,
                postLoading: false,
                posts: updatedPosts,
            };
        case DELETE_POST:
            return {
                ...state,
                postLoading: false,
                posts: state.posts.filter((post) => post._id !== payload),
            };
        case FIND_POST:
            return {
                ...state,
                post: payload,
            };
        default:
            return state;
    }
};
