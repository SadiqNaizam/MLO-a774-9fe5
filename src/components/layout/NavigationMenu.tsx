import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X, Search, MapPin } from 'lucide-react'; // Added Search, MapPin
import { Input } from '@/components/ui/input'; // For search input

interface NavigationMenuProps {
  // Props can be added later, e.g., for user state, cart item count
}

const NavigationMenu: React.FC<NavigationMenuProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu, mobile menu open:", isMobileMenuOpen);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Placeholder links - these should be updated based on actual routes
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/restaurants', label: 'Restaurants' },
    { href: '/orders', label: 'My Orders' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Nav Links */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              FoodDash
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar - visible on larger screens */}
          <div className="hidden lg:flex flex-1 max-w-xs mx-4 items-center">
            <Input type="search" placeholder="Search restaurants or dishes..." className="w-full" />
            <Button variant="ghost" size="icon" className="ml-2">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Location - visible on larger screens */}
           <div className="hidden md:flex items-center text-sm text-gray-600 mr-4">
            <MapPin className="h-4 w-4 mr-1 text-orange-500" />
            <span>New York, NY</span> {/* Placeholder location */}
          </div>


          {/* Right side icons & Mobile Menu Button */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/cart">
                <Button variant="ghost" size="icon" aria-label="Cart">
                  <ShoppingCart className="h-6 w-6" />
                </Button>
              </Link>
              <Link to="/account">
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-6 w-6" />
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Button onClick={toggleMobileMenu} variant="ghost" size="icon" aria-label="Open menu">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {/* Mobile Search Bar */}
            <div className="flex items-center p-2">
              <Input type="search" placeholder="Search..." className="w-full" />
              <Button variant="ghost" size="icon" className="ml-2">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-gray-700 hover:bg-orange-50 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Link to="/cart" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingCart className="h-6 w-6 mr-2" /> Cart
                </Button>
              </Link>
            </div>
            <div className="mt-3 px-5">
              <Link to="/account" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-6 w-6 mr-2" /> Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;