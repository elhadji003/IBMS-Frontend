import React, { useState } from "react";
import { Code2, Monitor, Briefcase } from "lucide-react"; // Optionnel : pour des icônes
import CoursProgrammation from "./CoursProgrammation";
import CoursBureautique from "./CoursBureautique";

export default function TabsCours() {
  const [activeTab, setActiveTab] = useState("programmation");

  const tabs = [
    { id: "programmation", label: "Programmation", icon: <Code2 size={18} /> },
    { id: "bureautique", label: "Bureautique", icon: <Briefcase size={18} /> },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 p-4">
      {/* Conteneur des onglets style "Pills" */}
      <h1 className="text-center text-2xl font-bold mb-8">Trouver des cours gratuits sur :</h1>

      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-100 p-1 rounded-xl shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm scale-105"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Zone de contenu avec une petite animation d'apparition */}
      <div className="transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">
        {activeTab === "programmation" && (
          <div className="grid gap-6">
            <CoursProgrammation />
          </div>
        )}
        {activeTab === "bureautique" && (
          <div className="grid gap-6">
            <CoursBureautique />
          </div>
        )}
      </div>
    </div>
  );
}
