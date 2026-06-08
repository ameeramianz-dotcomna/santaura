import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, RefreshCw, X, Plus, Minus, CreditCard, Check, ArrowRight } from 'lucide-react';

interface ProductReview {
  author: string;
  rating: number;
  text: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  thumbnail: string;
  gallery: string[];
  features: string[];
  reviews: ProductReview[];
}

const PRODUCTS: Record<string, Product> = {
  perfume: {
    id: 'perfume',
    name: 'SCENTAURA Extrait de Parfum',
    price: 125.00,
    description: 'Our signature blend of ripe Pineapple, Bergamot, smoky Birch, and luxurious Ambergris. Blended at an exceptional 25% fragrance oil loading for extreme longevity.',
    thumbnail: '/herosection/p1.png',
    gallery: ['/herosection/p1.png', '/model/p4.png', '/notesbg/1.png'],
    features: ['25% Oil Concentration', 'Extreme 12+ Hr Longevity', 'Hand-finished glass bottle', 'Signature sillage trail'],
    reviews: [
      { author: 'Alexander V.', rating: 5, text: 'SCENTAURA is a masterwork. The opening pineapple is crisp, transitioning into a smoky birch that commands absolute authority.' },
      { author: 'Eleanor K.', rating: 5, text: 'Holds its ground all day. Worth every single cent. My signature scent.' }
    ]
  },
  atomizer: {
    id: 'atomizer',
    name: 'SCENTAURA Premium Atomizer Case',
    price: 45.00,
    description: 'A heavy, gold-plated solid brass travel atomizer engineered with a premium micro-mist spray nozzle to dispense a uniform fragrance cloud.',
    thumbnail: '/herosection/p2.png',
    gallery: ['/herosection/p2.png', '/herosection/p2 (2).png'],
    features: ['Travel-safe TSA approved', 'Solid brass housing', 'Leak-proof refillable chamber', 'Refills in seconds'],
    reviews: [
      { author: 'Julian P.', rating: 5, text: 'The finest travel sprayer I have owned. Micro-mist dispersal is outstanding.' },
      { author: 'Sophia R.', rating: 5, text: 'Heavy, premium feel, matches the Scentaura bottle aesthetic perfectly.' }
    ]
  },
  travel: {
    id: 'travel',
    name: 'SCENTAURA Travel Voyage Spray',
    price: 35.00,
    description: 'A travel pocket-sized version containing 10ml of our signature Extrait de Parfum blend, perfect for carry-on luggage and mid-day refreshes.',
    thumbnail: '/herosection/p3.png',
    gallery: ['/herosection/p3.png', '/herosection/p3 (2).png'],
    features: ['Compact 10ml volume', 'Sleek brushed metal case', 'Filled with signature juice', 'Ideal for business travels'],
    reviews: [
      { author: 'Derek M.', rating: 5, text: 'Perfect size for touch-ups. Sillage is identical to the full bottle.' }
    ]
  }
};

const HOTSPOTS = [
  { id: 'perfume', top: '88%', left: '12%', productId: 'perfume' }
];

export default function FeaturedProduct() {
  const [selectedSize, setSelectedSize] = useState('100ML');
  const [isAdded, setIsAdded] = useState(false);

  // Hotspot e-commerce state
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [detailsQuantity, setDetailsQuantity] = useState(1);

  // Checkout flow state
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutQuantity, setCheckoutQuantity] = useState(1);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', zip: '' });
  const [paymentOption, setPaymentOption] = useState('card');

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutSuccess(true);
  };

  const closeCheckout = () => {
    setCheckoutProduct(null);
    setCheckoutSuccess(false);
    setFormData({ name: '', email: '', address: '', zip: '' });
  };

  return (
    <section id="collection" className="py-32 bg-black relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
            The Signature Blend
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-cream uppercase tracking-wide">
            Featured Masterpiece
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          <p className="text-xs text-muted font-light max-w-md mx-auto">
            Hover or tap the hotspots on our campaign image to explore and purchase the SCENTAURA lineup directly.
          </p>
        </div>

        {/* Product Details Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Premium Model Display with Hotspots */}
          <div className="relative flex justify-center items-center group">
            {/* Ambient Gold Glow Backdrop */}
            <div className="absolute w-[80%] aspect-square rounded-full bg-primary/5 blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />
            
            <div className="w-full max-w-md aspect-[4/5] bg-black/35 border border-white/5 p-8 flex items-center justify-center rounded-lg overflow-hidden relative group/prod">
              
              {/* Campaign Portrait Image */}
              <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
                <source media="(max-width: 1023px)" srcSet="/model/p4 (2).png" />
                <img 
                  src="/model/p4.png" 
                  alt="SCENTAURA Brand Model Portrait"
                  className="w-full h-full object-cover opacity-80 group-hover/prod:opacity-95 transition-opacity duration-700 pointer-events-none"
                />
              </picture>
              
              {/* Luxury dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/25 z-10 pointer-events-none" />

              {/* Hotspots Map */}
              {HOTSPOTS.map((spot) => (
                <motion.div
                  key={spot.id}
                  className="absolute z-20 cursor-pointer"
                  style={{ top: spot.top, left: spot.left }}
                  onMouseEnter={() => setActiveHotspotId(spot.id)}
                  onMouseLeave={() => setActiveHotspotId(null)}
                  onClick={() => {
                    setSelectedProductDetails(PRODUCTS[spot.productId]);
                    setActiveGalleryIndex(0);
                    setDetailsQuantity(1);
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute -inset-2.5 rounded-full bg-primary/25 border border-primary/45"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Solid core */}
                  <div className="w-3.5 h-3.5 rounded-full bg-white border border-primary/55 shadow-[0_0_12px_rgba(212,164,74,0.7)]" />
                </motion.div>
              ))}

              {/* Hover Floating Product Card */}
              <AnimatePresence>
                {activeHotspotId && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute z-30 bg-black/85 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl w-64 text-left pointer-events-auto flex flex-col justify-between"
                    style={{
                      top: `calc(${HOTSPOTS.find(h => h.id === activeHotspotId)?.top} - 175px)`,
                      left: '20px',
                    }}
                    onMouseEnter={() => setActiveHotspotId(activeHotspotId)}
                    onMouseLeave={() => setActiveHotspotId(null)}
                  >
                    <div>
                      <div className="flex gap-3 items-center mb-3">
                        <img
                          src={PRODUCTS[HOTSPOTS.find(h => h.id === activeHotspotId)!.productId].thumbnail}
                          alt=""
                          className="w-12 h-12 object-contain bg-white/5 rounded border border-white/10"
                        />
                        <div>
                          <h4 className="text-xs font-serif text-cream uppercase font-bold tracking-wide leading-tight">
                            {PRODUCTS[HOTSPOTS.find(h => h.id === activeHotspotId)!.productId].name}
                          </h4>
                          <span className="text-xs text-primary font-serif font-semibold">
                            ${PRODUCTS[HOTSPOTS.find(h => h.id === activeHotspotId)!.productId].price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted font-light leading-relaxed mb-4">
                        {PRODUCTS[HOTSPOTS.find(h => h.id === activeHotspotId)!.productId].description.slice(0, 100)}...
                      </p>
                    </div>
                    <div className="flex gap-2 border-t border-white/5 pt-3">
                      <button
                        onClick={() => {
                          setSelectedProductDetails(PRODUCTS[HOTSPOTS.find(h => h.id === activeHotspotId)!.productId]);
                          setActiveGalleryIndex(0);
                          setDetailsQuantity(1);
                          setActiveHotspotId(null);
                        }}
                        className="flex-1 text-[9px] uppercase tracking-widest text-center py-2 bg-transparent border border-white/10 text-cream hover:border-white transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          setCheckoutProduct(PRODUCTS[HOTSPOTS.find(h => h.id === activeHotspotId)!.productId]);
                          setCheckoutQuantity(1);
                          setActiveHotspotId(null);
                        }}
                        className="flex-1 text-[9px] uppercase tracking-widest text-center py-2 bg-primary text-black font-bold hover:bg-accent transition-colors cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="absolute top-6 left-6 text-[9px] font-sans tracking-[0.25em] text-primary font-bold border border-primary/20 px-3 py-1 bg-black/50 backdrop-blur-md z-30">
                LIMITED PRODUCTION
              </span>
            </div>
          </div>

          {/* Right: Purchase and Detail Panel */}
          <div className="space-y-8 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-primary stroke-none" />
                  ))}
                </div>
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-muted">
                  5.0 (148 Reviews)
                </span>
              </div>

              <h3 className="text-4xl font-serif text-cream uppercase tracking-wide leading-tight">
                SCENTAURA <br />
                <span className="italic font-normal text-primary">Extrait de Parfum</span>
              </h3>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-serif text-cream">$125.00</span>
                <span className="text-xs text-muted line-through font-light">$175.00</span>
              </div>
            </div>

            <p className="text-body text-xs md:text-sm font-light leading-relaxed">
              Our signature scent profile blends the crisp brightness of ripe Pineapple and Bergamot with a smoky, rich heart of Birch and Patchouli. Grounded in luxurious Ambergris, Oakmoss, and Vanilla, SCENTAURA is the ultimate sensory statement of authority.
            </p>

            {/* Note tags */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Fruity', 'Smoky', 'Woody', 'Extrait concentration'].map((tag) => (
                <div 
                  key={tag}
                  className="bg-slate/30 border border-white/5 py-2 px-3 text-[10px] font-sans text-muted tracking-widest text-center uppercase rounded"
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <span className="text-[10px] font-sans tracking-widest text-muted font-bold uppercase block">
                Select Volume
              </span>
              <div className="flex gap-4">
                {['50ML', '100ML', '200ML'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                      selectedSize === size
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-white/10 text-muted hover:border-white/30 hover:text-cream'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-primary text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-accent disabled:bg-primary/50 transition-colors duration-300 border border-primary cursor-pointer"
              >
                <ShoppingBag size={14} />
                <span>{isAdded ? 'Added to Collection' : 'Add to Collection'}</span>
              </button>

              <button
                onClick={() => {
                  setCheckoutProduct(PRODUCTS.perfume);
                  setCheckoutQuantity(1);
                }}
                className="sm:w-[180px] flex items-center justify-center py-4 border border-white/15 hover:border-white text-cream font-sans font-bold text-xs uppercase tracking-widest bg-transparent hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            {/* Shipping detail */}
            <div className="flex items-center gap-2 text-[10px] text-muted tracking-wide">
              <RefreshCw size={12} className="animate-spin-slow text-primary" />
              <span>Complimentary premium shipping & free returns included.</span>
            </div>

          </div>

        </div>

      </div>

      {/* --- Full Product Details Modal --- */}
      <AnimatePresence>
        {selectedProductDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#0B0B0B] border border-white/10 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative grid grid-cols-1 md:grid-cols-2 p-6 md:p-12 gap-8 md:gap-12"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProductDetails(null)}
                className="absolute top-6 right-6 text-muted hover:text-cream transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer z-10"
              >
                <X size={18} />
              </button>

              {/* Left Column: Product Gallery */}
              <div className="space-y-6">
                <div className="aspect-square bg-white/5 border border-white/5 rounded-lg overflow-hidden p-6 flex items-center justify-center relative">
                  <img
                    src={selectedProductDetails.gallery[activeGalleryIndex]}
                    alt={selectedProductDetails.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                  />
                </div>
                {/* Thumbnails grid */}
                <div className="flex gap-4">
                  {selectedProductDetails.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`w-16 h-16 bg-white/5 border rounded p-1 flex items-center justify-center transition-colors cursor-pointer ${
                        activeGalleryIndex === idx ? 'border-primary' : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Information Panel */}
              <div className="space-y-6 text-left flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-primary uppercase">
                    SCENTAURA Masterpiece
                  </span>
                  <h3 className="text-3xl font-serif text-cream uppercase tracking-wide">
                    {selectedProductDetails.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-primary stroke-none" />
                      ))}
                    </div>
                    <span className="text-[9px] font-sans tracking-widest text-muted uppercase">5.0 (48 Reviews)</span>
                  </div>
                  <span className="text-2xl font-serif text-cream block">
                    ${selectedProductDetails.price.toFixed(2)}
                  </span>
                  <p className="text-body text-xs md:text-sm font-light leading-relaxed">
                    {selectedProductDetails.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2 pt-2">
                    {selectedProductDetails.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] text-muted tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom interaction controls */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-muted font-bold">
                      Quantity
                    </span>
                    <div className="flex items-center border border-white/10 rounded overflow-hidden bg-black">
                      <button
                        onClick={() => setDetailsQuantity(Math.max(1, detailsQuantity - 1))}
                        className="px-3 py-2 text-muted hover:text-cream hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-5 text-xs text-cream font-sans font-bold">{detailsQuantity}</span>
                      <button
                        onClick={() => setDetailsQuantity(detailsQuantity + 1)}
                        className="px-3 py-2 text-muted hover:text-cream hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        handleAddToCart();
                        setSelectedProductDetails(null);
                      }}
                      className="flex-1 py-4 border border-white/10 hover:border-white text-cream font-sans font-bold text-xs uppercase tracking-widest bg-transparent hover:bg-white/5 transition-all cursor-pointer"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => {
                        setCheckoutProduct(selectedProductDetails);
                        setCheckoutQuantity(detailsQuantity);
                        setSelectedProductDetails(null);
                      }}
                      className="flex-1 py-4 bg-primary text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-accent transition-colors border border-primary cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Review listings in details */}
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted block">
                    Collector Reviews
                  </span>
                  <div className="space-y-4 max-h-[160px] overflow-y-auto pr-2">
                    {selectedProductDetails.reviews.map((rev, idx) => (
                      <div key={idx} className="space-y-1 bg-white/3 border border-white/5 p-3 rounded">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-cream font-serif font-bold">{rev.author}</span>
                          <div className="flex text-primary">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={8} className="fill-primary stroke-none" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[11px] font-light text-muted italic">"{rev.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Checkout & Purchase Modal Flow --- */}
      <AnimatePresence>
        {checkoutProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#0B0B0B] border border-white/10 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl relative p-6 md:p-12"
            >
              {/* Close Button */}
              <button
                onClick={closeCheckout}
                className="absolute top-6 right-6 text-muted hover:text-cream transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer z-10"
              >
                <X size={18} />
              </button>

              <AnimatePresence mode="wait">
                {!checkoutSuccess ? (
                  <motion.div
                    key="checkout-form"
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left"
                  >
                    {/* Left: Checkout Shipping/Payment details */}
                    <form onSubmit={handlePlaceOrder} className="space-y-6">
                      <h3 className="text-2xl font-serif text-cream uppercase tracking-wide mb-6">
                        Shipping details
                      </h3>
                      
                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-sans uppercase tracking-widest text-muted font-bold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alexander Mercer"
                          className="bg-black border border-white/10 focus:border-primary/50 text-cream px-4 py-3 rounded outline-none font-sans text-xs tracking-wide transition-all w-full"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-sans uppercase tracking-widest text-muted font-bold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alexander@luxury.com"
                          className="bg-black border border-white/10 focus:border-primary/50 text-cream px-4 py-3 rounded outline-none font-sans text-xs tracking-wide transition-all w-full"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 flex flex-col space-y-2">
                          <label className="text-[9px] font-sans uppercase tracking-widest text-muted font-bold">
                            Shipping Address
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="12 Place Vendôme"
                            className="bg-black border border-white/10 focus:border-primary/50 text-cream px-4 py-3 rounded outline-none font-sans text-xs tracking-wide transition-all w-full"
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label className="text-[9px] font-sans uppercase tracking-widest text-muted font-bold">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.zip}
                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            placeholder="75001"
                            className="bg-black border border-white/10 focus:border-primary/50 text-cream px-4 py-3 rounded outline-none font-sans text-xs tracking-wide transition-all w-full"
                          />
                        </div>
                      </div>

                      {/* Payment Option Selector */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[9px] font-sans uppercase tracking-widest text-muted font-bold block">
                          Payment Method
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                          {['card', 'paypal', 'apple'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setPaymentOption(opt)}
                              className={`py-3 border rounded text-[10px] uppercase font-sans font-bold tracking-wider transition-all cursor-pointer ${
                                paymentOption === opt
                                  ? 'border-primary text-primary bg-primary/5'
                                  : 'border-white/10 text-muted hover:border-white/30'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-primary text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-accent transition-colors border border-primary flex items-center justify-center gap-3 cursor-pointer mt-4"
                      >
                        <CreditCard size={14} />
                        <span>Place Order</span>
                      </button>
                    </form>

                    {/* Right: Order Summary Calculations */}
                    <div className="flex flex-col justify-between bg-white/2 border border-white/5 rounded-lg p-6 md:p-8">
                      <div>
                        <h3 className="text-xl font-serif text-cream uppercase tracking-wide mb-6">
                          Order Summary
                        </h3>
                        
                        {/* Product detail card */}
                        <div className="flex gap-4 items-center border-b border-white/5 pb-6">
                          <img
                            src={checkoutProduct.thumbnail}
                            alt=""
                            className="w-16 h-16 object-contain bg-white/5 rounded border border-white/10"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-serif text-cream uppercase font-bold tracking-wide leading-tight">
                              {checkoutProduct.name}
                            </h4>
                            <span className="text-xs text-muted block mt-1">Quantity: {checkoutQuantity}</span>
                          </div>
                          <span className="text-sm font-serif text-cream font-bold">
                            ${(checkoutProduct.price * checkoutQuantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Calculation Details */}
                        <div className="space-y-4 pt-6 text-xs text-muted">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="text-cream">${(checkoutProduct.price * checkoutQuantity).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-cream">FREE</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxes</span>
                            <span className="text-cream">Calculated at checkout</span>
                          </div>
                          <div className="flex justify-between border-t border-white/5 pt-4 text-sm font-serif text-cream font-bold">
                            <span>Order Total</span>
                            <span className="text-primary">${(checkoutProduct.price * checkoutQuantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Assurance details */}
                      <div className="space-y-2 mt-8 text-[10px] text-muted border-t border-white/5 pt-6 leading-relaxed">
                        <p>✓ Transactions are encrypted using secure SSL protocols.</p>
                        <p>✓ A confirmation email with invoice detail is sent instantly.</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Checkout Success screen
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12 max-w-md mx-auto space-y-6"
                  >
                    {/* Pulsing check mark circle */}
                    <div className="w-20 h-20 bg-primary/10 rounded-full border border-primary/20 flex items-center justify-center text-primary relative">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                      >
                        <Check size={36} />
                      </motion.div>
                      {/* Outer ripple */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-primary/40"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary">
                        ORDER SECURED
                      </span>
                      <h3 className="text-3xl font-serif text-cream uppercase tracking-wide">
                        Thank You, {formData.name}
                      </h3>
                      <p className="text-xs text-muted font-light leading-relaxed">
                        Your order for **{checkoutQuantity}x {checkoutProduct.name}** has been successfully placed. A tracking confirmation is on its way to **{formData.email}**.
                      </p>
                    </div>

                    {/* Product Summary Card on Success Screen */}
                    <div className="flex gap-4 items-center bg-white/2 border border-white/5 rounded-lg p-4 w-full text-left">
                      <img
                        src={checkoutProduct.thumbnail}
                        alt=""
                        className="w-14 h-14 object-contain bg-white/5 rounded border border-white/10"
                      />
                      <div className="flex-1">
                        <h4 className="text-xs font-serif text-cream uppercase font-bold tracking-wide leading-tight">
                          {checkoutProduct.name}
                        </h4>
                        <span className="text-[10px] text-muted block mt-1">Quantity: {checkoutQuantity}</span>
                      </div>
                      <span className="text-xs font-serif text-primary font-bold">
                        ${(checkoutProduct.price * checkoutQuantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Order Reference details */}
                    <div className="bg-white/2 border border-white/5 rounded p-4 w-full text-xs font-mono text-cream flex justify-between tracking-wide">
                      <span className="text-muted font-sans font-bold">ORDER ID:</span>
                      <span>#SCT-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>

                    <button
                      onClick={closeCheckout}
                      className="w-full py-4 border border-white/10 hover:border-cream text-cream font-sans font-bold text-xs uppercase tracking-widest bg-transparent transition-colors flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <span>Return to Collection</span>
                      <ArrowRight size={12} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
