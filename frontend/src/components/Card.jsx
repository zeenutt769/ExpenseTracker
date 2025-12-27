import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl ${className}`}>
            {children}
        </div>
    );
};

export default Card;
