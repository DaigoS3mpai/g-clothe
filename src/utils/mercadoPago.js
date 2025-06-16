export const initializeMercadoPago = (publicKey) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      const mp = new window.MercadoPago(publicKey, {
        locale: 'es-MX'
      });
      resolve(mp);
    };
    document.body.appendChild(script);
  });
};

export const createPayment = async (mp, accessToken, items) => {
  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        items: items.map(item => ({
          title: item.name,
          unit_price: item.price,
          quantity: 1
        }))
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating payment preference:', error);
    throw error;
  }
};