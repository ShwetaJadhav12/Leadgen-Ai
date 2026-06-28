import {
  LayoutDashboard,
  Users,
  Megaphone,
  Send,
  Bot,
  MessageCircle,
  User,
  FileText,
  Puzzle
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Leads", icon: Users, path: "/leads" },
  { name: "Campaigns", icon: Megaphone, path: "/campaigns" },
  { name: "Outreach", icon: Send, path: "/outreach" },
  { name: "AI Assistant", icon: Bot, path: "/assistant" },
  { name: "Reply Analysis", icon: MessageCircle, path: "/reply-analysis" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Documents", icon: FileText, path: "/documents" },
  { name: "Chrome Extension", icon: Puzzle, path: "/extension" }
];

export default function Sidebar() {
  return (
    <div className="w-72 bg-white border-r min-h-screen">

      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-violet-600">
          LeadGen AI
        </h1>
      </div>

      <nav className="p-4 space-y-2">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition
              ${
                isActive
                  ? "bg-violet-100 text-violet-600"
                  : "hover:bg-gray-100"
              }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}

      </nav>

    </div>
  );
}