// import axios from "axios";

// const API_URL = "https://jsonplaceholder.typicode.com/posts";

// export const getItems = async () => axios.get(API_URL);
// export const createItem = async (data: { title: string; body: string }) =>
//   axios.post(API_URL, data);
// export const updateItem = async (id: number, data: { title: string; body: string }) =>
//   axios.put(`${API_URL}/${id}`, data);
// export const deleteItem = async (id: number) => axios.delete(`${API_URL}/${id}`);

import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error("Axios error:", error.message);
      throw new Error(`Failed to fetch posts: ${error.message}`);
    } else {
      // Handle unexpected errors
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while fetching posts");
    }
  }
};

// Used to delete posts
let idCounter = 101; // API Post IDs end at 100

export const createPost = async (data: { title: string; body: string }) => {
  try {
    // Generate a unique ID locally
    const uniqueId = idCounter++;
    const newItem = { ...data, id: uniqueId }; // Add the unique ID to the new item

    const response = await axios.post(API_URL, newItem);
    return { ...response.data, id: uniqueId };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(`Failed to create post: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while creating the post");
    }
  }
};

export const updatePost = async (id: number, data: { title: string; body: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(`Failed to update post: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while updating the post");
    }
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(`Failed to delete post: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while deleting the post");
    }
  }
};