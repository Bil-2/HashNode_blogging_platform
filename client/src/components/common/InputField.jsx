import React from 'react';

const InputField = ({ label, name, value, onChange, placeholder, isTextarea = false, minLength, maxLength, showCount = false }) => (
    <div>
        <label className="block text-sm font-medium text-white/70">
            {label}
            {minLength && ` (min ${minLength} characters)`}
        </label>
        {isTextarea ? (
            <>
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows="3"
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLength}
                    className="mt-1 w-full p-2 bg-white/10 rounded-md border-2 border-transparent focus:border-indigo-500 focus:bg-white/20 outline-none transition"
                />
                {showCount && (
                    <p className="mt-1 text-xs text-white/50">
                        {value?.length || 0} {maxLength && `/ ${maxLength}`} characters
                        {minLength && value?.length < minLength && ` (${minLength - (value?.length || 0)} more needed)`}
                    </p>
                )}
            </>
        ) : (
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                className="mt-1 w-full p-2 bg-white/10 rounded-md border-2 border-transparent focus:border-indigo-500 focus:bg-white/20 outline-none transition"
            />
        )}
    </div>
);

export default InputField;