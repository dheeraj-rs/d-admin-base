export default function HomePage() {
    return (
        <div className="page-content">
            <h1>Welcome to D-Admin</h1>
            <p>Professional admin dashboard with world-class layout system</p>

            <div className="overview-grid">
                <div className="overview-card">
                    <i className="pi pi-chart-line" />
                    <h3>Analytics</h3>
                    <p>View your website analytics and performance metrics</p>
                </div>
                <div className="overview-card">
                    <i className="pi pi-users" />
                    <h3>Users</h3>
                    <p>Manage users and permissions</p>
                </div>
                <div className="overview-card">
                    <i className="pi pi-globe" />
                    <h3>Websites</h3>
                    <p>Your managed websites</p>
                </div>
                <div className="overview-card">
                    <i className="pi pi-cog" />
                    <h3>Settings</h3>
                    <p>Configure your preferences</p>
                </div>
            </div>
        </div>
    );
}