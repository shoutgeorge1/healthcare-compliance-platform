import React, { useState } from 'react';

function StepOne({ onNext }) {
  const [selectedState, setSelectedState] = useState('');
  const [serveAcrossStates, setServeAcrossStates] = useState(null);
  const [collectsPHI, setCollectsPHI] = useState(null);
  const [services, setServices] = useState([]);

  const STATES = ['California', 'Texas', 'Florida', 'New York', 'Arizona', 'Illinois'];
  const SERVICE_OPTIONS = [
    'Clinical care (in-person or virtual)',
    'Wellness or cosmetic services',
    'Health-related products (e.g., supplements, devices)',
    'Software, apps, or digital tools for patients or providers',
  ];

  const handleServiceChange = (service) => {
    setServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = () => {
    if (!selectedState || services.length === 0) {
      alert('Please select a state and at least one service.');
      return;
    }

    const businessType = services.join(', ');
    const state = selectedState;

    onNext({ businessType, state });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <label className="font-semibold">Which U.S. state(s) do you operate in?</label>
        <select
          className="w-full border p-2 mt-1"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">-- Select a state --</option>
          {STATES.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-1">
          Some states like California have stricter rules.
        </p>
      </div>

      <div>
        <p className="font-semibold">Do you serve patients across state lines?</p>
        <div className="space-x-4 mt-1">
          <label><input type="radio" name="crossState" onChange={() => setServeAcrossStates(true)} /> Yes</label>
          <label><input type="radio" name="crossState" onChange={() => setServeAcrossStates(false)} /> No</label>
        </div>
        {serveAcrossStates && (
          <p className="text-sm text-gray-500 mt-1">
            If yes, you're subject to multiple states' licensing and telehealth rules.
          </p>
        )}
      </div>

      <div>
        <p className="font-semibold">Do you collect or store protected health information (PHI)?</p>
        <div className="space-x-4 mt-1">
          <label><input type="radio" name="phi" onChange={() => setCollectsPHI(true)} /> Yes</label>
          <label><input type="radio" name="phi" onChange={() => setCollectsPHI(false)} /> No</label>
          <label><input type="radio" name="phi" onChange={() => setCollectsPHI(null)} /> Not Sure</label>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          PHI includes names, appointment info, symptoms, or anything tied to a person’s health.
        </p>
      </div>

      <div>
        <p className="font-semibold">What do you offer?</p>
        <div className="space-y-2 mt-2">
          {SERVICE_OPTIONS.map((service) => (
            <label key={service} className="block">
              <input
                type="checkbox"
                checked={services.includes(service)}
                onChange={() => handleServiceChange(service)}
              /> {service}
            </label>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Select all that apply so we can assess your HIPAA, marketing, and licensing risk correctly.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Start Risk Assessment →
      </button>
    </div>
  );
}

export default StepOne;
