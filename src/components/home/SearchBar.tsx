// src/components/Home/SearchBar.tsx
'use client';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="px-4 py-2">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary">
          <span className="material-symbols-outlined text-xl">search</span>
        </div>
        <input 
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          className="block w-full h-14 pl-12 pr-4 bg-white border-none rounded-xl text-base  placeholder:text-neutral-400 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition" 
          placeholder="Encuentra tu compañera verde..." 
        />
      </div>
    </div>
  );
};