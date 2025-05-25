import { UserProfile } from "@/common/api/users/types";
import { LINKS } from "@/common/constants/Globals/Links";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

interface MiniProfileProps {
  userProfile: UserProfile;
  onSignOut: () => void;
}

export const MiniProfile = ({ userProfile, onSignOut }: MiniProfileProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    setIsDropdownOpen(false);
    onSignOut();
  };

  return (
    <div className="flex items-center gap-x-2">
      <span className="text-black text-xl font-semibold">
        {userProfile.fullName}
      </span>
      {userProfile.avatar ? (
        <Image
          src={userProfile.avatar}
          className="rounded-full cursor-pointer "
          alt="User avatar"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          width={28}
          height={28}
        />
      ) : (
        <FaRegUserCircle
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-balance cursor-pointer"
          size={28}
        />
      )}
      {isDropdownOpen && (
        <div className="relative inline-block text-left">
          <div
            className="absolute right-0 z-100 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div role="none">
              <p
                className="block px-4 py-2 text-sm text-gray-500 border-b-1 border-gray-300"
                role="menuitem"
                tabIndex={-1}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                id="menu-item-1"
              >
                Signed in as {userProfile.email}
              </p>
              <Link
                href={LINKS.PROFILE}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white cursor-pointer"
                role="menuitem"
                tabIndex={-1}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                id="menu-item-0"
              >
                Profile
              </Link>

              {userProfile.role === "ADMIN" && (
                <Link
                  href={LINKS.ADMIN}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-500 hover:text-white cursor-pointer"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  id="menu-item-2"
                >
                  Admin Panel
                </Link>
              )}

              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-500 hover:text-white cursor-pointer  font-semibold rounded-b-md"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
