import React from 'react';

export default function SearchToolbar({
  search = '',
  onSearchChange,
  placeholder = 'Zoeken...',
  actions,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange?.(event.target.value)}
        placeholder={placeholder}
        style={{
          flex: '1 1 320px',
          minWidth: 220,
          padding: '12px 14px',
          borderRadius: 12,
          border: '1px solid #cbd5e1',
          fontSize: 14,
          outline: 'none',
        }}
      />

      {actions ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            alignItems: 'center',
          }}
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}
