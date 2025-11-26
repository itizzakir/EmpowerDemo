// src/components/common/Toast.jsx
import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Toast;
