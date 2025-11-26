import React, { useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/common/Logo';

const LoginPage = () => {
  const { role } = useParams(); // 'admin' or 'employee'
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // ✨ Check for signup success query param
  const [searchParams] = useSearchParams();
  const signupSuccess = searchParams.get('signup') === 'success';

  const title = role === 'admin' ? 'Admin Login' : 'Employee Login';
  const idLabel =
    role === 'admin' ? 'Admin ID' : 'Employment Code or Company Email';

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(role, id, password);
    if (success) {
      showToast('Login successful!', 'success');
    } else {
      showToast('Invalid credentials. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">
          {title}
        </h2>
        
        {/* ✨ Display success message */}
        {signupSuccess && (
          <p className="text-sm text-green-600 text-center mb-4">
            Signup successful! Please log in.
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... (rest of the form is unchanged) ... */}
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-slate-700"
            >
              {idLabel}
            </label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-6 px-3 flex items-center text-sm text-slate-500 hover:text-slate-700"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg"
          >
            Log In
          </button>
        </form>
        
        <div className="text-center mt-6 space-y-2">
          {role === 'admin' && (
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/signup/admin" className="font-medium text-purple-600 hover:text-purple-800">
                Sign up
              </Link>
            </p>
          )}
          <Link to="/" className="text-sm text-purple-600 hover:text-purple-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


          