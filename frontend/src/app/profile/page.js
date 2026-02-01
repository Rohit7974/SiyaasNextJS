"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tab, setTab] = useState("details"); // details, addresses, orders
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const tokenData = localStorage.getItem("token");

    if (!userData || !tokenData) {
      router.push("/auth");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setToken(tokenData);
    setFormData(parsedUser);

    // Fetch orders and addresses with parsed user
    fetchOrders(tokenData);
    fetchAddressesForUser(parsedUser._id, tokenData);
    setLoading(false);
  }, [router]);

  const fetchOrders = async (authToken) => {
    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const fetchAddresses = async (authToken) => {
    try {
      const res = await fetch(`http://localhost:4000/api/addresses?userId=${user?._id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAddresses(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  };

  const fetchAddressesForUser = async (userId, authToken) => {
    try {
      const res = await fetch(`http://localhost:4000/api/addresses?userId=${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAddresses(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/auth/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
        setEditMode(false);
        alert("Profile updated successfully");
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Error updating profile");
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newAddress.fullName || !newAddress.phone || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newAddress, userId: user._id }),
      });

      if (res.ok) {
        fetchAddresses(token);
        setNewAddress({
          fullName: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          isDefault: false,
        });
        setShowAddForm(false);
        alert("Address added successfully");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to add address");
      }
    } catch (err) {
      console.error("Failed to add address", err);
      alert("Error adding address: " + err.message);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm("Delete this address?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchAddresses(token);
        alert("Address deleted");
      }
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-32 pb-16">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-lg mb-4">{user?.fullName}</h3>
                <p className="text-sm text-gray-600 mb-6">{user?.email}</p>

                <div className="space-y-2">
                  <button
                    onClick={() => setTab("details")}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      tab === "details"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Account Details
                  </button>
                  <button
                    onClick={() => setTab("addresses")}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      tab === "addresses"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Addresses ({addresses.length})
                  </button>
                  <button
                    onClick={() => setTab("orders")}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      tab === "orders"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Orders ({orders.length})
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              {/* Account Details Tab */}
              {tab === "details" && (
                <div className="bg-white rounded-lg shadow p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Account Details</h2>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
                    >
                      {editMode ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  {editMode ? (
                    <form onSubmit={handleUpdateDetails} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-black outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-black outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-black outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600">
                          Full Name
                        </label>
                        <p className="text-lg font-medium">{user?.fullName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <p className="text-lg font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <p className="text-lg font-medium">
                          {user?.phone || "Not set"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {tab === "addresses" && (
                <div className="bg-white rounded-lg shadow p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Saved Addresses</h2>
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
                    >
                      {showAddForm ? "Cancel" : "Add New Address"}
                    </button>
                  </div>

                  {showAddForm && (
                    <form onSubmit={handleAddAddress} className="mb-8 p-6 bg-gray-50 rounded">
                      <h3 className="font-semibold mb-4">New Address</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Full Name *</label>
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            value={newAddress.fullName}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                fullName: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-black outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Phone *</label>
                          <input
                            type="tel"
                            placeholder="Enter phone number"
                            value={newAddress.phone}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                phone: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-black outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Address *</label>
                          <input
                            type="text"
                            placeholder="Enter street address"
                            value={newAddress.address}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                address: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-black outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">City *</label>
                            <input
                              type="text"
                              placeholder="City"
                              value={newAddress.city}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  city: e.target.value,
                                })
                              }
                              required
                              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-black outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">State *</label>
                            <input
                              type="text"
                              placeholder="State"
                              value={newAddress.state}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  state: e.target.value,
                                })
                              }
                              required
                              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-black outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Pincode *</label>
                          <input
                            type="text"
                            placeholder="Pincode"
                            value={newAddress.pincode}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                pincode: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-black outline-none"
                          />
                        </div>

                        <label className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                isDefault: e.target.checked,
                              })
                            }
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Set as default address</span>
                        </label>

                        <button
                          type="submit"
                          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition font-medium"
                        >
                          Add Address
                        </button>
                      </div>
                    </form>
                  )}

                  {addresses.length === 0 ? (
                    <p className="text-gray-500">No addresses saved yet</p>
                  ) : (
                    <div className="space-y-4">
                      {addresses.map((addr) => (
                        <div
                          key={addr._id}
                          className="p-4 border rounded-lg hover:shadow transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{addr.fullName}</h3>
                              <p className="text-sm text-gray-600">
                                {addr.address}
                              </p>
                              <p className="text-sm text-gray-600">
                                {addr.city}, {addr.state} {addr.pincode}
                              </p>
                              <p className="text-sm text-gray-600">
                                Phone: {addr.phone}
                              </p>
                              {addr.isDefault && (
                                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                  Default Address
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteAddress(addr._id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {tab === "orders" && (
                <div className="bg-white rounded-lg shadow p-8">
                  <h2 className="text-2xl font-semibold mb-6">Order History</h2>

                  {orders.length === 0 ? (
                    <p className="text-gray-500">No orders yet</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="p-4 border rounded-lg hover:shadow transition"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Order ID</p>
                              <p className="font-semibold">{order._id}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Date</p>
                              <p className="font-semibold">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Total</p>
                              <p className="font-semibold">₹{order.total}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Status</p>
                              <p
                                className={`font-semibold ${
                                  order.status === "completed"
                                    ? "text-green-600"
                                    : order.status === "pending"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              >
                                {order.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
