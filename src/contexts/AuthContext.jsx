import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = authService.getCurrentUser();
    if (saved) {
      setUser(saved);
    }
  }, []);

  const loginTeacher = async (schoolCode, email, password) => {
    setLoading(true);
    try {
      const teacher = await authService.loginTeacher(schoolCode, email, password);
      setUser(teacher);
      return teacher;
    } finally {
      setLoading(false);
    }
  };

  const loginStudent = async (schoolCode, studentId, password) => {
    setLoading(true);
    try {
      const student = await authService.loginStudent(schoolCode, studentId, password);
      setUser(student);
      return student;
    } finally {
      setLoading(false);
    }
  };

  const loginParent = async (email, password) => {
    setLoading(true);
    try {
      const parent = await authService.loginParent(email, password);
      setUser(parent);
      return parent;
    } finally {
      setLoading(false);
    }
  };

  const signupParent = async (payload) => {
    setLoading(true);
    try {
      const parent = await authService.signupParent(payload);
      setUser(parent);
      return parent;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: Boolean(user),
        loading,
        loginTeacher,
        loginStudent,
        loginParent,
        signupParent,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;

