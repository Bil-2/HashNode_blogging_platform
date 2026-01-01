import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAuth';
import Button from '../components/common/Button';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Technology');
    const [imageUrl, setImageUrl] = useState('https://placehold.co/800x400/1B263B/E0E1DD?text=New+Post');
    const [isLoading, setIsLoading] = useState(false);
    const { addPost } = useAppContext();
    const navigate = useNavigate();

    const categories = ['Technology', 'Travel', 'Lifestyle', 'Finance', 'Health', 'Food', 'Business', 'Education', 'Entertainment', 'Sports', 'Other'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const newPostData = {
                title,
                content,
                category,
                imageUrl,
                status: 'published',
                publishedAt: new Date()
            };

            await addPost(newPostData);

            navigate('/dashboard');
        } catch (err) {
            console.error("Failed to create post", err);
            const errorMessage = err.response?.data?.errors
                ? err.response.data.errors.map(e => `${e.field}: ${e.message}`).join('\n')
                : (err.response?.data?.message || err.message);
            alert('Failed to create post:\n\n' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="bg-glass backdrop-blur-md rounded-xl shadow-lg border border-glass p-6 sm:p-10">
                <h1 className="text-3xl font-bold text-text-primary mb-6">Create a New Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-text-secondary">Title</label>
                        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-glass bg-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-text-primary" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-text-secondary">Category</label>
                        <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-glass bg-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-text-primary">
                            {categories.map((cat) => (
                                <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary">Image URL (Optional)</label>
                        <input type="text" name="imageUrl" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-glass bg-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-text-primary" />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-text-secondary">
                            Content (minimum 10 characters)
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            rows="10"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            minLength={10}
                            className="mt-1 block w-full px-3 py-2 border border-glass bg-transparent rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-text-primary"
                        ></textarea>
                        <p className="mt-1 text-xs text-text-secondary">
                            {content.length} / 50,000 characters {content.length < 10 && `(${10 - content.length} more needed)`}
                        </p>
                    </div>
                    <div><Button type="submit" isLoading={isLoading}>Publish Post</Button></div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostPage;