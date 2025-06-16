import React from 'react';

const GClothesCart = ({ cartItems, onRemoveItem, onCheckout }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Tu Carro</h2>
      {cartItems.length === 0 ? (
        <p>Tu carro está vacío</p>
      ) : (
        <>
          <ul className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">{formatPrice(item.price)}</p>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold">Total:</span>
            <span className="font-bold">{formatPrice(total)}</span>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Pagar con MercadoPago
          </button>
        </>
      )}
    </div>
  );
};

export default GClothesCart;

// DONE