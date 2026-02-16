'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight, FaPlus, FaMinus, FaStar, FaStarHalfAlt, FaRegStar, FaPlay } from 'react-icons/fa'

// Fake reviews data
const fakeReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    date: "December 10, 2025",
    comment: "Absolutely love this candle! The scent is divine and lasts for hours. Perfect for my meditation sessions.",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 4,
    date: "December 8, 2025",
    comment: "Great quality candle. Burns evenly and the fragrance is not too overpowering. Would definitely recommend!",
    verified: true
  },
  {
    id: 3,
    name: "Anita Desai",
    rating: 5,
    date: "December 5, 2025",
    comment: "This is my third purchase! The candles are handcrafted with care and the natural ingredients make all the difference.",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Singh",
    rating: 4,
    date: "December 3, 2025",
    comment: "Nice candle with a soothing aroma. The burn time is impressive. Only wish it came in a larger size.",
    verified: false
  },
  {
    id: 5,
    name: "Sneha Patel",
    rating: 5,
    date: "November 28, 2025",
    comment: "Best candles I've ever bought! The packaging was beautiful and the scent fills my entire living room. Worth every rupee!",
    verified: true
  },
  {
    id: 6,
    name: "Arjun Mehta",
    rating: 4,
    date: "November 25, 2025",
    comment: "Good product overall. The fragrance is authentic and natural. Delivery was quick too.",
    verified: true
  }
]

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [openSection, setOpenSection] = useState(null)
  const [userRating, setUserRating] = useState(0)
  const [userReview, setUserReview] = useState('')
  const [userName, setUserName] = useState('')
  const [reviews, setReviews] = useState(fakeReviews)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${params.id}`)
        if (!response.ok) {
          throw new Error('Product not found')
        }
        const data = await response.json()
        // Map DB fields to component fields
        data.fullDescription = data.description
        data.rating = data.rating || 4.5
        data.totalReviews = data.totalReviews || 0
        data.burnTime = data.burnTime || '40-45 hours'
        data.weight = data.weightVolume
        data.ingredients = data.ingredients ? data.ingredients.split(',').map(i => i.trim()) : []
        setProduct(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Product not found</div>
      </div>
    )
  }
  
  // Star rating component
  const StarRating = ({ rating, size = 20 }) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} size={size} className="text-yellow-400" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} size={size} className="text-yellow-400" />)
      } else {
        stars.push(<FaRegStar key={i} size={size} className="text-yellow-400" />)
      }
    }
    
    return <div className="flex gap-1">{stars}</div>
  }

  // Interactive star rating for review form
  const InteractiveStarRating = ({ rating, setRating }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="hover:scale-110 transition-transform"
          >
            {star <= rating ? (
              <FaStar size={24} className="text-yellow-400" />
            ) : (
              <FaRegStar size={24} className="text-gray-300" />
            )}
          </button>
        ))}
      </div>
    )
  }

  const mediaList = []
  
  // 1. Add Images
  if (product.images && product.images.length > 0) {
    product.images.forEach(img => mediaList.push({ type: 'image', src: img }))
  } else {
    // Fallback if no images exist at all
    mediaList.push({ type: 'image', src: 'https://placehold.co/600x600?text=No+Image' })
  }

  // 2. Add Video (if exists)
  if (product.video) {
    mediaList.push({ type: 'video', src: product.video })
  }
 const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1))
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images && product.images[0] ? product.images[0] : '/default.jpg'
    };
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = existingCart.findIndex(item => item.id === cartItem.id);
    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch custom event to update header cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show toast notification
    setToast({ message: `Added ${quantity} ${product.name}(s) to cart!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  }

  const handleBuyNow = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images && product.images[0] ? product.images[0] : '/default.jpg'
    };
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = existingCart.findIndex(item => item.id === cartItem.id);
    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    router.push('/cart');
  }

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (userRating === 0 || !userName.trim() || !userReview.trim()) {
      alert('Please fill in all fields and select a rating')
      return
    }
    
    const newReview = {
      id: reviews.length + 1,
      name: userName,
      rating: userRating,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      comment: userReview,
      verified: false
    }
    
    setReviews([newReview, ...reviews])
    setUserName('')
    setUserReview('')
    setUserRating(0)
    alert('Thank you for your review!')
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 lg:px-20">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-sm">
          <span 
            onClick={() => router.push('/')}
            className="cursor-pointer hover:underline"
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span 
            onClick={() => router.push('/#products')}
            className="cursor-pointer hover:underline"
          >
            Products
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
        {/* --- MEDIA CAROUSEL SECTION --- */}
          <div className="relative">
            <div className="bg-transparent rounded-2xl p-0 md:p-4">
              
              {/* Main Active Media View */}
              <div className="relative overflow-hidden rounded-xl aspect-square md:aspect-[4/3] group bg-gray-100 flex items-center justify-center">
                
                {/* RENDER BASED ON TYPE */}
                {mediaList[currentMediaIndex].type === 'video' ? (
                  <video
                    src={mediaList[currentMediaIndex].src}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <img
                    src={mediaList[currentMediaIndex].src}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                )}

                {/* Left Arrow */}
                {mediaList.length > 1 && (
                  <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10">
                    <FaChevronLeft size={20} />
                  </button>
                )}

                {/* Right Arrow */}
                {mediaList.length > 1 && (
                  <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md z-10">
                    <FaChevronRight size={20} />
                  </button>
                )}
              </div>

              {/* Thumbnails Row */}
              {mediaList.length > 1 && (
                <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                  {mediaList.map((media, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentMediaIndex(idx)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        currentMediaIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-60'
                      }`}
                    >
                      {media.type === 'video' ? (
                        <div className="w-full h-full bg-black flex items-center justify-center text-white">
                           <FaPlay size={20} /> {/* Play Icon for video thumbnails */}
                        </div>
                      ) : (
                        <img src={media.src} alt="thumbnail" className="w-full h-full object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Wishlist Button (Preserved!) */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-6 right-6 z-10 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <FaHeart 
                size={24} 
                className={isWishlisted ? 'text-red-500' : 'text-gray-300'}
              />
            </button>
          </div>

          {/* Product Info */}
          <div>
            <div className="rounded-2xl p-0 md:p-8">
              
              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>

              {/* Rating Display */}
              <div className="flex items-center gap-3 mb-6">
                <StarRating rating={product.rating} size={20} />
                <span className="text-lg font-semibold">{product.rating}</span>
                <span className="text-gray-500">({product.totalReviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-xl mr-3">
                    ₹{product.oldPrice}
                  </span>
                )}
                <span className="text-3xl font-bold text-[#8B5A2B]">
                  ₹{product.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Quantity:
                </label>
                <div className='flex justify-between '>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 bg-white border-2 border-black text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Buy Now
                </button>
              </div>

              {/* Secure Payment Section */}
              <div className="mt-8 space-y-6">
                {/* Cash on Delivery */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-black rounded flex items-center justify-center">
                    <span className="text-sm">💳</span>
                  </div>
                  <span className="font-medium">Cash On Delivery</span>
                </div>

                {/* Secure Payment Guarantee */}
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">✓</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-3">100% Secure Payment Guarantee</h3>
                      <div className="flex flex-wrap gap-3 items-center">
                        <img src="/googlepay.png" alt="Google Pay" className="h-8" />
                        <img src="/paytm.png" alt="Paytm" className="h-6" />
                        <img src="/visa.png" alt="Visa" className="h-6" />
                        <img src="/mastercard.png" alt="Mastercard" className="h-8" />
                        <img src="/rupay.png" alt="RuPay" className="h-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="mt-12 space-y-4">
          {/* Description */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('description')}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition"
            >
              <h3 className="text-xl font-bold">Description</h3>
              {openSection === 'description' ? <FaMinus /> : <FaPlus />}
            </button>
            {openSection === 'description' && (
              <div className="p-6 pt-0 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
              </div>
            )}
          </div>

          

          {/* Shipping & Return */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('shipping')}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition"
            >
              <h3 className="text-xl font-bold">Shipping & Return</h3>
              {openSection === 'shipping' ? <FaMinus /> : <FaPlus />}
            </button>
            {openSection === 'shipping' && (
              <div className="p-6 pt-0 border-t border-gray-200 space-y-3">
                <p className="text-gray-700"><strong>Shipping:</strong> Free shipping on orders above ₹999. Standard delivery takes 5-7 business days.</p>
                <p className="text-gray-700"><strong>Returns:</strong> 7-day return policy. Products must be unused and in original packaging.</p>
              </div>
            )}
          </div>

          {/* Manufacturer Details */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('manufacturer')}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition"
            >
              <h3 className="text-xl font-bold">Manufacturer details</h3>
              {openSection === 'manufacturer' ? <FaMinus /> : <FaPlus />}
            </button>
            {openSection === 'manufacturer' && (
              <div className="p-6 pt-0 border-t border-gray-200 space-y-2">
                <p className="text-gray-700"><strong>Manufacturer:</strong> Artisan Candle Co.</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Craft Street, Mumbai, Maharashtra 400001</p>
                <p className="text-gray-700"><strong>Contact:</strong> +91 98765 43210</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          {/* Write a Review Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Your Rating</label>
                <InteractiveStarRating rating={userRating} setRating={setUserRating} />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Your Review</label>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  rows="4"
                  placeholder="Share your experience with this product"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews ({reviews.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <StarRating rating={review.rating} size={16} />
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

       
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in">
          {toast.message}
        </div>
      )}
    </div>
  )
}