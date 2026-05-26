import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-0 sm:pt-4 sm:pb-4 md:pt-8 md:pb-8 font-sans">
      {/* Mobile container constraint */}
      <div className="w-full h-screen sm:h-[850px] max-w-[400px] bg-white sm:rounded-[40px] sm:shadow-2xl sm:border sm:border-gray-200 overflow-hidden relative flex flex-col z-0">
        
        {/* Global Clean Animated Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4], x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] sm:w-[500px] sm:h-[500px] rounded-full bg-[#D1FAE5] filter blur-[80px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3], x: [0, -30, 0], y: [0, -40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] -left-[20%] w-[70vw] h-[70vw] sm:w-[400px] sm:h-[400px] rounded-full bg-[#ECFDF5] filter blur-[80px]"
          />
        </div>

        {/* Fake iOS status bar area */}
        <div className="hidden sm:flex h-6 w-full items-center justify-center bg-transparent absolute top-0 z-50 pointer-events-none">
          <div className="w-1/3 h-5 bg-black rounded-b-xl opacity-10"></div>
        </div>
        
        {/* Main Content Area - scrollable */}
        <div className="flex-1 overflow-y-auto w-full h-full relative scroll-smooth z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
