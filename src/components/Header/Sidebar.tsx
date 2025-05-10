import { motion, AnimatePresence } from "framer-motion";
import { LinksToPages } from "./LinksToPages";
import { SingUp } from "./SingUp";
import { Logo } from "./Logo";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-50 shadow-lg flex flex-col items-center"
          >
            <div className="justify-between flex flex-col items-center h-full w-full">
              <div className="shadow-md w-full ps-[1rem]">
                <Logo />
              </div>
              <LinksToPages />
              <SingUp />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
