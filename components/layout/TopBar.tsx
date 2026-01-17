export const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 bg-background-light/80  backdrop-blur-md px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
        <span className="material-symbols-outlined !text-2xl" style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>menu</span>
        </button>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-center flex-1">Alquimia</h1>
        <div className="flex items-center gap-1">
        <button className="relative flex size-10 items-center justify-center rounded-full hover:bg-black/5  transition-colors">
        <span className="material-symbols-outlined !text-2xl" style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>shopping_bag</span>
        <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary"></span>
        </button>
      </div>
    </header>
  );
};