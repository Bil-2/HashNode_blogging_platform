
import React from 'react';
import BlogPost from '../components/post/BlogPost';
import ProfileCard from '../components/profile/ProfileCard';
import { NewPostCard, SearchCard, TrendingCard, SuggestionsCard } from '../components/dashboard/SidebarComponents';

const DashboardView = ({ blogs = [], currentUser, allUsers = [], visibleBlogs, setVisibleBlogs, handleLike,
    handleComment, handleDelete, openModal, navigateTo, onUpdateComment, onDeleteComment }) => {

    if (!currentUser) {
        return (
            <main className="container mx-auto p-3 sm:p-4 md:px-6 pt-20 sm:pt-24 md:pt-28">
                <div className="text-center text-text-secondary text-sm sm:text-base">
                    <p>Loading user data...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto p-3 sm:p-4 md:px-6 pt-20 sm:pt-24 md:pt-28">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {/* Sidebar - Visible only on desktop, togglable on mobile */}
                <aside className="hidden md:block md:col-span-1">
                    <div className="sticky top-24 space-y-6 sm:space-y-8">
                        <NewPostCard onNewPostClick={() => openModal('createPost')} />
                        <SearchCard onSearch={(query) => openModal('search', { query, allUsers, blogs })} />
                        <TrendingCard />
                    </div>
                </aside>

                {/* Main Feed */}
                <div className="md:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Mobile Sidebar Cards */}
                    <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div onClick={() => openModal('createPost')} className="bg-glass border border-glass rounded-lg p-4 cursor-pointer hover:bg-white/10 transition">
                            <p className="text-sm font-semibold text-text-primary">+ New Post</p>
                        </div>
                        <div onClick={() => openModal('search', { query: '', allUsers, blogs })} className="bg-glass border border-glass rounded-lg p-4 cursor-pointer hover:bg-white/10 transition">
                            <p className="text-sm font-semibold text-text-primary">🔍 Search</p>
                        </div>
                    </div>

                    {blogs.slice(0, visibleBlogs).map((blog, index) => (
                        <BlogPost
                            key={blog.id}
                            blog={blog}
                            currentUser={currentUser}
                            onLike={handleLike}
                            onComment={handleComment}
                            onEdit={(b) => openModal('createPost', b)}
                            onDelete={handleDelete}
                            onShare={() => openModal('share', blog)}
                            onLikersClick={() => openModal('likers', blog.likes)}
                            onProfileClick={navigateTo}
                            index={index}
                            onUpdateComment={onUpdateComment}
                            onDeleteComment={onDeleteComment}
                        />
                    ))}
                    {blogs.length > 0 && visibleBlogs < blogs.length && (
                        <div className="text-center py-6 sm:py-8">
                            <button onClick={() => setVisibleBlogs(p => p + 5)} className="bg-white/20 backdrop-blur-lg border border-white/30 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:bg-white/30 transition-all text-sm sm:text-base">
                                Load More Blogs
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Profile and Suggestions */}
                <aside className="hidden md:block lg:col-span-1">
                    <div className="sticky top-24 space-y-6 sm:space-y-8">
                        <ProfileCard
                            user={currentUser}
                            onProfileClick={() => navigateTo(currentUser)}
                            onFollowersClick={() => openModal('followers', { title: 'Followers', list: currentUser?.followers || [], allUsers })}
                            onFollowingClick={() => openModal('following', { title: 'Following', list: currentUser?.following || [], allUsers })}
                        />
                        <SuggestionsCard blogs={blogs} currentUser={currentUser} navigateTo={navigateTo} />
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default DashboardView;