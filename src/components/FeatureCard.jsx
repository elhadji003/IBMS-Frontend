import React from "react";

export const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 max-w-sm text-center hover:shadow-md transition-shadow">
    <div className="flex justify-center mb-4 text-sky-600">
      {Icon && <Icon size={40} strokeWidth={1.5} />}
    </div>
    <h2 className="font-bold text-xl mb-3 text-gray-800">{title}</h2>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);
