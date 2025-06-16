import React from 'react';

const GClothesHeader = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">GClothes</h1>
        <nav className="flex space-x-6">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">Inicio</button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">Productos</button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">Carrito</button>
        </nav>
      </div>
    </header>
  );
};

export default GClothesHeader;