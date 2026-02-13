'use client';

interface CategoryChipsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryChips = ({ selectedCategory, onCategoryChange }: CategoryChipsProps) => {
  const categories = ['Todas', 'Interior', 'Exterior', 'Árboles', 'Suculentas'];

  return (
    <div className="w-full overflow-x-auto no-scrollbar flex items-center gap-3 px-4 py-4">
      {categories.map((category) => {
        // Verificamos si la categoría actual del mapa es la seleccionada
        const isSelected = selectedCategory === category;
        
        return (
          <button
            key={category}
            onClick={() => {
              onCategoryChange(category);
            }}
            type="button"
            className={`flex h-10 shrink-0 items-center justify-center px-6 rounded-full transition-colors cursor-pointer ${
              isSelected
                ? "bg-primary text-white font-semibold shadow-md ring-2 ring-primary/20"
                : "bg-white text-[#121716] font-medium border border-neutral-100 hover:bg-gray-50"
            } text-sm`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};