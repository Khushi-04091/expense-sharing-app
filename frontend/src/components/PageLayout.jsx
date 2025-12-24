function PageLayout({ title, bgClass, children }) {
  return (
    <div className={`page-bg ${bgClass}`}>
      
      {}
      <div className="top-bar">
        <div className="page-badge">{title}</div>

        {}
        <div className="app-title">
          Expense Sharing Application
        </div>

        <button className="logout-btn">Logout</button>
      </div>

      {children}
    </div>
  );
}

export default PageLayout;
