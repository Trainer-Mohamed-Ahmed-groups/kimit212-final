import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-2">Page Not Found</p>
            <Link to="/" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Go Home
            </Link>
        </div>
    );
}
