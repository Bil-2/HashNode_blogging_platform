import React, { useState, useEffect } from 'react';
import DashboardView from './DashboardView';
import Modal from '../components/common/Modal';
import ConfirmationModal from '../components/common/ConfirmationModal';
import ModalContent from '../components/modals/ModalContent';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAuth';
import { postService } from '../api/postService';
import { commentService } from '../api/commentService';
import Spinner from '../components/common/Spinner';

export default function DashboardPage() {
    const [modalContent, setModalContent] = useState(null);
    const [visibleBlogs, setVisibleBlogs] = useState(5);
    const navigate = useNavigate();
    const {
        user: currentUser,
        setUser: setCurrentUser,
        posts,
        allUsers,
        updatePostState,
        fetchPosts,
        loading: contextLoading,
        addPost: addPostToContext,
        deletePost: deletePostFromContext
    } = useAppContext();

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState('');

    useEffect(() => {
        if (!contextLoading && currentUser && posts.length === 0) {

            fetchPosts().catch(err => console.error("Dashboard initial fetch failed:", err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextLoading, currentUser, posts.length]);

    const feedPosts = React.useMemo(() => {
        return posts
            .filter(post => post.status === 'published' || !post.status)
            .sort((a, b) => new Date(b.publishedAt || b.createdAt || b.timestamp) - new Date(a.publishedAt || a.createdAt || a.timestamp));
    }, [posts]);

    const handleLike = async (blogId) => {
        if (!currentUser || !blogId) return;
        const post = posts.find(p => (p.id || p._id) === blogId);
        if (!post) return;
        const currentUserId = currentUser._id || currentUser.id;
        const isLiked = Array.isArray(post.likes) && post.likes.some(like => (typeof like === 'string' && like === currentUserId) || (typeof like === 'object' && like !== null && (like._id === currentUserId || like.id === currentUserId)));
        try {
            const action = isLiked ? postService.unlikePost : postService.likePost;
            await action(blogId);
            const refreshedPost = await postService.getPostById(blogId);
            if (refreshedPost) { updatePostState(refreshedPost); }
            else { console.warn(`Post ${blogId} not found after like/unlike.`); await fetchPosts(); }
        } catch (error) { console.error("Failed to toggle like:", error.response?.data?.message || error.message); }
    };

    const handleComment = async (blogId, text) => {
        if (!text || !currentUser || !blogId) {
            console.error("handleComment: Missing data", { text, currentUser, blogId });
            return;
        }

        try {
            await commentService.addComment(blogId, text);


            const refreshedPost = await postService.getPostById(blogId);
            if (refreshedPost) {
                updatePostState(refreshedPost);
            } else {
                console.warn(`Post ${blogId} not found after adding comment. Refetching all.`);
                await fetchPosts();
            }
        } catch (error) {
            console.error(`Failed to add comment to post ${blogId}:`, error.response?.data?.message || error.message);

            alert(`Failed to add comment: ${error.response?.data?.message || 'Please try again.'}`);
        }
    };
    const handleUpdateComment = async (commentId, blogId, newText) => {
        if (!newText || !commentId || !blogId) return;
        try {
            await commentService.updateComment(commentId, newText);
            const refreshedPost = await postService.getPostById(blogId);
            if (refreshedPost) {
                updatePostState(refreshedPost);
            } else { await fetchPosts(); }
        } catch (error) {
            console.error(`Failed to update comment ${commentId}:`, error.response?.data?.message || error.message);
            alert(`Failed to update comment: ${error.response?.data?.message || 'Please try again.'}`);
        }
    };
    const handleDeleteComment = async (commentId, blogId) => {
        if (!commentId || !blogId) return;
        try {
            await commentService.deleteComment(commentId);
            const refreshedPost = await postService.getPostById(blogId);
            if (refreshedPost) {
                updatePostState(refreshedPost);
            } else { await fetchPosts(); }
        } catch (error) {
            console.error(`Failed to delete comment ${commentId}:`, error.response?.data?.message || error.message);
            alert(`Failed to delete comment: ${error.response?.data?.message || 'Please try again.'}`);
        }
    };

    const handleDelete = (blogId) => {
        setConfirmMessage('Are you sure you want to delete this post? This action cannot be undone.');
        setConfirmAction(() => async () => {
            try {
                await deletePostFromContext(blogId);

            } catch (error) {
                console.error("Failed to delete post:", error.response?.data?.message || error.message);
                alert(`Failed to delete post: ${error.response?.data?.message || 'Please try again.'}`);
            }
        });
        setConfirmModalOpen(true);
    };

    const handleConfirm = async () => {
        if (typeof confirmAction === 'function') {
            await confirmAction();
        }
        setConfirmModalOpen(false);
        setConfirmAction(null);
    };

    const handleCancelConfirm = () => {
        setConfirmModalOpen(false);
        setConfirmAction(null);
    };

    const handleBlogSubmit = async (blogData) => {
        try { await addPostToContext(blogData); closeModal(); }
        catch (error) { console.error("Failed to save blog post:", error.response?.data?.message || error.message); }
    };

    const handleProfileUpdate = (updatedProfile) => {

        setCurrentUser(updatedProfile);
        closeModal();
    };

    const handleFollow = () => {

    };

    const closeModal = () => setModalContent(null);
    const openModal = (type, data) => {
        let modalData = { ...data };
        if (type === 'search') { modalData = { ...data, allUsers: allUsers, blogs: posts }; }
        else if (type === 'likers' && Array.isArray(data)) { const likerIds = data.map(like => typeof like === 'string' ? like : (like._id || like.id)).filter(Boolean); modalData = allUsers.filter(u => likerIds.includes(u._id || u.id)); }
        else if ((type === 'followers' || type === 'following') && data && Array.isArray(data.list)) { const userIds = data.list.map(item => typeof item === 'string' ? item : (item._id || item.id)).filter(Boolean); const userList = allUsers.filter(u => userIds.includes(u._id || u.id)); modalData = { ...data, list: userList }; }
        setModalContent({ type, data: modalData });
    };

    const navigateToProfile = (userToNav) => {
        closeModal();


        // Extract user ID - handle both string and ObjectId
        let userId = userToNav?.id || userToNav?._id;

        // Convert ObjectId to string if needed
        if (userId && typeof userId === 'object' && userId.toString) {
            userId = userId.toString();
        }

        // Also handle if the entire userToNav is just an ID string
        if (typeof userToNav === 'string') {
            userId = userToNav;
        }



        if (userId && (typeof userId === 'string' || typeof userId === 'number')) {
            const finalId = String(userId);
            navigate(`/profile/${finalId}`);
        } else {
            console.error("Cannot navigate: Invalid user object or could not extract ID.", userToNav);
            console.error("User object structure:", JSON.stringify(userToNav, null, 2));
            alert("Could not navigate to profile. Invalid user data.");
        }
    };

    if (contextLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-background">
                <Spinner />
            </div>
        );
    }

    if (!currentUser) {
        return <div className="pt-24 text-center text-lg text-text-secondary">Please log in to view the dashboard.</div>;
    }

    const dashboardBgUrl = 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg';

    return (
        <div className="relative min-h-screen isolate">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center opacity-15"
                style={{ backgroundImage: `url(${dashboardBgUrl})` }}
                aria-hidden="true"
            />
            <div className="relative z-0">
                <DashboardView
                    blogs={feedPosts}
                    currentUser={currentUser}
                    allUsers={allUsers}
                    visibleBlogs={visibleBlogs}
                    setVisibleBlogs={setVisibleBlogs}
                    handleLike={handleLike}
                    handleComment={handleComment}
                    handleDelete={handleDelete}
                    openModal={openModal}
                    navigateTo={navigateToProfile}
                    onFollow={handleFollow}
                    onUpdateComment={handleUpdateComment}
                    onDeleteComment={handleDeleteComment}
                />
                {modalContent && (
                    <Modal onClose={closeModal} title={modalContent.type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} size={modalContent.type === 'createPost' || modalContent.type === 'editProfile' ? 'xl' : 'md'}>
                        <ModalContent
                            type={modalContent.type}
                            data={modalContent.data}
                            onSaveBlog={handleBlogSubmit}
                            onSaveProfile={handleProfileUpdate}
                            onClose={closeModal}
                            currentUser={currentUser}
                            onFollow={handleFollow}
                            onProfileClick={navigateToProfile}
                            allUsers={allUsers}
                            openModal={openModal}
                            blogs={posts}
                        />
                    </Modal>
                )}
                <ConfirmationModal
                    isOpen={confirmModalOpen}
                    onClose={handleCancelConfirm}
                    onConfirm={handleConfirm}
                    title="Confirm Deletion"
                    message={confirmMessage}
                    confirmText="Delete"
                />
            </div>
        </div>
    );
}