import { useEffect, useState } from "react";

export default function Notification({ id, title, reason, onClose, lifetime = 5000 }) {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const onClick = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 300);
    };

    useEffect(() => {
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        const hideTimer = setTimeout(() => {
            onClick();
        }, lifetime);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div
            className={`p-4 pb-0 transition-transform duration-300 ease-in-out ${isExiting ? 'translate-x-full' : isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <svg
                            className="h-8 w-8 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M12 20h0a9 9 0 110-18 9 9 0 010 18z"
                            />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                        <p className="text-lg font-semibold text-gray-900 truncate">{title}</p>
                        <p className="mt-1 text-sm text-gray-600 truncate">{reason}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-start">
                        <button
                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={onClick}
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
