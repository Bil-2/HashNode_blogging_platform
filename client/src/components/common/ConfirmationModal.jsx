import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title = "Confirm Action", message = "Are you sure you want to proceed?", confirmText = "Confirm", cancelText = "Cancel", isLoading = false }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Modal onClose={onClose} title={title} size="md">
            <div className="text-text-primary">
                <p className="mb-6 text-text-secondary">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 font-semibold text-text-primary transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {cancelText}
                    </button>
                    <Button
                        onClick={onConfirm}
                        isLoading={isLoading}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;