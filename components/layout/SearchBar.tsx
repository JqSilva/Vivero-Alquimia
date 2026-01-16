export const SearchBar = () => {
  return (
    <div className="px-4 py-2">
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary">
                <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input className="block w-full h-14 pl-12 pr-4 bg-white dark:bg-white/5 border-none rounded-xl text-base focus:ring-2 focus:ring-primary/20 placeholder:text-neutral-400 shadow-sm" placeholder="Encuentra tu compañera verde..." type="text"/>
        </div>
    </div>
  );
};