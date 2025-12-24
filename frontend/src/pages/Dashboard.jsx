import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Create Group",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      path: "/create-group"
    },
    {
      title: "Add Member",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      path: "/add-member"
    },
    {
      title: "Add Expense",
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105",
      path: "/add-expense"
    },
    {
      title: "View Groups",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      path: "/groups"
    }
  ];
return (
  <div className="page-bg bg-dashboard">
    
    {/*  HEADER (TOP ONLY) */}
   
    {/*  CONTENT (CENTER ONLY) */}
    <div className="dashboard-content">
      <div className="dashboard-grid">
        {cards.map((card) => (
          <div
            key={card.title}
            className="dashboard-card"
            onClick={() => navigate(card.path)}
          >
            <img src={card.image} alt={card.title} />
            <div className="dashboard-overlay" />
            <div className="dashboard-title">{card.title}</div>
            <div className="dashboard-arrow">→</div>
          </div>
        ))}
      </div>
    </div>

  </div>
);


  
}

export default Dashboard;
