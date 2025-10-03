import { Building2, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-16 px-4 border-t border-gray-700">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-green-500" />
              <span className="text-xl font-bold">RCHMS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Runner City Housing Management System - Simplifying community living through
              technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-green-500">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-green-500">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-green-500">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                <p className="text-gray-400">
                  Runner City Housing Association
                  <br />
                  Bogura, Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
                <a
                  href="mailto:info@runnercityhousing.com"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  info@runnercityhousing.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
<div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-center items-center gap-2">
  <p>© {new Date().getFullYear()} Runner City Housing Management System. All rights reserved.</p>
  <span className="hidden md:inline">|</span>
  <p>
    Developed by{" "}
    <a 
      href="https://your-portfolio-link.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-accent hover:underline font-bold hover:text-white transition-colors"
    >
      Sabbir Ahmad
    </a>
  </p>
</div>

      </div>
    </footer>
  );
};
