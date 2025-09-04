import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">Learnify</span>
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                Courses
              </Link>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </a>
            </nav>

            {/* Login Button */}
            <div>
              <button className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
    </header>
  )
}
