"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddressForm from "@/components/AddressForm";

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);

    // Redirect to products page if cart empty
    if (!cartData || cartData.length === 0) {
      router.push('/products');
      return;
    }

    const token = localStorage.getItem('token');
    const rawUser = localStorage.getItem('user');
    if (token && rawUser) {
      try {
        const parsed = JSON.parse(rawUser);
        console.log('Cart: found token and user in localStorage', { tokenExists: !!token, user: parsed });
        setIsLoggedIn(true);
        setUser(parsed);
      } catch (err) {
        console.warn('Cart: failed to parse user from localStorage', err);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  // Fetch addresses when user is set
  useEffect(() => {
    const fetchAddresses = async (u) => {
      const usr = u || user;
      if (!usr) return;
      setAddressLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/addresses?userId=${usr._id || usr.id}`);
        if (res.ok) {
          const data = await res.json();
          console.log('Cart: fetched addresses', data);
          setAddresses(data || []);
          // pick default address if present
          const def = (data || []).find(a => a.isDefault) || (data || [])[0] || null;
          setSelectedAddress(def);
          // set validation
          if (!def) {
            setValidationMessage('Add a valid address and phone number to proceed.');
          } else if (!def.phone || !def.phone.toString().trim()) {
            setValidationMessage('Add a valid address and phone number to proceed.');
          } else {
            setValidationMessage('');
          }
        } else {
          setAddresses([]);
          setSelectedAddress(null);
          setValidationMessage('Add a valid address and phone number to proceed.');
        }
      } catch (err) {
        console.error('Error fetching addresses', err);
        setAddresses([]);
        setSelectedAddress(null);
        setValidationMessage('Add a valid address and phone number to proceed.');
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressFormMode, setAddressFormMode] = useState("add");
  const [addressFormInitial, setAddressFormInitial] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showInstructionsForm, setShowInstructionsForm] = useState(false);
  const [instructionsText, setInstructionsText] = useState('');

  // Load persisted instructions on client
  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('orderInstructions') : null;
      if (saved) setInstructionsText(saved);
    } catch (err) {
      console.warn('Could not read orderInstructions from localStorage', err);
    }
  }, []);

  const openEditAddress = () => {
    setAddressFormMode("edit");
    setAddressFormInitial(selectedAddress);
    setShowAddressForm(true);
  };

  const openAddAddress = () => {
    setAddressFormMode("add");
    setAddressFormInitial(null);
    setShowAddressForm(true);
  };

  const handleAddressSaved = (addr) => {
    // refresh addresses after save
    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/addresses?userId=${user._id || user.id}`);
        if (res.ok) {
          const data = await res.json();
          setAddresses(data || []);
          const def = (data || []).find(a => a.isDefault) || (data || [])[0] || null;
          setSelectedAddress(def);
        }
      } catch (err) {
        console.error('Error refreshing addresses', err);
      }
    })();
    setSuccessMessage('Address saved successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const openInstructions = () => {
    if (!isLoggedIn) return;
    setShowInstructionsForm(true);
  };

  const saveInstructions = (text) => {
    setInstructionsText(text || '');
    localStorage.setItem('orderInstructions', text || '');
    setShowInstructionsForm(false);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const canPlaceOrder = () => {
    if (!isLoggedIn) return false;
    if (!selectedAddress) return false;
    if (!selectedAddress.phone || !selectedAddress.phone.toString().trim()) return false;
    return cart.length > 0;
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => router.push('/')}
              className="bg-black text-white px-6 py-3 rounded"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {/* Cart items */}
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 border-b py-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Address Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
                {!isLoggedIn ? (
                  <div className="p-4 border rounded bg-white flex justify-between items-center">
                    <span className="text-gray-700">Please log in to add delivery details.</span>
                    <div className="flex gap-2">
                      <Link href="/auth" className="text-sm text-white bg-black px-3 py-2 rounded">Log in</Link>
                      <Link href="/auth" className="text-sm border px-3 py-2 rounded">Sign up</Link>
                    </div>
                  </div>
                ) : addressLoading ? (
                  <div className="p-4 border rounded bg-white">Loading addresses...</div>
                ) : addresses.length === 0 ? (
                  <div className="p-4 border rounded bg-white flex justify-between items-center">
                    <span className="text-gray-700">No address found.</span>
                    <button onClick={openAddAddress} className="text-sm text-white bg-black px-3 py-2 rounded">Add Address</button>
                  </div>
                ) : (
                  <div className="p-4 border rounded bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{selectedAddress?.fullName}</div>
                        <div className="text-sm text-gray-600">{selectedAddress?.phone}</div>
                        <div className="text-sm text-gray-700 mt-2">{selectedAddress?.address}, {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button onClick={openEditAddress} className="text-sm text-black border px-3 py-2 rounded">Edit</button>
                        <button onClick={openAddAddress} className="text-sm text-white bg-black px-3 py-2 rounded">Add New</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Instructions (disabled when not logged in) */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Order Instructions</h3>
                <div className={`p-4 border rounded bg-white ${!isLoggedIn ? 'opacity-60' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-700">Add order notes or instructions</span>
                      {instructionsText && <div className="text-sm text-gray-600 mt-2">{instructionsText}</div>}
                    </div>
                    <button onClick={openInstructions} disabled={!isLoggedIn} className="text-sm text-black border px-3 py-2 rounded">Add</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Order summary */}
            <div className="bg-gray-50 p-6 rounded">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {successMessage && <div className="mb-3 text-sm text-green-600">{successMessage}</div>}
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Delivery fees</span>
                <span>₹ 99</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Grand Total</span>
                <span>₹{(total + 99).toFixed(2)}</span>
              </div>
              <button
                disabled={!canPlaceOrder()}
                onClick={() => {
                  if (!isLoggedIn) {
                    router.push('/auth');
                    return;
                  }
                  if (!canPlaceOrder()) return;
                  router.push('/checkout');
                }}
                className={`w-full py-3 rounded mt-2 ${canPlaceOrder() ? 'bg-black text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
                Place Order
              </button>

              {(!isLoggedIn) && (
                <div className="mt-4 text-sm text-red-600">Please log in to add delivery details and place your order.</div>
              )}

              {(isLoggedIn && (!selectedAddress || !selectedAddress.phone)) && (
                <div className="mt-4 text-sm text-red-600">Add a valid address and phone number to proceed.</div>
              )}

            </div>
            {showInstructionsForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowInstructionsForm(false)} />
                <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">Order Instructions</h3>
                  <textarea
                    value={instructionsText}
                    onChange={(e) => setInstructionsText(e.target.value)}
                    className="w-full h-36 border p-3 rounded mb-4"
                    placeholder="Add any notes for delivery or order here"
                  />
                  <div className="flex justify-end gap-3">
                    <button onClick={() => setShowInstructionsForm(false)} className="px-4 py-2 border rounded">Cancel</button>
                    <button onClick={() => saveInstructions(instructionsText)} className="px-4 py-2 bg-black text-white rounded">Save</button>
                  </div>
                </div>
              </div>
            )}
            {showAddressForm && user && (
              <AddressForm
                mode={addressFormMode}
                initialData={addressFormInitial}
                userId={user._id || user.id}
                onClose={() => setShowAddressForm(false)}
                onSaved={handleAddressSaved}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}