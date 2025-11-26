import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminUser, employeeUsers } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const item = window.localStorage.getItem('currentUser');
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
    }
  });
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    try {
      if (currentUser) {
        window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        window.localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [currentUser]);

  const login = (role, id, password) => {
    if (role === 'admin') {
      if (adminUser.id === id && adminUser.password === password) {
        setCurrentUser(adminUser);
        navigate('/dashboard/admin');
        return true;
      }
    } else if (role === 'employee') {
      const employee = employeeUsers.find(
        (emp) =>
          (emp.professionalDetails.employmentCode === id ||
            emp.professionalDetails.companyMail === id) &&
          emp.password === password
      );
      if (employee) {
        setCurrentUser(employee);
        navigate('/dashboard/employee');
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const signup = (name, adminId, password) => {
    console.log('--- NEW ADMIN SIGNUP ---');
    console.log('Name:', name);
    console.log('Admin ID (Email):', adminId);
    console.log('Password:', password);
    console.log('Role:', 'admin');
    console.log('--------------------------');
    
    showToast('Signup successful! Please log in.', 'success');
    navigate('/login/admin?signup=success');
    return true;
  };

  const value = { currentUser, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};