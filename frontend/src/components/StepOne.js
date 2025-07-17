import React, { useState } from 'react';

const US_STATES = [
  "California", "Texas", "Florida", "New York", "Arizona", "Illinois", "Georgia", "North Carolina",
  "Nevada", "Colorado", "Washington", "Massachusetts", "All Other States"
];

const StepOne = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    businessType: '',
    stateOperations: [],
    crossStateCare: '',
    handlesPHI: '',
    serviceType: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updated = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, (o) => o.value);
    setFormData({ ...formData, stateOperations: options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Step 1: Business Overview</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Business Type */}
        <div>
          <label className="block font-semibold">What type of healthcare business are you?</label>
          <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full border rounded p-2 mt-1">
            <option value="">-- Select --</option>
            <option>Traditional Medical Clinic or Group Practice</option>
            <option>Telehealth or Virtual Care Platform</option>
            <option>Mental Health / Behavioral Health Practice</option>
            <option>Medical Spa / Aesthetic Practice</option>
            <option>Chiropractic / Physical Therapy / Allied Health</option>
            <option>Digital Health App or SaaS Company</option>
            <option>Health eCommerce (Supplements, Devices, Wellness Products)</option>
            <option>Hospital or Multi-Specialty System</option>
            <option>Dentistry / Orthodontics</option>
            <option>Other / Not Listed</option>
          </select>
          <p className="text-sm text-gray-600 mt-1">Choose the best fit. This will guide which compliance questions you get.</p>
        </div>

        {/* State Operations */}
        <div>
          <label className="block font-semibold">Which U.S. state(s) do you operate in?</label>
          <select multiple name="stateOperations" value={formData.stateOperations} onChange={handleMultiSelect} className="w-full border rounded p-2 mt-1 h-32">
            {US_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <p className="text-sm text-gray-600 mt-1">Select all that apply. Some states like California have stricter rules.</p>
        </div>

        {/* Cross-state care */}
        <div>
          <label className="block font-semibold">Do you serve patients across state lines?</label>
          <div className="space-x-4 mt-1">
            <label><input type="radio" name="crossStateCare" value="Yes" checked={formData.crossStateCare === 'Yes'} onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="crossStateCare" value="No" checked={formData.crossStateCare === 'No'} onChange={handleChange} /> No</label>
          </div>
          <p className="text-sm text-gray-600 mt-1">If yes, you're subject to multiple states' licensing and telehealth rules.</p>
        </div>

        {/* PHI */}
        <div>
          <label className="block font-semibold">Do you collect or store protected health information (PHI)?</label>
          <div className="space-x-4 mt-1">
            <label><input type="radio" name="handlesPHI" value="Yes" checked={formData.handlesPHI === 'Yes'} onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="handlesPHI" value="No" checked={formData.handlesPHI === 'No'} onChange={handleChange} /> No</label>
            <label><input type="radio" name="handlesPHI" value="Not Sure" checked={formData.handlesPHI === 'Not Sure'} onChange={handleChange} /> Not Sure</label>
          </div>
          <p className="text-sm text-gray-600 mt-1">PHI includes names, appointment info, symptoms, or anything tied to a person’s health.</p>
        </div>

        {/* Service Type */}
        <div>
          <label className="block font-semibold">What do you offer?</label>
          <div className="space-y-1 mt-1">
            {["Clinical care (in-person or virtual)", "Wellness or cosmetic services", "Health-related products (e.g., supplements, devices)", "Software, apps, or digital tools for patients or providers"].map((service) => (
              <label key={service} className="block">
                <input
                  type="checkbox"
                  name="serviceType"
                  value={service}
                  checked={formData.serviceType.includes(service)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {service}
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">Select all that apply so we can assess your HIPAA, marketing, and licensing risk correctly.</p>
        </div>

        <button type="submit" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Risk Assessment →
        </button>
      </form>
    </div>
  );
};

export default StepOne;
