import React from 'react';;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            eventId: null
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error Boundary Caught:', error, errorInfo);

        const isDOMError = error?.message?.includes('removeChild') ||
            error?.message?.includes('insertBefore') ||
            error?.message?.includes('not a child');

        if (isDOMError) {
            console.error('🔴 DOM MANIPULATION ERROR DETECTED:', {
                message: error.message,
                stack: error.stack,
                componentStack: errorInfo?.componentStack,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                location: window.location.href
            });
        }

        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log to Supabase via API
        if (import.meta.env.PROD || isDOMError) {
            this.logErrorToAPI(error, errorInfo, isDOMError);
        }
    }

    logErrorToAPI = async (error, errorInfo) => {
        try {
            await fetch('/api/error-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: error?.message || 'Unknown error',
                    stack: error?.stack || null,
                    componentStack: errorInfo?.componentStack || null,
                    location: this.props.location || window.location.pathname,
                    isDOMError,
                    timestamp: new Date().toISOString(),
                    type: 'error_boundary',
                    userAgent: navigator.userAgent,
                    viewport: `${window.innerWidth}x${window.innerHeight}`,
                    connectionStatus: this.props.connectionStatus || 'unknown'
                })
            });
            const result = await response.json();
            if (result.isDOMError) {
                console.warn('⚠️ DOM error logged to database');
            }
        } catch (err) {
            console.error('Failed to log error:', err);
        }
    };

    handleRefresh = () => {
        // Clear error state and reload
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
        window.location.reload();
    };

    handleRetry = () => {
        // Just clear error state without full reload
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        if (this.state.hasError) {
            const isDOMError = this.state.error?.message?.includes('removeChild') ||
                this.state.error?.message?.includes('insertBefore');
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '400px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    borderRadius: '12px',
                    margin: '20px',
                    color: 'white'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                        {isDOMError ? '🔄' : '⚠️'}
                    </div>

                    <h2 style={{
                        fontSize: '24px',
                        marginBottom: '16px',
                        color: '#ff6b6b'
                    }}>
                        {isDOMError ? 'Rendering Issue Detected' : 'Something went wrong'}
                    </h2>

                    <p style={{
                        fontSize: '16px',
                        marginBottom: '24px',
                        maxWidth: '500px',
                        lineHeight: '1.5',
                        color: '#a0a0a0'
                    }}>
                        {isDOMError
                            ? 'A temporary display issue occurred. Refreshing should fix it.'
                            : 'The interface encountered an unexpected error. This might be due to network issues or temporary problems.'
                        }
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <button
                            onClick={this.handleRetry}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                        >
                            {isDOMError ? 'Refresh Page' : 'Try Again'}
                        </button>

                        {!isDOMError && (
                            <button
                                onClick={this.handleRetry}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#2196F3',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
                            >
                                Continue
                            </button>
                        )}
                    </div>

                    {import.meta.env.DEV && this.state.error && (
                        <details style={{
                            marginTop: '24px',
                            maxWidth: '600px',
                            textAlign: 'left'
                        }}>
                            <summary style={{
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#ff9800',
                                marginBottom: '8px'
                            }}>
                                Error Details (Development Only)
                            </summary>
                            <pre style={{
                                background: 'rgba(0,0,0,0.5)',
                                padding: '12px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                overflow: 'auto',
                                maxHeight: '200px',
                                color: '#ffeb3b'
                            }}>
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </details>
                    )}

                    <p style={{
                        fontSize: '12px',
                        color: '#666',
                        marginTop: '24px'
                    }}>
                        If the problem persists, please contact support
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;