"use client";

import { getUsers } from "@/common/api/admin/dashboard";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaUser,
  FaSearch,
  FaCrown,
  FaUsers,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import Image from "next/image";

export const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "USER" | "ADMIN">("ALL");

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const filteredUsers =
    users?.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    }) || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <FaUsers size={64} className="text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to load users list
          </h2>
          <p className="text-gray-600 text-center">Failed to load users list</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaUsers size={32} className="text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Users management</h1>
        </div>
        <div className="text-sm text-gray-500">
          Total: {users?.length || 0} users
        </div>
      </div>

      <div className="mb-6 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value as "ALL" | "USER" | "ADMIN")
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="ALL">All roles</option>
          <option value="USER">Users</option>
          <option value="ADMIN">Admins</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <FaUser className="text-blue-600" />
            <div>
              <p className="text-sm text-blue-800">Users</p>
              <p className="text-xl font-bold text-blue-600">
                {users?.filter((u) => u.role === "USER").length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2">
            <FaCrown className="text-purple-600" />
            <div>
              <p className="text-sm text-purple-800">Admins</p>
              <p className="text-xl font-bold text-purple-600">
                {users?.filter((u) => u.role === "ADMIN").length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <FaEye className="text-green-600" />
            <div>
              <p className="text-sm text-green-800">Filtered</p>
              <p className="text-xl font-bold text-green-600">
                {filteredUsers.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <FaUsers className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 text-lg">
            {searchTerm || roleFilter !== "ALL" ? "No users found" : "No users"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.fullName}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {user.fullName}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}
                >
                  {user.role === "ADMIN" ? (
                    <FaCrown size={10} />
                  ) : (
                    <FaUser size={10} />
                  )}
                  {user.role === "ADMIN" ? "Admin" : "User"}
                </span>
              </div>

              {user.bonuses !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bonuses:</span>
                    <span className="font-medium text-green-600">
                      {user.bonuses} points
                    </span>
                  </div>
                </div>
              )}

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <FaEdit size={14} />
                Edit
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
