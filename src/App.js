import React, { useState, useEffect } from 'react';
import products from './mock/products';
import GClothesHeader from './components/GClothesHeader';
import GClothesProductCard from './components/GClothesProductCard';
import GClothesCart from './components/GClothesCart';
import { initializeMercadoPago, createPayment } from './utils/mercadoPago';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mpInstance, setMpInstance] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const publicKey = 'APP_USR-bad7c7e3-1180-4726-8aaa-07335ea57f0a';
  const accessToken = 'APP_USR-3296122296322276-051616-af7f03556f204fdc82ede0deeb708146-250644253';

  useEffect(() => {
    initializeMercadoPago(publicKey).then((mp) => {
      setMpInstance(mp);
    });
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleCheckout = async () => {
    if (!mpInstance || cartItems.length === 0) return;
    
    try {
      const preference = await createPayment(mpInstance, accessToken, cartItems);
      const checkout = mpInstance.checkout({
        preference: {
          id: preference.id
        },
        autoOpen: true,
      });

      // Escuchar el evento de éxito del pago
      window.addEventListener('message', (event) => {
        if (event.data.type === 'mp-checkout' && event.data.action === 'payment' && event.data.status === 'approved') {
          // Limpiar carrito después de pago exitoso
          setCartItems([]);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 5000);
        }
      });

      checkout.open();
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Ocurrió un problema al procesar el pago. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GClothesHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Notificación de compra exitosa */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            ¡Compra realizada con éxito! Tu pedido está en camino.
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <h2 className="text-2xl font-bold mb-6">Nuestra Colección</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <GClothesProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
          
          <div className="md:w-1/4">
            <button 
              onClick={() => setShowCart(!showCart)}
              className="w-full mb-4 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg transition-colors"
            >
              {showCart ? 'Ocultar Carro' : `Ver Carro (${cartItems.length})`}
            </button>
            
            {showCart && (
              <GClothesCart 
                cartItems={cartItems} 
                onRemoveItem={removeFromCart}
                onCheckout={handleCheckout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// DONE