import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import { postReducer } from '../reducers/postReducer';
import {
    apiUrl,
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
} from './constants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // 1. State
    const [postState, dispatch] = useReducer(postReducer, {
        postLoading: true,
        posts: [],
        post: null,
    });

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    });

    // 2. Create Post
    const createPost = async (addPostForm) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, addPostForm);

            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server Error' };
        }
    };

    // 3. Read Post
    const readPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);

            if (response.data.success) {
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAIL,
            });
        }
    };

    // 4. Update Post
    const updatePost = async (updatePostForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/posts/${updatePostForm._id}`,
                updatePostForm
            );
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server Error' };
        }
    };

    // 5. Delete Post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: postId });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server Error' };
        }
    };

    // 7. Find post
    const findPost = (postId) => {
        const post = postState.posts.find((post) => {
            return post._id === postId;
        });
        dispatch({ type: FIND_POST, payload: post });
    };

    // 8. Context Data
    const postContextData = {
        postState,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        showToast,
        setShowToast,
        createPost,
        readPosts,
        updatePost,
        deletePost,
        findPost,
    };

    // 9. Return Provider
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
