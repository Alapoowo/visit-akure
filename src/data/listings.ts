import { Listing, Review } from '@/types'

export const mockReviews: Review[] = [
  { id: 'r1', listingId: 'h1', userName: 'Chukwudi Okafor', rating: 5, comment: 'Excellent stay, very clean and well maintained. Punctual and professional. Will definitely book again!', createdAt: '2026-04-10' },
  { id: 'r2', listingId: 'h1', userName: 'Adaeze Nwosu', rating: 5, comment: 'Perfect experience from start to finish. The room was spotless and AC worked great throughout our stay.', createdAt: '2026-03-22' },
  { id: 'r3', listingId: 'h1', userName: 'Emeka Balogun', rating: 4, comment: 'Great hotel for the price. Smooth service and the restaurant food was excellent. Highly recommended.', createdAt: '2026-03-15' },
]

// ─── HOTELS ──────────────────────────────────────────────────────────────────
const hotelListings: Listing[] = [
  {
    id: 'h1', title: 'De Hills Hotel & Resort', category: 'hotels',
    description: "Experience luxury at De Hills Hotel & Resort, Akure's premier destination. Featuring spacious rooms, a rooftop pool, world-class restaurant, and state-of-the-art conference facilities.",
    price: 45000, priceMax: 120000, priceUnit: '/night',
    location: 'GRA, Akure, Ondo State', whatsappNumber: '2348078901234',
    images: ['/hotels/de-hills.jpg'],
    amenities: ['Swimming Pool', 'WiFi', 'Generator', 'Parking', 'Restaurant', 'Bar', 'Gym', 'Air Conditioning', 'Conference Room'],
    isFeatured: true, isApproved: true, rating: 4.9, reviewCount: 87, vendorId: 'v1', listingTier: 'luxury', isAvailable: true,
    specs: { 'Rooms': '48 Rooms', 'Bedrooms': '1–3 Bedrooms', 'Check-in': '12:00 PM', 'Check-out': '11:00 AM' },
    createdAt: '2026-01-10',
    vendor: { id: 'v1', businessName: 'De Hills Management', plan: 'featured', isVerified: true, responseRate: 100, responseTime: '30 minutes' },
    reviews: mockReviews,
  },
  {
    id: 'h2', title: 'The Executive Lodge', category: 'hotels',
    description: 'A cozy yet professional guesthouse in the heart of Akure. Perfect for business travelers and tourists looking for comfort at an affordable price.',
    price: 22000, priceMax: 35000, priceUnit: '/night',
    location: 'Alagbaka, Akure, Ondo State', whatsappNumber: '2348089012345',
    images: ['/hotels/executive.jpg'],
    amenities: ['WiFi', 'Generator', 'Parking', 'Air Conditioning', 'Hot Water', 'Security'],
    isFeatured: false, isApproved: true, rating: 4.7, reviewCount: 54, vendorId: 'v6', isAvailable: true,
    specs: { 'Rooms': '12 Rooms', 'Bedrooms': '1 Bedroom', 'Check-in': '2:00 PM', 'Check-out': '12:00 PM' },
    createdAt: '2026-01-18',
    vendor: { id: 'v6', businessName: 'Executive Lodge Ltd', plan: 'verified', isVerified: true, responseRate: 96, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'h3', title: 'Arakale Luxury Suites', category: 'hotels',
    description: 'Premium suites in the prestigious Arakale area of Akure. Each suite features designer furnishings, private balcony, and butler service.',
    price: 75000, priceMax: 150000, priceUnit: '/night',
    location: 'Arakale, Akure, Ondo State', whatsappNumber: '2348001234567',
    images: ['/hotels/arakale.jpg'],
    amenities: ['Swimming Pool', 'WiFi', 'Generator', 'Parking', 'Gym', 'Spa', 'Restaurant', 'Air Conditioning', 'Butler Service'],
    isFeatured: true, isApproved: true, rating: 4.9, reviewCount: 61, vendorId: 'v8', listingTier: 'luxury', isAvailable: true,
    specs: { 'Type': 'Luxury Suite', 'Bedrooms': '2–3 Bedrooms', 'Check-in': '2:00 PM', 'Check-out': '12:00 PM' },
    createdAt: '2026-02-01',
    vendor: { id: 'v8', businessName: 'Arakale Hospitality', plan: 'featured', isVerified: true, responseRate: 100, responseTime: '15 minutes' },
    reviews: [],
  },
  {
    id: 'h4', title: 'Heritage Inn Akure', category: 'hotels',
    description: 'Clean, comfortable and affordable accommodation right in the centre of Akure. Ideal for budget travelers, students and short business trips.',
    price: 12000, priceMax: 18000, priceUnit: '/night',
    location: 'Oke-Aro, Akure, Ondo State', whatsappNumber: '2348055601234',
    images: ['/hotels/heritage.jpg'],
    amenities: ['WiFi', 'Generator', 'Air Conditioning', 'Security', 'Parking'],
    isFeatured: false, isApproved: true, rating: 4.5, reviewCount: 32, vendorId: 'v23', listingTier: 'budget', isAvailable: true,
    specs: { 'Rooms': '20 Rooms', 'Bedrooms': '1 Bedroom', 'Check-in': '1:00 PM', 'Check-out': '12:00 PM' },
    createdAt: '2026-03-10',
    vendor: { id: 'v23', businessName: 'Heritage Inn', plan: 'basic', isVerified: false, responseRate: 88, responseTime: '2 hours' },
    reviews: [],
  },
  {
    id: 'h5', title: 'Akure Continental Hotel', category: 'hotels',
    description: 'A full-service hotel in the heart of Akure offering modern comforts, conference facilities, and excellent cuisine for both leisure and corporate guests.',
    price: 55000, priceMax: 95000, priceUnit: '/night',
    location: 'FUTA Road, Akure, Ondo State', whatsappNumber: '2348067890123',
    images: ['/hotels/continental.jpg'],
    amenities: ['Swimming Pool', 'WiFi', 'Generator', 'Parking', 'Restaurant', 'Bar', 'Air Conditioning', 'Conference Room', 'Gym'],
    isFeatured: true, isApproved: true, rating: 4.8, reviewCount: 73, vendorId: 'v5', isAvailable: true,
    specs: { 'Rooms': '65 Rooms', 'Bedrooms': '1–2 Bedrooms', 'Check-in': '12:00 PM', 'Check-out': '11:00 AM' },
    createdAt: '2026-02-15',
    vendor: { id: 'v5', businessName: 'Akure Continental', plan: 'featured', isVerified: true, responseRate: 94, responseTime: '1 hour' },
    reviews: [],
  },
]

// ─── FOODS ───────────────────────────────────────────────────────────────────
const foodListings: Listing[] = [
  {
    id: 'f1', title: "Mama Bisi's Kitchen", category: 'foods',
    description: "Authentic Ondo home-style cooking at its finest. Mama Bisi serves up mouth-watering Stew, Egusi, Ofe Akwu, Amala and Ewedu daily. A true taste of Akure's soul food.",
    price: 1800, priceMax: 4500, priceUnit: '/plate',
    location: 'Oke-Aro Market, Akure', whatsappNumber: '2348011100001',
    images: ['/foods/mama-bisi.jpg'],
    amenities: ['Dine-in Available', 'Takeaway', 'Local Dishes', 'Daily Specials', 'Affordable Meals'],
    isFeatured: false, isApproved: true, rating: 4.8, reviewCount: 211, vendorId: 'v30', listingTier: 'budget', isAvailable: true,
    specs: { 'Cuisine': 'Nigerian', 'Open': 'Mon–Sat', 'Hours': '7am – 9pm', 'Seating': '30 Seats' },
    createdAt: '2026-01-15',
    vendor: { id: 'v30', businessName: "Mama Bisi's Kitchen", plan: 'verified', isVerified: true, responseRate: 97, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'f2', title: 'The Steak & Grill Akure', category: 'foods',
    description: 'Premium steaks, grills, and continental cuisine in a relaxed upscale setting. Perfect for date nights, business dinners, and celebrations. Full bar service available.',
    price: 6000, priceMax: 18000, priceUnit: '/person',
    location: 'GRA, Akure, Ondo State', whatsappNumber: '2348022200002',
    images: ['/foods/steak-grill.jpg'],
    amenities: ['Air Conditioned', 'Full Bar', 'Private Dining', 'Reservation Required', 'WiFi'],
    isFeatured: true, isApproved: true, rating: 4.7, reviewCount: 98, vendorId: 'v31', listingTier: 'luxury', isAvailable: true,
    specs: { 'Cuisine': 'Continental & Nigerian', 'Open': 'Tue–Sun', 'Hours': '12pm – 11pm', 'Seating': '80 Seats' },
    createdAt: '2026-01-20',
    vendor: { id: 'v31', businessName: 'The Steak & Grill', plan: 'featured', isVerified: true, responseRate: 100, responseTime: '30 minutes' },
    reviews: [],
  },
  {
    id: 'f3', title: 'Ondo Delight Restaurant', category: 'foods',
    description: "A beloved Akure institution serving Ondo State's signature dishes including Ikokore, Obè Ata, Ogun Onirèwú and freshly squeezed zobo. Family-friendly and cheerful.",
    price: 2500, priceMax: 7000, priceUnit: '/plate',
    location: 'Alagbaka, Akure, Ondo State', whatsappNumber: '2348033300003',
    images: ['/foods/ondo-delight.jpg'],
    amenities: ['Family-Friendly', 'Takeaway', 'Local Specialties', 'Fresh Drinks', 'Garden Seating'],
    isFeatured: true, isApproved: true, rating: 4.6, reviewCount: 145, vendorId: 'v32', isAvailable: true,
    specs: { 'Cuisine': 'Ondo Specialties', 'Open': 'Daily', 'Hours': '8am – 10pm', 'Seating': '60 Seats' },
    createdAt: '2026-01-25',
    vendor: { id: 'v32', businessName: 'Ondo Delight', plan: 'verified', isVerified: true, responseRate: 93, responseTime: '2 hours' },
    reviews: [],
  },
  {
    id: 'f4', title: 'The Roof Garden Café', category: 'foods',
    description: 'Akure\'s trendiest rooftop café. Enjoy artisan coffee, fresh pastries, and light meals with a stunning view of the city. Popular for brunch, meetings and evening hangouts.',
    price: 3500, priceMax: 9000, priceUnit: '/person',
    location: 'Oba-Ile Road, Akure, Ondo State', whatsappNumber: '2348044400004',
    images: ['/foods/roof-garden.jpg'],
    amenities: ['Rooftop View', 'Artisan Coffee', 'WiFi', 'Air Conditioned', 'Vegan Options'],
    isFeatured: false, isApproved: true, rating: 4.9, reviewCount: 187, vendorId: 'v33', listingTier: 'luxury', isAvailable: true,
    specs: { 'Cuisine': 'Café & Continental', 'Open': 'Daily', 'Hours': '8am – 10pm', 'Seating': '50 Seats' },
    createdAt: '2026-03-01',
    vendor: { id: 'v33', businessName: 'The Roof Garden', plan: 'featured', isVerified: true, responseRate: 99, responseTime: '30 minutes' },
    reviews: [],
  },
  {
    id: 'f5', title: 'Royal Buka & Buka Bar', category: 'foods',
    description: 'The most popular buka in Akure! Generous portions of Eba, Amala, Semo with choice of soups at wallet-friendly prices. Loved by students, workers, and families alike.',
    price: 1200, priceMax: 3000, priceUnit: '/plate',
    location: 'FUTA Road, Akure, Ondo State', whatsappNumber: '2348055500005',
    images: ['/foods/royal-buka.jpg'],
    amenities: ['Large Portions', 'Takeaway', 'Affordable', 'Freshly Cooked', 'Local Soups'],
    isFeatured: false, isApproved: true, rating: 4.5, reviewCount: 322, vendorId: 'v34', listingTier: 'budget', isAvailable: true,
    specs: { 'Cuisine': 'Nigerian', 'Open': 'Mon–Sat', 'Hours': '11am – 8pm', 'Seating': '40 Seats' },
    createdAt: '2026-03-15',
    vendor: { id: 'v34', businessName: 'Royal Buka', plan: 'basic', isVerified: false, responseRate: 85, responseTime: '3 hours' },
    reviews: [],
  },
]

// ─── SHORTLETS ────────────────────────────────────────────────────────────────
const shortletListings: Listing[] = [
  {
    id: 'sl1', title: 'Royalty Apartment Suite', category: 'shortlets',
    description: 'Modern self-contained apartments with a home-away-from-home feel. Fully equipped kitchen, spacious living room, and beautiful city views.',
    price: 25000, priceMax: 35000, priceUnit: '/night',
    location: 'Oke-Aro, Akure, Ondo State', whatsappNumber: '2348090123456',
    images: ['/shortlets/royalty.jpg'],
    amenities: ['WiFi', 'Generator', 'Kitchen', 'Parking', 'Air Conditioning', 'Smart TV', 'Washing Machine'],
    isFeatured: true, isApproved: true, rating: 4.8, reviewCount: 43, vendorId: 'v7', listingTier: 'budget', isAvailable: true,
    specs: { 'Type': 'Self-Contained', 'Bedrooms': '2 Bedrooms', 'Check-in': '1:00 PM', 'Check-out': '11:00 AM' },
    createdAt: '2026-01-25',
    vendor: { id: 'v7', businessName: 'Royalty Properties', plan: 'verified', isVerified: true, responseRate: 94, responseTime: '2 hours' },
    reviews: [],
  },
  {
    id: 'sl2', title: 'Skyline Studio Apartment', category: 'shortlets',
    description: 'Stylish and modern studio apartment with high-speed WiFi, fully-equipped kitchen, and stunning skyline views. Great for solo travelers or couples.',
    price: 20000, priceMax: 30000, priceUnit: '/night',
    location: 'Alagbaka, Akure, Ondo State', whatsappNumber: '2348011223344',
    images: ['/shortlets/skyline.jpg'],
    amenities: ['WiFi', 'Generator', 'Kitchen', 'Air Conditioning', 'Smart TV', 'Balcony'],
    isFeatured: false, isApproved: true, rating: 4.6, reviewCount: 28, vendorId: 'v24', isAvailable: true,
    specs: { 'Type': 'Studio Apartment', 'Bedrooms': '1 Bedroom', 'Check-in': '2:00 PM', 'Check-out': '12:00 PM' },
    createdAt: '2026-02-10',
    vendor: { id: 'v24', businessName: 'Skyline Suites', plan: 'verified', isVerified: true, responseRate: 91, responseTime: '2 hours' },
    reviews: [],
  },
  {
    id: 'sl3', title: 'The Private Villa Akure', category: 'shortlets',
    description: 'An exclusive 4-bedroom private villa with private pool, landscaped garden, smart home system, and dedicated housekeeper. Perfect for families and groups.',
    price: 120000, priceMax: 200000, priceUnit: '/night',
    location: 'GRA, Akure, Ondo State', whatsappNumber: '2348022334455',
    images: ['/shortlets/villa.jpg'],
    amenities: ['Private Pool', 'WiFi', 'Generator', 'Housekeeper', 'Kitchen', 'Garden', 'Smart TV', 'Parking', 'BBQ Area'],
    isFeatured: true, isApproved: true, rating: 5.0, reviewCount: 19, vendorId: 'v25', listingTier: 'luxury', isAvailable: true,
    specs: { 'Type': 'Private Villa', 'Bedrooms': '4 Bedrooms', 'Capacity': 'Up to 10 Guests', 'Min. Stay': '2 Nights' },
    createdAt: '2026-03-05',
    vendor: { id: 'v25', businessName: 'The Private Villa Co.', plan: 'featured', isVerified: true, responseRate: 100, responseTime: '15 minutes' },
    reviews: [],
  },
  {
    id: 'sl4', title: 'Green Oasis Flat', category: 'shortlets',
    description: 'A peaceful and well-maintained 1-bedroom flat in a quiet neighbourhood. Ideal for solo travelers or couples seeking a homely and affordable base in Akure.',
    price: 15000, priceMax: 20000, priceUnit: '/night',
    location: 'Oba-Ile Road, Akure, Ondo State', whatsappNumber: '2348033445566',
    images: ['/shortlets/green-oasis.jpg'],
    amenities: ['WiFi', 'Generator', 'Kitchen', 'Air Conditioning', 'Security', 'Parking'],
    isFeatured: false, isApproved: true, rating: 4.4, reviewCount: 16, vendorId: 'v26', listingTier: 'budget', isAvailable: true,
    specs: { 'Type': 'Apartment Flat', 'Bedrooms': '1 Bedroom', 'Check-in': '12:00 PM', 'Check-out': '11:00 AM' },
    createdAt: '2026-04-01',
    vendor: { id: 'v26', businessName: 'Green Oasis Rentals', plan: 'basic', isVerified: false, responseRate: 86, responseTime: '3 hours' },
    reviews: [],
  },
]

// ─── SERVICES ────────────────────────────────────────────────────────────────
const serviceListings: Listing[] = [
  {
    id: 'svc1', title: 'Professional Event Photography', category: 'services',
    description: 'Award-winning event photographer with 8+ years experience. Weddings, corporate events, birthday parties, graduations and more. Same-week photo delivery, professional editing included.',
    price: 0, priceUnit: '',
    location: 'Akure, Ondo State', whatsappNumber: '2348066000111',
    images: ['/services/photography.jpg'],
    amenities: ['Same-week Delivery', 'Professional Editing', 'High-res Downloads', '2 Photographers', 'Drone Available'],
    isFeatured: true, isApproved: true, rating: 4.9, reviewCount: 156, vendorId: 'v15',
    specs: { 'Experience': '8+ Years', 'Turnaround': '5–7 Days', 'Format': 'Digital + Print', 'Coverage': 'Full Day' },
    createdAt: '2026-01-20',
    vendor: { id: 'v15', businessName: 'Lens & Light Studio', plan: 'featured', isVerified: true, responseRate: 100, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'svc2', title: 'Catering & Event Food Services', category: 'services',
    description: 'Full-service catering for all occasions. From intimate dinner parties to large corporate events. Specializing in Nigerian cuisine, continental dishes, and fusion menus. NAFDAC certified kitchen.',
    price: 0, priceUnit: '',
    location: 'Akure, Ondo State', whatsappNumber: '2348066000222',
    images: ['/services/catering.jpg'],
    amenities: ['Nigerian Cuisine', 'Continental Menu', 'Waitstaff Included', 'Equipment Rental', 'Halal Options'],
    isFeatured: false, isApproved: true, rating: 4.8, reviewCount: 94, vendorId: 'v16',
    specs: { 'Min. Order': '30 Persons', 'Notice Required': '3 Days', 'Kitchen': 'NAFDAC Certified', 'Service': 'Full Waitstaff' },
    createdAt: '2026-01-25',
    vendor: { id: 'v16', businessName: 'Taste of Ondo Catering', plan: 'verified', isVerified: true, responseRate: 95, responseTime: '2 hours' },
    reviews: [],
  },
  {
    id: 'svc3', title: 'Airport & VIP Transfer Service', category: 'services',
    description: 'Premium executive transfer service between Akure, Ondo Airport, and major cities. Professional chauffeurs, luxury vehicles, and 24/7 availability.',
    price: 0, priceUnit: '',
    location: 'Akure, Ondo State', whatsappNumber: '2348066000333',
    images: ['/services/transfer.jpg'],
    amenities: ['24/7 Available', 'Luxury Vehicles', 'Professional Chauffeur', 'Flight Tracking', 'Wi-Fi In-Car'],
    isFeatured: true, isApproved: true, rating: 4.9, reviewCount: 211, vendorId: 'v17',
    specs: { 'Coverage': 'Ondo, Lagos, Abuja', 'Fleet': 'Mercedes, Lexus', 'Booking': 'Advance or Same-day' },
    createdAt: '2026-02-01',
    vendor: { id: 'v17', businessName: 'Premier Transfers Akure', plan: 'featured', isVerified: true, responseRate: 100, responseTime: '15 minutes' },
    reviews: [],
  },
  {
    id: 'svc4', title: 'Professional Event MC & Host', category: 'services',
    description: 'Charismatic and experienced MC for weddings, corporate events, birthday parties, and product launches. Fluent in English and Yoruba. Over 500 events hosted.',
    price: 0, priceUnit: '',
    location: 'Akure, Ondo State', whatsappNumber: '2348066000444',
    images: ['/services/mc.jpg'],
    amenities: ['Bilingual (English & Yoruba)', 'Script Writing', 'Sound System', 'Games & Activities', 'Backup MC'],
    isFeatured: false, isApproved: true, rating: 4.8, reviewCount: 78, vendorId: 'v18',
    specs: { 'Events Hosted': '500+', 'Languages': 'English, Yoruba', 'Experience': '10 Years' },
    createdAt: '2026-02-10',
    vendor: { id: 'v18', businessName: 'MC Kolawole Events', plan: 'verified', isVerified: true, responseRate: 92, responseTime: '3 hours' },
    reviews: [],
  },
  {
    id: 'svc5', title: 'Home & Office Cleaning Services', category: 'services',
    description: 'Professional deep cleaning and regular maintenance for homes, offices, and short-let properties in Akure. Trusted, vetted staff, eco-friendly products.',
    price: 0, priceUnit: '',
    location: 'Akure, Ondo State', whatsappNumber: '2348066000555',
    images: ['/services/cleaning.jpg'],
    amenities: ['Deep Cleaning', 'Regular Maintenance', 'Eco-Friendly Products', 'Vetted Staff', 'Insured Service'],
    isFeatured: false, isApproved: true, rating: 4.7, reviewCount: 63, vendorId: 'v27',
    specs: { 'Coverage': 'All Akure', 'Schedule': 'One-off or Regular', 'Notice': '24 Hours' },
    createdAt: '2026-04-05',
    vendor: { id: 'v27', businessName: 'CleanSmart Akure', plan: 'verified', isVerified: true, responseRate: 93, responseTime: '2 hours' },
    reviews: [],
  },
]

// ─── HEALTH ───────────────────────────────────────────────────────────────────
const healthListings: Listing[] = [
  {
    id: 'hlth1', title: 'Akure Specialist Clinic', category: 'health',
    description: "One of Akure's leading private clinics offering general practice, specialist consultations, laboratory services, and antenatal care. 24-hour emergency services available.",
    price: 0, priceUnit: '',
    location: 'GRA, Akure, Ondo State', whatsappNumber: '2348077100001',
    images: ['/health/specialist-clinic.jpg'],
    amenities: ['24/7 Emergency', 'Laboratory', 'Pharmacy', 'Specialist Doctors', 'Antenatal Care', 'Scan Services'],
    isFeatured: true, isApproved: true, rating: 4.8, reviewCount: 143, vendorId: 'v40',
    specs: { 'Type': 'Private Clinic', 'Hours': '24 Hours', 'Emergency': 'Available', 'Insurance': 'Accepted' },
    createdAt: '2026-01-10',
    vendor: { id: 'v40', businessName: 'Akure Specialist Clinic', plan: 'featured', isVerified: true, responseRate: 99, responseTime: '30 minutes' },
    reviews: [],
  },
  {
    id: 'hlth2', title: 'Sunrise Pharmacy & Wellness', category: 'health',
    description: 'A full-service pharmacy stocking genuine drugs, supplements, baby care products, and cosmetics. Qualified pharmacist on duty. Free drug consultations.',
    price: 0, priceUnit: '',
    location: 'Alagbaka, Akure, Ondo State', whatsappNumber: '2348077100002',
    images: ['/health/sunrise-pharmacy.jpg'],
    amenities: ['Qualified Pharmacist', 'Free Consultations', 'Genuine Drugs', 'Supplements', 'Baby Products', 'Home Delivery'],
    isFeatured: false, isApproved: true, rating: 4.7, reviewCount: 89, vendorId: 'v41',
    specs: { 'Type': 'Pharmacy', 'Hours': '7am – 10pm', 'Days': 'Mon–Sat', 'Delivery': 'Within Akure' },
    createdAt: '2026-01-20',
    vendor: { id: 'v41', businessName: 'Sunrise Pharmacy', plan: 'verified', isVerified: true, responseRate: 96, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'hlth3', title: 'Akure Physiotherapy & Wellness Centre', category: 'health',
    description: 'State-of-the-art physiotherapy, sports rehabilitation, and wellness services. Our certified therapists treat back pain, injuries, post-surgical recovery, and chronic pain.',
    price: 0, priceUnit: '',
    location: 'FUTA Road, Akure, Ondo State', whatsappNumber: '2348077100003',
    images: ['/health/physio.jpg'],
    amenities: ['Physiotherapy', 'Sports Rehab', 'Massage Therapy', 'Hydrotherapy', 'Home Visits Available'],
    isFeatured: true, isApproved: true, rating: 4.9, reviewCount: 67, vendorId: 'v42',
    specs: { 'Type': 'Physiotherapy', 'Hours': '8am – 6pm', 'Days': 'Mon–Sat', 'Appointment': 'Required' },
    createdAt: '2026-02-05',
    vendor: { id: 'v42', businessName: 'Akure Physio Centre', plan: 'featured', isVerified: true, responseRate: 100, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'hlth4', title: 'Serenity Mental Wellness Clinic', category: 'health',
    description: 'Professional mental health services including counseling, therapy, and psychiatric consultations in a warm, confidential setting. Your mental health matters.',
    price: 0, priceUnit: '',
    location: 'Oke-Aro, Akure, Ondo State', whatsappNumber: '2348077100004',
    images: ['/health/mental-wellness.jpg'],
    amenities: ['Counseling', 'Psychiatric Consultations', 'Confidential', 'Online Sessions Available', 'Couples Therapy'],
    isFeatured: false, isApproved: true, rating: 4.9, reviewCount: 41, vendorId: 'v43',
    specs: { 'Type': 'Mental Health', 'Sessions': '45–60 Minutes', 'Mode': 'In-person & Online', 'Confidential': 'Yes' },
    createdAt: '2026-03-10',
    vendor: { id: 'v43', businessName: 'Serenity Wellness', plan: 'verified', isVerified: true, responseRate: 100, responseTime: '2 hours' },
    reviews: [],
  },
]

// ─── SHOPS ────────────────────────────────────────────────────────────────────
const shopListings: Listing[] = [
  {
    id: 'shp1', title: "Akure Fashion House", category: 'shops',
    description: "Akure's premier fashion destination stocking contemporary Nigerian and international brands. Men's and women's clothing, footwear, accessories, and bespoke tailoring services.",
    price: 0, priceUnit: '',
    location: 'Alagbaka Mall, Akure, Ondo State', whatsappNumber: '2348088100001',
    images: ['/shops/fashion-house.jpg'],
    amenities: ['Latest Fashion', 'Bespoke Tailoring', 'Nigerian Brands', 'International Brands', 'Online Orders'],
    isFeatured: true, isApproved: true, rating: 4.7, reviewCount: 184, vendorId: 'v50',
    specs: { 'Type': 'Fashion & Clothing', 'Open': 'Mon–Sat', 'Hours': '9am – 7pm', 'Delivery': 'Akure & Nationwide' },
    createdAt: '2026-01-15',
    vendor: { id: 'v50', businessName: 'Akure Fashion House', plan: 'featured', isVerified: true, responseRate: 98, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'shp2', title: 'TechZone Electronics Akure', category: 'shops',
    description: 'Akure\'s largest electronics store. Laptops, phones, tablets, TVs, home appliances, and accessories from trusted brands. Genuine warranty. Repair services available.',
    price: 0, priceUnit: '',
    location: 'FUTA Road, Akure, Ondo State', whatsappNumber: '2348088100002',
    images: ['/shops/techzone.jpg'],
    amenities: ['Genuine Products', 'Warranty', 'Repair Services', 'Online Orders', 'Delivery Available'],
    isFeatured: false, isApproved: true, rating: 4.6, reviewCount: 132, vendorId: 'v51',
    specs: { 'Type': 'Electronics', 'Open': 'Daily', 'Hours': '9am – 8pm', 'Brands': 'Samsung, Apple, HP & More' },
    createdAt: '2026-01-22',
    vendor: { id: 'v51', businessName: 'TechZone Electronics', plan: 'verified', isVerified: true, responseRate: 94, responseTime: '2 hours' },
    reviews: [],
  },
  {
    id: 'shp3', title: 'FreshMart Supermarket', category: 'shops',
    description: 'The most convenient supermarket in Akure. Fresh groceries, bakery, deli, household items, and personal care products under one roof. Home delivery available.',
    price: 0, priceUnit: '',
    location: 'Oba-Ile Road, Akure, Ondo State', whatsappNumber: '2348088100003',
    images: ['/shops/freshmart.jpg'],
    amenities: ['Fresh Groceries', 'Bakery', 'Deli Counter', 'Home Delivery', 'Bulk Buying'],
    isFeatured: true, isApproved: true, rating: 4.5, reviewCount: 267, vendorId: 'v52',
    specs: { 'Type': 'Supermarket', 'Open': 'Daily', 'Hours': '8am – 9pm', 'Delivery': 'Within Akure' },
    createdAt: '2026-02-08',
    vendor: { id: 'v52', businessName: 'FreshMart Akure', plan: 'featured', isVerified: true, responseRate: 96, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'shp4', title: 'Ondo Books & Stationery', category: 'shops',
    description: 'A well-stocked bookstore and stationery shop for students, professionals, and book lovers. Academic textbooks, fiction, business books, office supplies, and school materials.',
    price: 0, priceUnit: '',
    location: 'FUTA Road, Akure, Ondo State', whatsappNumber: '2348088100004',
    images: ['/shops/bookstore.jpg'],
    amenities: ['Academic Books', 'Fiction & Non-fiction', 'Office Supplies', 'School Materials', 'Printing Services'],
    isFeatured: false, isApproved: true, rating: 4.6, reviewCount: 78, vendorId: 'v53',
    specs: { 'Type': 'Books & Stationery', 'Open': 'Mon–Sat', 'Hours': '8am – 6pm', 'Printing': 'Available' },
    createdAt: '2026-03-20',
    vendor: { id: 'v53', businessName: 'Ondo Books', plan: 'basic', isVerified: false, responseRate: 87, responseTime: '3 hours' },
    reviews: [],
  },
]

// ─── LOCAL MARKET ─────────────────────────────────────────────────────────────
const marketListings: Listing[] = [
  {
    id: 'mkt1', title: 'Oja Oba (Akure Central Market)', category: 'local-market',
    description: "Akure's largest and most vibrant traditional market. Find fresh produce, spices, fabrics, food items, and traditional goods from vendors across Ondo State. The heartbeat of Akure's commerce.",
    price: 0, priceUnit: '',
    location: 'Oja Oba, Akure Central, Ondo State', whatsappNumber: '2348099100001',
    images: ['/markets/oja-oba.jpg'],
    amenities: ['Fresh Produce', 'Spices & Herbs', 'Fabrics', 'Traditional Items', 'Food Stalls', 'Open Daily'],
    isFeatured: true, isApproved: true, rating: 4.5, reviewCount: 312, vendorId: 'v60',
    specs: { 'Type': 'Traditional Market', 'Open': 'Daily', 'Hours': '6am – 6pm', 'Stalls': '500+' },
    createdAt: '2026-01-05',
    vendor: { id: 'v60', businessName: 'Oja Oba Market', plan: 'featured', isVerified: true, responseRate: 90, responseTime: '2 hours' },
    reviews: [],
  },
  {
    id: 'mkt2', title: 'Idanre Craft Village', category: 'local-market',
    description: 'A curated artisan village showcasing authentic Ondo crafts — hand-carved wood, beadwork, pottery, traditional textiles, and Idanre Hills-inspired art. Perfect for unique souvenirs.',
    price: 0, priceUnit: '',
    location: 'Idanre Road, Akure, Ondo State', whatsappNumber: '2348099100002',
    images: ['/markets/idanre-craft.jpg'],
    amenities: ['Handcrafted Goods', 'Traditional Textiles', 'Beadwork', 'Wood Carvings', 'Custom Orders'],
    isFeatured: true, isApproved: true, rating: 4.8, reviewCount: 89, vendorId: 'v61',
    specs: { 'Type': 'Craft Village', 'Open': 'Tue–Sun', 'Hours': '9am – 5pm', 'Stalls': '50+' },
    createdAt: '2026-01-18',
    vendor: { id: 'v61', businessName: 'Idanre Craft Village', plan: 'verified', isVerified: true, responseRate: 95, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'mkt3', title: 'Alagbaka Fresh Produce Market', category: 'local-market',
    description: 'Your go-to market for the freshest fruits, vegetables, and farm produce in Akure. Direct from local farms across Ondo State, delivered fresh every morning.',
    price: 0, priceUnit: '',
    location: 'Alagbaka, Akure, Ondo State', whatsappNumber: '2348099100003',
    images: ['/markets/alagbaka-market.jpg'],
    amenities: ['Farm Fresh Produce', 'Organic Options', 'Morning Deliveries', 'Bulk Buying', 'Local Farmers'],
    isFeatured: false, isApproved: true, rating: 4.6, reviewCount: 155, vendorId: 'v62',
    specs: { 'Type': 'Fresh Produce', 'Open': 'Mon–Sat', 'Hours': '6am – 3pm', 'Delivery': 'Available' },
    createdAt: '2026-02-10',
    vendor: { id: 'v62', businessName: 'Alagbaka Market', plan: 'basic', isVerified: false, responseRate: 82, responseTime: '3 hours' },
    reviews: [],
  },
  {
    id: 'mkt4', title: "Ondo Spice & Herb Bazaar", category: 'local-market',
    description: "A specialist market for Ondo State's prized spices, herbs, and natural remedies. Stock up on uda, uziza, ehuru, and other traditional cooking ingredients sourced from local farms.",
    price: 0, priceUnit: '',
    location: 'Oke-Aro, Akure, Ondo State', whatsappNumber: '2348099100004',
    images: ['/markets/spice-bazaar.jpg'],
    amenities: ['Traditional Spices', 'Herbal Remedies', 'Natural Ingredients', 'Wholesale Available', 'Expert Advice'],
    isFeatured: false, isApproved: true, rating: 4.7, reviewCount: 103, vendorId: 'v63',
    specs: { 'Type': 'Spice Market', 'Open': 'Daily', 'Hours': '8am – 6pm', 'Wholesale': 'Available' },
    createdAt: '2026-03-15',
    vendor: { id: 'v63', businessName: 'Ondo Spice Bazaar', plan: 'verified', isVerified: true, responseRate: 91, responseTime: '2 hours' },
    reviews: [],
  },
]

// ─── EVENTS ───────────────────────────────────────────────────────────────────
const eventListings: Listing[] = [
  {
    id: 'e1', title: 'Akure Cultural Festival 2026', category: 'events',
    description: 'The grand annual Akure Cultural Festival celebrating the rich heritage of the Deji Kingdom. Expect traditional dances, live drumming, art exhibitions, local cuisine, and a grand durbar procession led by His Royal Highness the Deji of Akure.',
    price: 0, priceUnit: '',
    location: 'Deji Palace Ground, Akure', whatsappNumber: '2348055000111',
    images: [],
    amenities: ['Live Music', 'Traditional Dance', 'Food Fair', 'Art Exhibition', 'Durbar Procession'],
    isFeatured: true, isApproved: true, rating: 4.9, reviewCount: 203, vendorId: 'v12',
    specs: { 'Date': 'June 12–14, 2026', 'Venue': 'Deji Palace Grounds', 'Capacity': '5,000 attendees', 'Dress Code': 'Traditional Attire' },
    createdAt: '2026-03-01',
    vendor: { id: 'v12', businessName: 'Akure Events Board', plan: 'featured', isVerified: true, responseRate: 100, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'e2', title: 'Ondo Food & Wine Festival', category: 'events',
    description: "A gastronomic celebration of Ondo State's finest cuisine, wines, and local spirits. Over 50 food vendors, cooking masterclasses by top chefs, wine tastings, and live afrobeats performances.",
    price: 0, priceUnit: '',
    location: 'Government House, Akure', whatsappNumber: '2348055000222',
    images: [],
    amenities: ['Food Tastings', 'Wine & Spirits', 'Live Music', 'Chef Masterclass', 'VIP Lounge'],
    isFeatured: true, isApproved: true, rating: 4.8, reviewCount: 142, vendorId: 'v12',
    specs: { 'Date': 'July 4–5, 2026', 'Venue': 'Government House Gardens', 'Time': '11am – 10pm', 'Age Limit': '18+' },
    createdAt: '2026-03-15',
    vendor: { id: 'v12', businessName: 'Akure Events Board', plan: 'featured', isVerified: true, responseRate: 100, responseTime: '1 hour' },
    reviews: [],
  },
  {
    id: 'e3', title: 'Akure Tech Summit 2026', category: 'events',
    description: 'The premier technology conference in Ondo State bringing together innovators, developers, startup founders, and investors. Keynotes, workshops, hackathon, and networking sessions.',
    price: 0, priceUnit: '',
    location: 'Akure Township Stadium', whatsappNumber: '2348055000333',
    images: [],
    amenities: ['Keynote Speakers', 'Workshops', 'Hackathon', 'Networking', 'Exhibition'],
    isFeatured: false, isApproved: true, rating: 4.7, reviewCount: 89, vendorId: 'v13',
    specs: { 'Date': 'August 22, 2026', 'Venue': 'Akure Township Hall', 'Capacity': '800 attendees', 'Format': 'Hybrid' },
    createdAt: '2026-04-01',
    vendor: { id: 'v13', businessName: 'Ondo Tech Hub', plan: 'verified', isVerified: true, responseRate: 97, responseTime: '2 hours' },
    reviews: [],
  },
  {
    id: 'e4', title: 'Owena Live — Afrobeats Night', category: 'events',
    description: 'An unforgettable night of live afrobeats, amapiano and highlife music featuring top Nigerian artists. Open bar, VIP tables, and a stunning outdoor stage under the stars.',
    price: 0, priceUnit: '',
    location: 'Dreams Hotel, Akure', whatsappNumber: '2348055000444',
    images: [],
    amenities: ['Live Music', 'Open Bar', 'VIP Tables', 'Photo Booth', 'Outdoor Venue'],
    isFeatured: true, isApproved: true, rating: 4.9, reviewCount: 317, vendorId: 'v14',
    specs: { 'Date': 'May 30, 2026', 'Time': '8pm – 4am', 'Dress Code': 'Smart Casual', 'VIP Available': 'Yes' },
    createdAt: '2026-04-10',
    vendor: { id: 'v14', businessName: 'Owena Entertainment', plan: 'featured', isVerified: true, responseRate: 98, responseTime: '30 minutes' },
    reviews: [],
  },
]

// ─── Combined export ──────────────────────────────────────────────────────────
export const allListings: Listing[] = [
  ...hotelListings,
  ...foodListings,
  ...shortletListings,
  ...serviceListings,
  ...healthListings,
  ...shopListings,
  ...marketListings,
  ...eventListings,
]

export const activeListings = allListings.filter(l => l.isApproved)

// Category-specific getters
export const getHotelListings = () => allListings.filter(l => l.category === 'hotels')
export const getFoodListings = () => allListings.filter(l => l.category === 'foods')
export const getShortletListings = () => allListings.filter(l => l.category === 'shortlets')
export const getServiceListings = () => allListings.filter(l => l.category === 'services')
export const getHealthListings = () => allListings.filter(l => l.category === 'health')
export const getShopListings = () => allListings.filter(l => l.category === 'shops')
export const getMarketListings = () => allListings.filter(l => l.category === 'local-market')
export const getEventsListings = () => allListings.filter(l => l.category === 'events')
export const getFeaturedListings = () => allListings.filter(l => l.isFeatured)
export const getListingById = (id: string) => allListings.find(l => l.id === id)
export const getListingsByCategory = (category: string) => allListings.filter(l => l.category === category)

// Category-scoped section helpers
export function getCategorySection(
  category: string,
  section: 'popular' | 'new' | 'budget' | 'luxury',
  limit = 8
): Listing[] {
  const base = activeListings.filter(l => l.category === category)
  if (section === 'popular') return [...base].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, limit)
  if (section === 'new') return [...base].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit)
  if (section === 'budget') return [...base].filter(l => l.listingTier === 'budget').sort((a, b) => a.price - b.price).slice(0, limit)
  if (section === 'luxury') return [...base].filter(l => l.listingTier === 'luxury').sort((a, b) => b.price - a.price).slice(0, limit)
  return []
}

// Homepage cross-category sections
export function getHomepageSection(section: 'popular' | 'new' | 'budget' | 'luxury', limit = 8): Listing[] {
  if (section === 'popular') return [...activeListings].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, limit)
  if (section === 'new') return [...activeListings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit)
  if (section === 'budget') return [...activeListings].filter(l => l.listingTier === 'budget').sort((a, b) => a.price - b.price).slice(0, limit)
  if (section === 'luxury') return [...activeListings].filter(l => l.listingTier === 'luxury').sort((a, b) => b.price - a.price).slice(0, limit)
  return []
}
