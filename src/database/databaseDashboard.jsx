import { useState } from 'react';
import "../styles/database-dashboard.css";
import { mmv_logo_round } from '../assets';

const DatabaseDashboard = () => {
    const [activeTab, setActiveTab] = useState('health');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);
    const [pagination, setPagination] = useState({ limit: 50, offset: 0, total: 0 });

    // Fetch database health
    const fetchHealth = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/db-health');
            const result = await response.json();
            setStats(result);
            setData([]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch contacts
    const fetchContacts = async (offset = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/get-contacts?limit=${pagination.limit}&offset=${offset}`);
            const result = await response.json();
            setData(result.data || []);
            setPagination({ ...pagination, offset, total: result.total || 0 });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch error logs
    const fetchErrorLogs = async (offset = 0, severity = '') => {
        setLoading(true);
        setError(null);
        try {
            const severityParam = severity ? `&severity=${severity}` : '';
            const response = await fetch(`/api/get-error-logs?limit=${pagination.limit}&offset=${offset}${severityParam}`);
            const result = await response.json();
            setData(result.data || []);
            setPagination({ ...pagination, offset, total: result.total || 0 });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch referrals
    const fetchReferrals = async (offset = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/get-all-referrals?limit=${pagination.limit}&offset=${offset}`);
            const result = await response.json();
            setData(result.data || []);
            setPagination({ ...pagination, offset, total: result.total || 0 });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setData([]);
        setStats(null);
        setPagination({ ...pagination, offset: 0 });

        // Auto-fetch when tab changes
        if (tab === 'health') fetchHealth();
        else if (tab === 'contacts') fetchContacts(0);
        else if (tab === 'errors') fetchErrorLogs(0);
        else if (tab === 'referrals') fetchReferrals(0);
    };

    // Handle pagination
    const handlePrevPage = () => {
        const newOffset = Math.max(0, pagination.offset - pagination.limit);
        if (activeTab === 'contacts') fetchContacts(newOffset);
        else if (activeTab === 'errors') fetchErrorLogs(newOffset);
        else if (activeTab === 'referrals') fetchReferrals(newOffset);
    };

    const handleNextPage = () => {
        const newOffset = pagination.offset + pagination.limit;
        if (newOffset < pagination.total) {
            if (activeTab === 'contacts') fetchContacts(newOffset);
            else if (activeTab === 'errors') fetchErrorLogs(newOffset);
            else if (activeTab === 'referrals') fetchReferrals(newOffset);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    // Truncate text
    const truncate = (text, length = 50) => {
        if (!text) return 'N/A';
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <div className="mmv-db-dashboard">
            <div className="mmv-db-header">
                <h1> <img src={mmv_logo_round} width="35px" alt="" /> Database Dashboard</h1>
                <p>Access your Supabase data - Contacts, Errors & Referrals</p>
            </div>

            {/* Tabs */}
            <div className="mmv-db-tabs">
                <button
                    className={`mmv-db-tab ${activeTab === 'health' ? 'mmv-active' : ''}`}
                    onClick={() => handleTabChange('health')}>
                    📊 Health Check
                </button>
                <button
                    className={`mmv-db-tab ${activeTab === 'contacts' ? 'mmv-active' : ''}`}
                    onClick={() => handleTabChange('contacts')}>
                    📧 Contacts
                </button>
                <button
                    className={`mmv-db-tab ${activeTab === 'errors' ? 'mmv-active' : ''}`}
                    onClick={() => handleTabChange('errors')}>
                    ❌ Error Logs
                </button>
                <button
                    className={`mmv-db-tab ${activeTab === 'referrals' ? 'mmv-active' : ''}`}
                    onClick={() => handleTabChange('referrals')}>
                    👥 Referrals
                </button>
            </div>

            {/* Content Area */}
            <div className="mmv-db-content">
                {/* Loading State */}
                {loading && (
                    <div className="mmv-db-loading">
                        <div className="mmv-db-spinner"></div>
                        <p>Loading data...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="mmv-db-error-message">
                        <p>❌ Error: {error}</p>
                    </div>
                )}

                {/* Health Check View */}
                {activeTab === 'health' && stats && !loading && (
                    <div className="mmv-db-health-view">
                        <div className="mmv-db-health-card">
                            <h3>Database Status: <span className={`mmv-db-status ${stats.status}`}>{stats.status?.toUpperCase()}</span></h3>
                            <p>Response Time: {stats.responseTime}</p>
                            <p>Last Checked: {new Date(stats.timestamp).toLocaleString()}</p>
                        </div>

                        <div className="mmv-db-tables-grid">
                            <div className="mmv-db-table-card">
                                <h4>📧 Contacts</h4>
                                <p className="mmv-db-count">{stats.tables?.contacts?.count || 0}</p>
                                <p className="mmv-db-card-status">{stats.tables?.contacts?.status}</p>
                            </div>
                            <div className="mmv-db-table-card">
                                <h4>❌ Error Logs</h4>
                                <p className="mmv-db-count">{stats.tables?.error_logs?.count || 0}</p>
                                <p className="mmv-db-card-status">{stats.tables?.error_logs?.status}</p>
                            </div>
                            <div className="mmv-db-table-card">
                                <h4>👥 Referrals</h4>
                                <p className="mmv-db-count">{stats.tables?.referrals?.count || 0}</p>
                                <p className="mmv-db-card-status">{stats.tables?.referrals?.status}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contacts Table */}
                {activeTab === 'contacts' && data.length > 0 && !loading && (
                    <div className="mmv-db-table-view">
                        <div className="mmv-db-table-header">
                            <h3>📧 Contacts ({pagination.total} total)</h3>
                        </div>
                        <div className="mmv-db-table-container">
                            <table className="mmv-db-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th>IP</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((contact) => (
                                        <tr key={contact.id}>
                                            <td>{contact.id}</td>
                                            <td>{contact.contact_name || 'Anonymous'}</td>
                                            <td>{contact.user_email}</td>
                                            <td title={contact.contact_message}>{truncate(contact.contact_message, 60)}</td>
                                            <td>{contact.contact_ip || 'N/A'}</td>
                                            <td>{formatDate(contact.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Error Logs Table */}
                {activeTab === 'errors' && data.length > 0 && !loading && (
                    <div className="mmv-db-table-view">
                        <div className="mmv-db-table-header">
                            <h3>❌ Error Logs ({pagination.total} total)</h3>
                            <div className="mmv-db-filter-buttons">
                                <button onClick={() => fetchErrorLogs(0, '')}>All</button>
                                <button onClick={() => fetchErrorLogs(0, 'low')}>Low</button>
                                <button onClick={() => fetchErrorLogs(0, 'medium')}>Medium</button>
                                <button onClick={() => fetchErrorLogs(0, 'high')}>High</button>
                                <button onClick={() => fetchErrorLogs(0, 'critical')}>Critical</button>
                            </div>
                        </div>
                        <div className="mmv-db-table-container">
                            <table className="mmv-db-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Severity</th>
                                        <th>Message</th>
                                        <th>Location</th>
                                        <th>Browser</th>
                                        <th>Resolved</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((error) => (
                                        <tr key={error.id}>
                                            <td>{error.id}</td>
                                            <td>
                                                <span className={`mmv-db-severity ${error.severity}`}>
                                                    {error.severity?.toUpperCase()}
                                                </span>
                                            </td>
                                            <td title={error.message}>{truncate(error.message, 50)}</td>
                                            <td>{error.location}</td>
                                            <td>{error.browser}</td>
                                            <td>{error.resolved ? '✅' : '⏳'}</td>
                                            <td>{formatDate(error.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Referrals Table */}
                {activeTab === 'referrals' && data.length > 0 && !loading && (
                    <div className="mmv-db-table-view">
                        <div className="mmv-db-table-header">
                            <h3>👥 Referrals ({pagination.total} total)</h3>
                        </div>
                        <div className="mmv-db-table-container">
                            <table className="mmv-db-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Wallet Address</th>
                                        <th>Referral UID</th>
                                        <th>Referred By</th>
                                        <th>Date Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((referral) => (
                                        <tr key={referral.id}>
                                            <td>{referral.id}</td>
                                            <td className="mmv-db-wallet-address">{referral.wallet_address}</td>
                                            <td>{referral.referral_uid}</td>
                                            <td>{referral.referrer_uid === '0' ? 'Direct' : referral.referrer_uid}</td>
                                            <td>{formatDate(referral.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && data.length === 0 && stats === null && (
                    <div className="mmv-db-empty-state">
                        <p>👆 Select a tab above to view data</p>
                    </div>
                )}

                {/* No Data State */}
                {!loading && !error && data.length === 0 && activeTab !== 'health' && stats === null && (
                    <div className="mmv-db-empty-state">
                        <p>No data found</p>
                    </div>
                )}

                {/* Pagination */}
                {data.length > 0 && activeTab !== 'health' && (
                    <div className="mmv-db-pagination">
                        <button
                            onClick={handlePrevPage}
                            disabled={pagination.offset === 0}>
                            ← Previous
                        </button>
                        <span>
                            Showing {pagination.offset + 1} - {Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={pagination.offset + pagination.limit >= pagination.total}>
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DatabaseDashboard;