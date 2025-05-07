'use client';

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faCat } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots, faUser } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center mr-2">
            <Image
              src="/audicia-logo.png"
              alt="Audicia Logo"
              width={32}
              height={32}
            />
          </div>
          <span className="font-bold text-xl text-orange-500">Audicia</span>
        </div>

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>

        <div className={`flex-col md:flex-row md:flex md:items-center space-y-2 md:space-y-0 md:space-x-2 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-4 md:px-0 ${isMenuOpen ? "flex" : "hidden"}`}>
          <Link
            href="/scenarios"
            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2 w-5 h-5" />
            Beranda
          </Link>

          <Link
            href="/faq"
            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faCommentDots} className="mr-2 w-5 h-5" />
            Pertanyaan
          </Link>

          <Link
            href="/profile"
            className="flex items-center px-4 py-2 rounded-lg text-black font-bold hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2 w-5 h-5" />
            Profil
          </Link>

          <Link
            href="/my-tiger"
            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faCat} className="text-orange-500 mr-2 w-5 h-5" />
            Harimau Saya
            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Lvl 5
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
