import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import { useAppContext } from '../hooks/useAuth';
import Button from '../components/common/Button';

const FormInput = ({ id, label, type, value, onChange, placeholder, required = true }) => (
    <div>
        <label htmlFor={id} className="text-sm font-medium text-text-secondary">{label}</label>
        <input
            id={id}
            name={id}
            type={type}
            required={required}
            value={value}
            onChange={onChange}
            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-glass placeholder-text-secondary text-text-primary bg-transparent rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={placeholder}
        />
    </div>
);

const PasswordInput = ({ id, label, value, onChange, placeholder }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(prev => !prev);

    return (
        <div>
            <label htmlFor={id} className="text-xs sm:text-sm font-medium text-text-secondary">{label}</label>
            <div className="relative mt-1">
                <input
                    id={id}
                    name={id}
                    type={isVisible ? 'text' : 'password'}
                    required
                    value={value}
                    onChange={onChange}
                    autoComplete={id === 'password' ? 'current-password' : id === 'confirmPassword' ? 'new-password' : 'off'}
                    className="appearance-none relative block w-full px-3 py-2 border border-glass placeholder-text-secondary text-text-primary text-sm bg-transparent rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute inset-y-0 right-0 px-2 sm:px-3 flex items-center text-text-secondary hover:text-text-primary transition-colors"
                >
                    {isVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m0 0l-2.117-2.117" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};


const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { login } = useAppContext();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        setMessage('');
        setIsLoading(true);

        try {
            const { user } = await authService.resetPassword(token, password);
            setMessage('Password reset successfully! Logging you in...');

            await login(user.email, password);

            navigate('/dashboard', { replace: true });

        } catch (err) {
            setError(err?.message || 'Failed to reset password. Token might be invalid or expired.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 isolate">
            <div
                className="fixed inset-0 w-full h-full object-cover -z-10 bg-cover bg-center opacity-25"
                style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
                aria-hidden="true"
            />
            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden p-8">
                <h2 className="text-center text-3xl font-extrabold text-text-primary">Reset Your Password</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    {message && <p className="text-green-400 text-center">{message}</p>}

                    <PasswordInput id="password" label="New Password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                    <PasswordInput id="confirmPassword" label="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" />

                    <Button type="submit" isLoading={isLoading} disabled={!!message}>
                        {message ? 'Done!' : 'Reset Password'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;