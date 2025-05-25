"use client";

import { useState } from "react";
import { FaCar, FaUsers, FaChartBar, FaPlus } from "react-icons/fa";
import { CreateCarForm } from "./CreateCarForm";
import { CreateCarFormData } from "@/common/validation/schemas/car";
import { Dashboard } from "./Dashboard";
import { Users } from "./Users";
import { ManageCars } from "./ManageCars";

type AdminSection = "dashboard" | "create-car" | "manage-cars" | "users";

interface AdminPanelProps {
  onCreateCar?: (data: CreateCarFormData) => void;
  isCreatingCar?: boolean;
  onDeleteCar?: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onCreateCar, 
  isCreatingCar = false,
  onDeleteCar
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

  const menuItems = [
    { id: "dashboard" as AdminSection, label: "Dashboard", icon: <FaChartBar /> },
    { id: "create-car" as AdminSection, label: "Create car", icon: <FaPlus /> },
    { id: "manage-cars" as AdminSection, label: "Manage cars", icon: <FaCar /> },
    { id: "users" as AdminSection, label: "Users", icon: <FaUsers /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "create-car":
        return (
          <CreateCarForm
            onSubmit={(data) => {
              if (onCreateCar) {
                onCreateCar(data);
              }
            }}
            isLoading={isCreatingCar}
          />
        );
      case "dashboard":
        return (
            <Dashboard />
        );
        case "manage-cars":
        return (
          <ManageCars onDeleteCar={onDeleteCar}   />
        );
      case "users":
        return (
        <Users />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Admin panel</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}; 