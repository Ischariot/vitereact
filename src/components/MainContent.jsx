import React from 'react';

function MainContent() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h1>Main Content</h1>
                        <p>This is the main content</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;
