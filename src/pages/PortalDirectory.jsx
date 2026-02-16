import React from "react";
import { Link } from "react-router-dom";
import { User, Users, Settings, Shield, Clock, FileText } from "lucide-react";

const PortalDirectory = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-contractor-black mb-4">
            Portal Access Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the appropriate portal based on your role. Each portal is
            designed with specific features and security access for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Client Portal */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-contractor-black mb-2">
                Client Portal
              </h2>
              <p className="text-gray-600">For property owners and managers</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Project progress & updates
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Insurance claim documentation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Change order approvals
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Before/during/after photos
                </span>
              </div>
            </div>

            <Link
              to="/client-portal"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Access Client Portal
            </Link>
          </div>

          {/* Subcontractor Portal */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-contractor-black mb-2">
                Subcontractor Portal
              </h2>
              <p className="text-gray-600">
                For field workers and trade partners
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Mobile work queue & scheduling
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Digital invoicing & payments
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Field photo documentation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Insurance & bonding management
                </span>
              </div>
            </div>

            <Link
              to="/sub-portal"
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Access Sub Portal
            </Link>
          </div>

          {/* Staff Portal */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-contractor-black mb-2">
                Staff Portal
              </h2>
              <p className="text-gray-600">For Benson team members</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  AI-powered estimating workspace
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Business intelligence & analytics
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Project & user management
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Full system administration
                </span>
              </div>
            </div>

            <Link
              to="/staff-portal"
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Access Staff Portal
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-contractor-black mb-3">
              Need Help Accessing Your Portal?
            </h3>
            <p className="text-gray-600 mb-4">
              Contact our team if you need assistance with portal access or have
              questions about your account.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:5413215115"
                className="bg-maroon text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Call (541) 321-5115
              </a>
              <a
                href="mailto:Office@bensonhomesolutions.com"
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalDirectory;
