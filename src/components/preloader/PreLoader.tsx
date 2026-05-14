import React from 'react';

const PreLoader: React.FC = () => {
    return (
        <div className="light-preloader">
            {/* Background Pattern */}
            <div className="bg-pattern"></div>

            {/* Main Content */}
            <div className="content-wrapper">
                {/* Logo/Brand Area */}
                <div className="brand-section">
                    <div className="brand-icon">
                        <div className="icon-circle">
                            <span className="icon-symbol">⚡</span>
                        </div>
                    </div>
                    <h1 className="brand-title">Fresh Flow</h1>
                </div>

                {/* Loading Animation */}
                <div className="loading-animation">
                    <div className="spinner-wrapper">
                        <div className="spinner">
                            <div className="spinner-sector spinner-1"></div>
                            <div className="spinner-sector spinner-2"></div>
                            <div className="spinner-sector spinner-3"></div>
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="loading-text">
                    <h2>Loading</h2>
                    <p>Please wait while we set up your workspace</p>

                    {/* Animated Dots */}
                    <div className="dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>

                {/* Progress Section */}
                <div className="progress-section">
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                    <span className="progress-text">Initializing...</span>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="decorations">
                <div className="decoration-1"></div>
                <div className="decoration-2"></div>
                <div className="decoration-3"></div>
            </div>
        </div>
    );
};

export default PreLoader;