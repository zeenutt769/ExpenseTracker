import React, { useEffect, useRef } from 'react';

const CursorFollower = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const requestRef = useRef(null);
    const cursor = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e) => {
            cursor.current = { x: e.clientX, y: e.clientY };
            // Update dot immediately
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            // Lerp logic for smooth ring following
            const dx = cursor.current.x - ring.current.x;
            const dy = cursor.current.y - ring.current.y;

            ring.current.x += dx * 0.15; // Speed factor (0.1 - 0.2 is good)
            ring.current.y += dy * 0.15;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <>
            {/* Main Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-3 h-3 bg-blue-500 rounded-full pointer-events-none z-[9999] opacity-0 md:opacity-100 mix-blend-screen -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_2px_rgba(59,130,246,0.8)]"
                style={{ willChange: 'transform' }}
            />
            {/* Trailing Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 border border-blue-400/50 rounded-full pointer-events-none z-[9998] opacity-0 md:opacity-100 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                style={{ willChange: 'transform' }}
            />
        </>
    );
};

export default CursorFollower;
