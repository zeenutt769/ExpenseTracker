import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-white/5 py-10">
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                {/* Brand & Description */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white tracking-tight">Hexa Tracker</h3>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                        Effortlessly track your habits and expenses in one beautiful, dark-themed workspace.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={18} /></a>
                        <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors"><Linkedin size={18} /></a>
                    </div>
                </div>

                {/* Links Sections */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-white">Product</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Changelog</a></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold text-white">Company</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold text-white">Legal</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                <p>&copy; {new Date().getFullYear()} Hexa Tracker. All rights reserved.</p>
                <div className="flex items-center gap-1">
                    <span>Made with</span>
                    <Heart size={12} className="text-red-500 fill-current" />
                    <span>by Hexa Team</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
