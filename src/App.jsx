import { useState, useEffect } from 'react';

const App = () => {
  const menuData = [
    {
      id: 1,
      name: "Margherita Pizza",
      veg: true,
      calories: 800,
      price: 12.0,
      description: "Classic delight with mozzarella cheese and fresh basil.",
      ingredients: "Wheat flour base, mozzarella, tomato, basil, olive oil",
      category: "italian"
    },
    {
      id: 2,
      name: "Caesar Salad",
      veg: false,
      calories: 350,
      price: 8.5,
      description: "Crisp romaine lettuce tossed with chicken and creamy Caesar dressing.",
      ingredients: "Chicken, lettuce, parmesan, croutons, Caesar dressing",
      category: "continental"
    },
    {
      id: 3,
      name: "Paneer Tikka",
      veg: true,
      calories: 420,
      price: 10.0,
      description: "Barbeque marinated paneer cubes grilled to perfection.",
      ingredients: "Paneer, spices, yogurt, bell pepper, onion",
      category: "continental"
    },
    {
      id: 4,
      name: "Chicken Burger",
      veg: false,
      calories: 600,
      price: 9.5,
      description: "Juicy chicken patty with fresh lettuce and tomato in a soft bun.",
      ingredients: "Chicken patty, lettuce, tomato, bun, cheese, mayo",
      category: "continental"
    },
    {
      id: 5,
      name: "Vegetable Biryani",
      veg: true,
      calories: 560,
      price: 11.0,
      description: "Aromatic basmati rice cooked with fresh seasonal vegetables.",
      ingredients: "Basmati rice, carrots, beans, peas, spices, ghee",
      category: "continental"
    },
    {
      id: 6,
      name: "Brownie Sundae",
      veg: true,
      calories: 480,
      price: 7.0,
      description: "Warm chocolate brownie served with vanilla ice cream & fudge.",
      ingredients: "Chocolate brownie, ice cream, fudge sauce, almonds",
      category: "continental"
    },
    {
      id: 7,
      name: "Pepperoni Pizza",
      veg: false,
      calories: 920,
      price: 14.0,
      description: "Classic pizza topped with spicy pepperoni and mozzarella cheese.",
      ingredients: "Pizza base, pepperoni, mozzarella, tomato sauce",
      category: "italian"
    },
    {
      id: 8,
      name: "Chicken Alfredo Pasta",
      veg: false,
      calories: 750,
      price: 13.5,
      description: "Creamy alfredo pasta with grilled chicken pieces.",
      ingredients: "Pasta, chicken, cream, parmesan, garlic, herbs",
      category: "italian"
    },
    {
      id: 9,
      name: "Tacos Al Pastor",
      veg: false,
      calories: 650,
      price: 11.5,
      description: "Traditional Mexican tacos with marinated pork and pineapple.",
      ingredients: "Corn tortillas, pork, pineapple, onion, cilantro",
      category: "mexican"
    },
    {
      id: 10,
      name: "Veggie Quesadilla",
      veg: true,
      calories: 540,
      price: 9.0,
      description: "Grilled tortilla filled with cheese and mixed vegetables.",
      ingredients: "Tortilla, cheese, bell peppers, onions, mushrooms",
      category: "mexican"
    },
    {
      id: 11,
      name: "Guacamole & Chips",
      veg: true,
      calories: 320,
      price: 6.5,
      description: "Fresh avocado dip served with crispy tortilla chips.",
      ingredients: "Avocado, lime, onion, tomato, cilantro, tortilla chips",
      category: "mexican"
    },
    {
      id: 12,
      name: "Coca Cola",
      veg: true,
      calories: 140,
      price: 2.5,
      description: "Classic refreshing cola drink.",
      ingredients: "Carbonated water, sugar, caffeine, natural flavors",
      category: "beverages"
    },
    {
      id: 13,
      name: "Fresh Orange Juice",
      veg: true,
      calories: 110,
      price: 4.0,
      description: "Freshly squeezed orange juice with pulp.",
      ingredients: "Fresh oranges",
      category: "beverages"
    },
    {
      id: 14,
      name: "Iced Coffee",
      veg: true,
      calories: 80,
      price: 3.5,
      description: "Cold brew coffee served with ice and cream.",
      ingredients: "Coffee beans, ice, cream, sugar",
      category: "beverages"
    }
  ];

  const [tableNumber, setTableNumber] = useState(null);
  const [cart, setCart] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showExpandableMenu, setShowExpandableMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderHistory, setOrderHistory] = useState([]);
  const [showTableModal, setShowTableModal] = useState(false);

  // Extract table number from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const table = urlParams.get('table');
    
    if (table) {
      setTableNumber(table);
      // Load cart and order history for this specific table
      loadTableData(table);
    } else {
      setShowTableModal(true);
    }
  }, []);

  // Update URL when table number changes
  const updateURL = (table) => {
    const url = new URL(window.location);
    url.searchParams.set('table', table);
    window.history.pushState({}, '', url);
  };

  // Load table-specific data from memory
  const loadTableData = (table) => {
    const tableKey = `table_${table}`;
    // In a real application, you would load this from a database
    // For now, we'll use in-memory storage that resets on page refresh
    const savedCart = window[`cart_${tableKey}`] || {};
    const savedHistory = window[`history_${tableKey}`] || [];
    
    setCart(savedCart);
    setOrderHistory(savedHistory);
  };

  // Save table-specific data to memory
  const saveTableData = (table, cartData, historyData) => {
    const tableKey = `table_${table}`;
    window[`cart_${tableKey}`] = cartData;
    window[`history_${tableKey}`] = historyData;
  };

  // Update cart and save to table-specific storage
  const updateCart = (newCart) => {
    setCart(newCart);
    if (tableNumber) {
      saveTableData(tableNumber, newCart, orderHistory);
    }
  };

  // Update order history and save to table-specific storage
  const updateOrderHistory = (newHistory) => {
    setOrderHistory(newHistory);
    if (tableNumber) {
      saveTableData(tableNumber, cart, newHistory);
    }
  };

  const handleTableSelect = (table) => {
    setTableNumber(table);
    updateURL(table);
    loadTableData(table);
    setShowTableModal(false);
  };

  const VegIcon = ({ isVeg }) => (
    <span 
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
      className={`inline-block w-3 h-3 rounded-full mr-1 ${
        isVeg ? 'bg-green-600' : 'bg-red-600'
      }`}
    />
  );

  const addToCart = (itemId) => {
    const newCart = {
      ...cart,
      [itemId]: (cart[itemId] || 0) + 1
    };
    updateCart(newCart);
  };

  const removeFromCart = (itemId) => {
    const newCart = { ...cart };
    if (newCart[itemId]) {
      newCart[itemId]--;
      if (newCart[itemId] <= 0) {
        delete newCart[itemId];
      }
    }
    updateCart(newCart);
  };

  const deleteFromCart = (itemId) => {
    const newCart = { ...cart };
    delete newCart[itemId];
    updateCart(newCart);
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuData.find(i => i.id === parseInt(itemId));
      return total + (item.price * quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const handlePlaceOrder = () => {
    setShowLoginModal(true);
    setLoginError('');
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      // Save current order to history
      if (Object.keys(cart).length > 0) {
        const newOrder = {
          id: Date.now(),
          items: { ...cart },
          total: getCartTotal(),
          date: new Date().toLocaleDateString(),
          tableNumber: tableNumber
        };
        const newHistory = [newOrder, ...orderHistory];
        updateOrderHistory(newHistory);
      }
      
      setShowLoginModal(false);
      setShowOrderConfirm(true);
      updateCart({});
    } else {
      setLoginError('Invalid email or password!');
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowExpandableMenu(false);
  };

  const handleReorder = (orderItems) => {
    updateCart(orderItems);
    setShowExpandableMenu(false);
  };

  const getFilteredMenu = () => {
    if (selectedCategory === 'all') {
      return menuData;
    }
    return menuData.filter(item => item.category === selectedCategory);
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'all': 'All Items',
      'beverages': 'Beverages',
      'continental': 'Continental',
      'italian': 'Italian',
      'mexican': 'Mexican'
    };
    return categoryNames[category] || category;
  };

  const handleCancelLogin = () => {
    setShowLoginModal(false);
    setLoginError('');
  };

  const handleCloseConfirm = () => {
    setShowOrderConfirm(false);
  };

  const changeTable = () => {
    setShowTableModal(true);
  };

  // Table Selection Modal
  if (showTableModal) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Select Your Table</h2>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handleTableSelect(num.toString())}
                className="bg-green-100 hover:bg-green-200 border-2 border-green-300 rounded-lg p-4 text-center font-semibold text-green-800 transition-colors"
              >
                {num}
              </button>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Or enter a custom table number:</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Table number"
                className="flex-1 border rounded px-3 py-2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleTableSelect(e.target.value.trim());
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.target.previousElementSibling;
                  if (input.value.trim()) {
                    handleTableSelect(input.value.trim());
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Quick Dine Menu</h1>
          <div className="text-right">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-1">
              Table {tableNumber}
            </div>
            <button
              onClick={changeTable}
              className="text-xs text-green-600 hover:text-green-800 underline"
            >
              Change Table
            </button>
          </div>
        </div>
        
        {/* Menu Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Menu</h2>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {getCategoryDisplayName(selectedCategory)}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {getFilteredMenu().map(item => (
              <div key={item.id} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-1">
                    <VegIcon isVeg={item.veg} />
                    <span className="font-bold text-lg">{item.name}</span>
                    <span className="ml-auto text-xs bg-gray-200 px-2 rounded text-gray-700">
                      {item.calories} kcal
                    </span>
                  </div>
                  <div className="mb-1 text-gray-600 text-sm">{item.description}</div>
                  <div className="mb-2 text-xs text-gray-500">Main: {item.ingredients}</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold text-green-700">${item.price.toFixed(2)}</span>
                  {cart[item.id] ? (
                    <div className="flex items-center gap-2">
                      <button 
                        className="bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 flex items-center justify-center text-lg font-bold"
                        onClick={() => removeFromCart(item.id)}
                      >
                        −
                      </button>
                      <span className="bg-gray-100 px-3 py-1 rounded font-semibold min-w-8 text-center">
                        {cart[item.id]}
                      </span>
                      <button 
                        className="bg-green-600 text-white w-8 h-8 rounded-full hover:bg-green-700 flex items-center justify-center text-lg font-bold"
                        onClick={() => addToCart(item.id)}
                      >
                        +
                      </button>
                      <button 
                        className="bg-gray-500 text-white w-8 h-8 rounded-full hover:bg-gray-600 flex items-center justify-center text-sm"
                        onClick={() => deleteFromCart(item.id)}
                        title="Remove from cart"
                      >
                        🗑
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => addToCart(item.id)}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Your Cart</h2>
          <div className="bg-white shadow rounded p-4 mb-4">
            {getCartItemCount() === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <div>
                {Object.entries(cart).map(([itemId, quantity]) => {
                  const item = menuData.find(i => i.id === parseInt(itemId));
                  const itemTotal = quantity * item.price;
                  return (
                    <div key={itemId} className="flex justify-between items-center border-b py-3">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <VegIcon isVeg={item.veg} />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button 
                            className="bg-red-500 text-white w-7 h-7 rounded-full hover:bg-red-600 flex items-center justify-center text-sm font-bold"
                            onClick={() => removeFromCart(item.id)}
                          >
                            −
                          </button>
                          <span className="bg-gray-100 px-2 py-1 rounded font-semibold min-w-8 text-center text-sm">
                            {quantity}
                          </span>
                          <button 
                            className="bg-green-600 text-white w-7 h-7 rounded-full hover:bg-green-700 flex items-center justify-center text-sm font-bold"
                            onClick={() => addToCart(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-green-700 min-w-16 text-right">
                            ${itemTotal.toFixed(2)}
                          </span>
                          <button 
                            className="bg-gray-500 text-white w-7 h-7 rounded-full hover:bg-gray-600 flex items-center justify-center text-xs"
                            onClick={() => deleteFromCart(item.id)}
                            title="Remove from cart"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">
              Total: ${getCartTotal().toFixed(2)}
            </span>
            <button 
              className={`px-4 py-2 rounded ${
                getCartItemCount() === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
              disabled={getCartItemCount() === 0}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-bold mb-4">Login to Confirm Order</h3>
              <div className="text-sm text-gray-600 mb-4">Table: {tableNumber}</div>
              <div className="flex flex-col gap-4">
                <input 
                  type="email" 
                  required 
                  placeholder="Email" 
                  className="border p-2 rounded"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input 
                  type="password" 
                  required 
                  placeholder="Password" 
                  className="border p-2 rounded"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="bg-green-700 text-white rounded px-4 py-2 hover:bg-green-800"
                  onClick={handleLogin}
                >
                  Login & Place Order
                </button>
                <button 
                  type="button" 
                  className="text-gray-500 hover:text-gray-700 mt-2"
                  onClick={handleCancelLogin}
                >
                  Cancel
                </button>
              </div>
              {loginError && (
                <p className="text-red-600 mt-2">{loginError}</p>
              )}
            </div>
          </div>
        )}

        {/* Order Confirmation Modal */}
        {showOrderConfirm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm text-center">
              <h3 className="text-lg font-bold mb-4 text-green-700">Order Placed!</h3>
              <p className="mb-4">
                Thank you for ordering from <strong>Table {tableNumber}</strong>.<br />
                Our staff has received your order.<br />
                <span className="text-xs text-gray-400">You can now close this window.</span>
              </p>
              <button 
                className="bg-green-700 text-white px-4 py-2 rounded mt-2 hover:bg-green-800"
                onClick={handleCloseConfirm}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Expandable Menu - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Expandable Options */}
        {showExpandableMenu && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border mb-2 min-w-48">
            {/* Categories */}
            <div className="p-2 border-b">
              <div className="text-xs font-semibold text-gray-500 mb-2 px-2">CATEGORIES</div>
              <button
                onClick={() => handleCategorySelect('all')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm flex items-center"
              >
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                All Items
              </button>
              <button
                onClick={() => handleCategorySelect('beverages')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm flex items-center"
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Beverages
              </button>
              <button
                onClick={() => handleCategorySelect('continental')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm flex items-center"
              >
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Continental
              </button>
              <button
                onClick={() => handleCategorySelect('italian')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm flex items-center"
              >
                <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                Italian
              </button>
              <button
                onClick={() => handleCategorySelect('mexican')}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm flex items-center"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Mexican
              </button>
            </div>
            
            {/* Re-order Section */}
            {orderHistory.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 mb-2 px-2">RE-ORDER</div>
                {orderHistory.slice(0, 3).map((order) => {
                  const itemCount = Object.values(order.items).reduce((sum, qty) => sum + qty, 0);
                  return (
                    <button
                      key={order.id}
                      onClick={() => handleReorder(order.items)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">
                          {itemCount} items
                        </span>
                        <span className="text-green-600 font-semibold">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {order.date}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
        
        {/* Menu Toggle Button */}
        <button
          onClick={() => setShowExpandableMenu(!showExpandableMenu)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            showExpandableMenu 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          <span className="text-2xl font-bold">
            {showExpandableMenu ? '×' : '☰'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;