const statsItems = [
  {
    icon: (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#FF50B4] opacity-10 rounded-full"></div>
        <Brain className="h-6 w-6 text-primary" />
        {/* Small "+" icon positioned at top right of brain */}
        <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">+</span>
      </div>
    ),
    value: "5+",
    label: "Cognitive Tools"
  },
  // Similar pattern for other stats...
]; 