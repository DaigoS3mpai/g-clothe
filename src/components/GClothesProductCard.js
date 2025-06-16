import React from 'react';

const GClothesProductCard = ({ product, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 mb-1">{formatPrice(product.price)}</p>
        <p className="text-sm text-gray-500 mb-3">{product.description}</p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Añadir al carro
        </button>
      </div>
    </div>
  );
};

export default GClothesProductCard;