import React, { useState ,useEffect} from 'react';
import { useAuth } from "./AuthContext";

export default function UserForm() {

  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    username: ''
  });

  const branches = [
    { value: 'cse', label: 'Computer Science Engineering' },
    { value: 'ece', label: 'Electronics & Communication Engineering' },
    { value: 'ce', label: 'Civil Engineering' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'chem', label: 'Chemical Engineering' },
    { value: 'mme', label: 'Metallurgical & Materials Engineering' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async () => {
  if (isFormValid) {
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('User registered successfully!');
        setFormData({ name: '', branch: '', username: '' });
      } else {
        alert(data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong.');
    }
  }
};

  const isFormValid = formData.name && formData.branch && formData.username;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Register
            </h1>
            <p className="text-gray-600 mt-2">Fill in your details to continue</p>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Branch Field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                required
              >
                <option value="">Select your branch</option>
                {branches.map(branch => (
                  <option key={branch.value} value={branch.value}>
                    {branch.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Username Field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="Choose a username"
                required
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                isFormValid
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}