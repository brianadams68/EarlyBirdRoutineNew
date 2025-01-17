import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full p-4 transition duration-300 ${isHomePage ? (isScrolled ? 'bg-white shadow-md' : 'bg-transparent') : 'bg-blue-500'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className={`text-lg font-bold ${isHomePage && !isScrolled ? 'text-white' : 'text-black'}`}>
          EarlyBird Routine
        </Link>
        <div className="space-x-4">
          <Link href="/" className={isHomePage && !isScrolled ? 'text-white' : 'text-black'}>
            Home
          </Link>
          <Link href="/routine" className={isHomePage && !isScrolled ? 'text-white' : 'text-black'}>
            Get Routine
          </Link>
          <Link href="/contact" className={isHomePage && !isScrolled ? 'text-white' : 'text-black'}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;