import axios from 'axios';

const getToken = () => sessionStorage.getItem('token');

const getAuthConfig = () => {
    const token = getToken();
    if (!token) {
        console.error("No token available for API call");
        return null;
    }
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export const postService = {
    getPosts: async (params = {}) => {
        try {
            const { page = 1, limit = 10, search = '', category = '' } = params;
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(search && { search }),
                ...(category && { category })
            });
            
            const { data } = await axios.get(`/posts?${queryParams}`);
            
            // Handle new paginated response format
            if (data.posts) {
                return {
                    posts: data.posts.map(post => ({
                        ...post,
                        id: post._id,
                        author: {
                            id: post.author?._id || post.author, 
                            name: post.author?.name || 'Unknown Author',
                            avatar: post.author?.avatar || `https://placehold.net/avatar-4.svg`
                        }
                    })),
                    currentPage: data.currentPage,
                    totalPages: data.totalPages,
                    totalPosts: data.totalPosts,
                    hasMore: data.hasMore
                };
            }
            
            // Fallback for old format (backward compatibility)
            return {
                posts: data.map(post => ({
                    ...post,
                    id: post._id,
                    author: {
                        id: post.author?._id || post.author, 
                        name: post.author?.name || 'Unknown Author',
                        avatar: post.author?.avatar || `https://placehold.net/avatar-4.svg`
                    }
                })),
                currentPage: 1,
                totalPages: 1,
                totalPosts: data.length,
                hasMore: false
            };
        } catch (error) {
            console.error("Failed to fetch posts:", error.response?.data?.message || error.message);
            return {
                posts: [],
                currentPage: 1,
                totalPages: 0,
                totalPosts: 0,
                hasMore: false
            };
        }
    },

    getPostById: async (id) => {
        const config = getAuthConfig();
         if (!config) return null;
        try {
            const { data } = await axios.get(`/posts/${id}`, config);
            console.log(`postService.getPostById (${id}) - Raw response data:`, data);

            const postResult = {
                ...data, 
                id: data._id,
                author: { 
                    id: data.author?._id || data.author?.id,
                    name: data.author?.name || 'Unknown Author',
                    avatar: data.author?.avatar || `https://placehold.net/avatar-4.svg`
                },
                comments: Array.isArray(data.comments) ? data.comments.map(c => ({
                    ...(c || {}), 
                    id: c?._id || c?.id, 
                    user: c?.user ? { 
                        ...(c.user || {}), 
                        id: c.user._id || c.user.id 
                    } : { name: 'User', id: null } 
                })) : [] 
             };
             console.log(`postService.getPostById (${id}) - Mapped result:`, postResult);
            return postResult;
        } catch (error) {
            console.error(`Failed to fetch post ${id}:`, error.response?.data?.message || error.message);
            return null;
        }
    },

    createPost: async (postData) => {
         const config = getAuthConfig();
         if (!config) throw new Error("Authentication required");
         const { id, ...payload } = postData;
        
        // Log what we're sending
        console.log("Creating post with payload:", payload);
        
        try {
             const { data } = await axios.post('/posts', payload, config);
             return { 
                 ...data,
                 id: data._id,
                 author: {
                     id: data.author?._id || data.author?.id,
                     name: data.author?.name || 'Unknown Author',
                     avatar: data.author?.avatar || `https://placehold.net/avatar-4.svg`
                 },
                 comments: data.comments || [], 
                 likes: data.likes || [] 
            };
        } catch (error) {
            console.error("Failed to create post:", error.response?.data?.message || error.message);
            console.error("Full error response:", error.response?.data);
            console.error("Payload that was sent:", payload);
            throw error;
        }
    },

     updatePost: async (postId, postData) => {
         const config = getAuthConfig();
         if (!config) throw new Error("Authentication required");
         const { id, _id, ...payload } = postData;
         try {
             const { data } = await axios.put(`/posts/${postId}`, payload, config);
             return { 
                 ...data,
                 id: data._id,
                 author: {
                     id: data.author?._id || data.author?.id,
                     name: data.author?.name || 'Unknown Author',
                     avatar: data.author?.avatar || `https://placehold.net/avatar-4.svg`
                 },
                 comments: data.comments || [],
                 likes: data.likes || []
             };
         } catch (error) {
             console.error(`Failed to update post ${postId}:`, error.response?.data?.message || error.message);
             throw error;
         }
     },

     deletePost: async (postId) => {
         const config = getAuthConfig();
         if (!config) throw new Error("Authentication required");
         try {
             await axios.delete(`/posts/${postId}`, config);
             return { message: 'Post deleted successfully' };
         } catch (error) {
             console.error(`Failed to delete post ${postId}:`, error.response?.data?.message || error.message);
             throw error;
         }
     },

    likePost: async (postId) => {
        const config = getAuthConfig();
        if (!config) throw new Error("Authentication required");
        try {
            const { data } = await axios.put(`/posts/${postId}/like`, {}, config);
            return data; 
        } catch (error) {
            console.error(`Failed to like post ${postId}:`, error.response?.data?.message || error.message);
            throw error;
        }
    },

    unlikePost: async (postId) => {
        const config = getAuthConfig();
        if (!config) throw new Error("Authentication required");
        try {
            const { data } = await axios.put(`/posts/${postId}/unlike`, {}, config);
            return data; 
        } catch (error) {
            console.error(`Failed to unlike post ${postId}:`, error.response?.data?.message || error.message);
            throw error;
        }
    },
};