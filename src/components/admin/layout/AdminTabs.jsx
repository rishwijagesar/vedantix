import React from 'react';

export default function AdminTabs({ tabs = [], activeTab, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange?.(tab.value)}
            style={{
              padding: '10px 16px',
              borderRadius: 12,
              border: isActive ? '1px solid #1d4ed8' : '1px solid #cbd5e1',
              background: isActive ? '#dbeafe' : '#ffffff',
              color: isActive ? '#1d4ed8' : '#334155',
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: isActive
                ? '0 10px 20px rgba(59,130,246,0.12)'
                : '0 4px 12px rgba(15,23,42,0.04)',
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
