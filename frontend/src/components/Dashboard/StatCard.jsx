import React from "react";

export default function StatCard({ title, children, color = "blue", className = "" }) {
    // Map color names to Tailwind classes
    const colorMap = {
        blue: "bg-blue-50 border-blue-100 text-blue-700",
        rose: "bg-rose-50 border-rose-100 text-rose-700",
        amber: "bg-amber-50 border-amber-100 text-amber-700",
        emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
        purple: "bg-purple-50 border-purple-100 text-purple-700",
    };

    const headerColors = {
        blue: "bg-blue-100/50",
        rose: "bg-rose-100/50",
        amber: "bg-amber-100/50",
        emerald: "bg-emerald-100/50",
        purple: "bg-purple-100/50",
    };

    const themeClass = colorMap[color] || colorMap.blue;
    const headerClass = headerColors[color] || headerColors.blue;

    return (
        <div className={`rounded-2xl border shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md ${themeClass} ${className}`}>
            <div className={`px-4 py-3 border-b border-inherit font-bold uppercase tracking-wider text-xs flex justify-between items-center ${headerClass} rounded-t-2xl`}>
                {title}
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    );
}
