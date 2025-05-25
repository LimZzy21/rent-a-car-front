"use client";

import { useState } from "react";
import { FaCar, FaUsers, FaChartBar, FaPlus } from "react-icons/fa";
import { CreateCarForm } from "./CreateCarForm";
import { CreateCarFormData } from "@/common/validation/schemas/car";

type AdminSection = "dashboard" | "create-car" | "manage-cars" | "users";

interface AdminPanelProps {
  onCreateCar?: (data: CreateCarFormData) => void;
  isCreatingCar?: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onCreateCar, 
  isCreatingCar = false 
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

  const menuItems = [
    { id: "dashboard" as AdminSection, label: "Dashboard", icon: <FaChartBar /> },
    { id: "create-car" as AdminSection, label: "Створити машину", icon: <FaPlus /> },
    { id: "manage-cars" as AdminSection, label: "Керувати машинами", icon: <FaCar /> },
    { id: "users" as AdminSection, label: "Користувачі", icon: <FaUsers /> },
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
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Адміністративна панель
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Всього машин
                </h3>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Активні оренди
                </h3>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Всього користувачів
                </h3>
                <p className="text-3xl font-bold text-yellow-600">0</p>
              </div>
            </div>
          </div>
        );
      case "manage-cars":
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Керування машинами
            </h1>
            <p className="text-gray-600">
              Тут буде список всіх машин з можливістю редагування та видалення.
            </p>
          </div>
        );
      case "users":
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Керування користувачами
            </h1>
            <p className="text-gray-600">
              Тут буде список всіх користувачів з можливістю керування їхніми ролями.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Бічна панель */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Адмін панель</h2>
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

        {/* Основний контент */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}; 