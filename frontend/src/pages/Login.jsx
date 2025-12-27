import React, { useState } from 'react';

import { Eye, EyeOff, AlertCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, loginWithProvider } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            const result = login(email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message);
                setIsLoading(false);
            }
        }, 800);
    };

    const handleSocialLogin = (provider) => {
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            const result = loginWithProvider(provider);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message);
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 font-sans overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse-slow delay-1000"></div>
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-emerald-600/10 blur-[100px]"></div>

                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            <div className="relative w-full max-w-5xl h-[650px] rounded-3xl flex overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-2xl">

                {/* Left Side - Hero Image */}
                <div className="w-5/12 relative hidden md:block group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=2070&auto=format&fit=crop"
                        alt="Abstract Glass"
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80"
                    />

                    <div className="absolute top-8 left-8 z-20 flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 backdrop-blur-md border border-blue-500/30">
                            <Zap size={18} fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Hexa<span className="text-blue-500">.</span></span>
                    </div>

                    <div className="absolute bottom-12 left-10 right-10 z-20">
                        <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-medium text-blue-300 mb-4 shadow-sm">
                            V2.0 Is Live
                        </div>
                        <h2 className="text-3xl font-bold leading-tight text-white mb-4">
                            Master your habits,<br />Control your wealth.
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Experience the transparency of full financial control combined with the power of habit tracking.
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col justify-center relative">
                    {/* Glass Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none"></div>

                    <div className="max-w-sm mx-auto w-full relative z-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-gray-400 text-sm">Sign in to your dashboard</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200 text-xs backdrop-blur-md animate-in slide-in-from-top-2">
                                <AlertCircle size={16} className="shrink-0" /> {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="group">
                                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Email Address</label>
                                <div className="bg-white/[0.03] rounded-xl border border-white/10 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                                    <input
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent px-4 py-3.5 outline-none text-sm placeholder:text-gray-600 text-white font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-center mb-1.5 ml-1">
                                    <label className="block text-xs font-medium text-gray-500">Password</label>
                                    <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot?</a>
                                </div>
                                <div className="bg-white/[0.03] rounded-xl border border-white/10 focus-within:border-blue-500/50 focus-within:bg-white/[0.05] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 flex items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="admin"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent px-4 py-3.5 outline-none text-sm placeholder:text-gray-600 text-white font-medium"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-4 text-gray-500 hover:text-gray-300 transition-colors">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Signing in...
                                    </>
                                ) : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-8 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                                <span className="bg-[#121215] px-3 text-gray-600 rounded-full border border-white/5">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button
                                onClick={() => handleSocialLogin('Google')}
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all text-sm font-medium text-gray-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                                Google
                            </button>
                            <button
                                onClick={() => handleSocialLogin('Apple')}
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all text-sm font-medium text-gray-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" /></svg>
                                Apple
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
