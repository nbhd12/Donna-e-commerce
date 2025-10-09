CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(255)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    dimension VARCHAR(100),
    faq TEXT,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image VARCHAR(255),
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    produit_id INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY (produit_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
-------------------------------------------

 Insert users (all passwords are '1234')
INSERT INTO users (first_name, last_name, email, password, created_at) VALUES
('Emma', 'Johnson', 'emma.johnson@email.com', '1234', '2024-01-15 10:30:00'),
('Olivia', 'Smith', 'olivia.smith@email.com', '1234', '2024-02-20 14:45:00'),
('Ava', 'Williams', 'ava.williams@email.com', '1234', '2024-03-10 09:15:00'),
('Sophia', 'Brown', 'sophia.brown@email.com', '1234', '2024-03-25 16:20:00'),
('Isabella', 'Davis', 'isabella.davis@email.com', '1234', '2024-04-05 11:00:00'),
('Mia', 'Miller', 'mia.miller@email.com', '1234', '2024-05-12 13:30:00'),
('Charlotte', 'Wilson', 'charlotte.wilson@email.com', '1234', '2024-06-18 15:45:00'),
('Amelia', 'Moore', 'amelia.moore@email.com', '1234', '2024-07-22 10:10:00'),
('Harper', 'Taylor', 'harper.taylor@email.com', '1234', '2024-08-30 12:25:00'),
('Evelyn', 'Anderson', 'evelyn.anderson@email.com', '1234', '2024-09-14 14:50:00'),
('Abigail', 'Thomas', 'abigail.thomas@email.com', '1234', '2024-09-28 16:15:00'),
('Emily', 'Jackson', 'emily.jackson@email.com', '1234', '2024-10-01 11:40:00');

-- Insert categories (4 categories)
INSERT INTO categories (name, description, image) VALUES
('Tote', 'Spacious tote bags perfect for everyday use, work and shopping', 'tote-category.jpg'),
('Handbag', 'Classic handbags with timeless elegance and style', 'handbag-category.jpg'),
('Backpack', 'Comfortable backpacks combining fashion and functionality', 'backpack-category.jpg'),
('Sling', 'Compact sling bags for hands-free convenience', 'sling-category.jpg');

-- Insert products (6 products per category = 24 total)
INSERT INTO products (name, description, price, dimension, faq, stock, image, category_id, quantity) VALUES

-- TOTE BAGS (Category 1) - 6 products
('Classic Canvas Tote', 'Durable canvas tote bag with leather handles and reinforced bottom', 79.99, '18x14x6 inches', 'Q: Is it machine washable? A: Spot clean only recommended. Q: Weight capacity? A: Holds up to 25 lbs comfortably.', 85, 'canvas-tote-black.jpg', 1, 1),
('Professional Work Tote', 'Structured leather tote with laptop compartment and organizer pockets', 189.99, '16x12x5 inches', 'Q: Laptop size? A: Fits up to 15 inch laptop securely. Q: Water resistant? A: Yes, treated leather is water resistant.', 62, 'work-tote-brown.jpg', 1, 1),
('Beach Straw Tote', 'Natural straw tote with striped cotton lining and inner zip pocket', 69.99, '20x15x8 inches', 'Q: Sturdy handles? A: Yes, reinforced rope handles. Q: Waterproof lining? A: Interior has water-resistant coating.', 94, 'straw-tote-natural.jpg', 1, 1),
('Reversible Vegan Tote', 'Eco-friendly reversible tote in premium vegan leather with matching pouch', 129.99, '17x13x7 inches', 'Q: Two colors? A: Yes, black/tan or navy/beige options. Q: Sustainable? A: Made from recycled materials.', 71, 'reversible-tote.jpg', 1, 1),
('Quilted Nylon Tote', 'Lightweight quilted nylon tote with multiple interior compartments', 99.99, '15x12x6 inches', 'Q: Easy to clean? A: Yes, wipe clean with damp cloth. Q: Zipper closure? A: Top zipper keeps items secure.', 103, 'quilted-tote-navy.jpg', 1, 1),
('Mini Leather Tote', 'Compact leather tote perfect for essentials with crossbody strap option', 149.99, '12x10x5 inches', 'Q: Convertible? A: Yes, comes with detachable strap. Q: Daily use? A: Perfect size for phone, wallet, keys.', 78, 'mini-tote-cognac.jpg', 1, 1),

-- HANDBAGS (Category 2) - 6 products
('Classic Leather Satchel', 'Timeless leather satchel with adjustable shoulder strap and gold hardware', 299.99, '12x9x5 inches', 'Q: Genuine leather? A: Yes, 100% full-grain leather. Q: Fits tablet? A: Yes, fits 10 inch tablets easily.', 45, 'satchel-black.jpg', 2, 1),
('Vintage Frame Handbag', 'Retro-inspired structured bag with metal frame and kiss-lock closure', 219.99, '10x7x4 inches', 'Q: Stands upright? A: Yes, structured frame maintains shape. Q: Shoulder carry? A: Yes, 10 inch drop handle.', 38, 'frame-bag-burgundy.jpg', 2, 1),
('Designer Hobo Bag', 'Slouchy soft leather hobo with magnetic snap and interior pockets', 349.99, '14x11x6 inches', 'Q: Spacious? A: Very roomy for daily essentials. Q: Zip pocket? A: Yes, secure interior zip compartment.', 29, 'hobo-tan.jpg', 2, 1),
('Structured Top Handle', 'Professional structured handbag with top handles and removable strap', 269.99, '11x8x5 inches', 'Q: Office appropriate? A: Perfect for professional settings. Q: Bottom feet? A: Yes, protective metal feet.', 52, 'top-handle-navy.jpg', 2, 1),
('Bucket Bag Leather', 'Drawstring bucket bag in pebbled leather with adjustable strap', 199.99, '10x10x10 inches', 'Q: Secure closure? A: Drawstring plus magnetic button. Q: Crossbody length? A: Strap adjusts 18-24 inches.', 67, 'bucket-bag-black.jpg', 2, 1),
('Mini Doctor Bag', 'Classic structured doctor bag style with double handles and shoulder strap', 239.99, '9x7x5 inches', 'Q: Lightweight? A: Yes, despite structure weighs 1.2 lbs. Q: Interior organized? A: Multiple slip pockets inside.', 41, 'doctor-bag-cream.jpg', 2, 1),

-- BACKPACKS (Category 3) - 6 products
('Leather Mini Backpack', 'Compact genuine leather backpack with convertible straps and flap closure', 219.99, '10x8x4 inches', 'Q: Converts to purse? A: Yes, straps tuck for shoulder bag. Q: Zipper secure? A: Double zipper with flap cover.', 88, 'mini-backpack-black.jpg', 3, 1),
('Canvas Rucksack', 'Casual drawstring rucksack with padded laptop sleeve and side pockets', 89.99, '15x12x6 inches', 'Q: Laptop protection? A: Padded sleeve for 13 inch laptop. Q: Durable? A: Heavy-duty canvas construction.', 112, 'rucksack-olive.jpg', 3, 1),
('Fashion Backpack Purse', 'Stylish vegan leather backpack with gold hardware and multiple compartments', 159.99, '12x10x5 inches', 'Q: Comfortable? A: Padded adjustable shoulder straps. Q: Pockets? A: 6 pockets total for organization.', 73, 'fashion-backpack-burgundy.jpg', 3, 1),
('Quilted Nylon Backpack', 'Lightweight quilted backpack with chain detail and front zip pockets', 179.99, '11x9x5 inches', 'Q: Water resistant? A: Yes, nylon is water repellent. Q: Heavy items? A: Best for lighter daily items.', 59, 'quilted-backpack-black.jpg', 3, 1),
('Professional Laptop Backpack', 'Sleek leather backpack with padded laptop compartment and USB port', 249.99, '16x12x6 inches', 'Q: Laptop size? A: Fits 15 inch laptop securely. Q: USB charging? A: Built-in USB charging port.', 47, 'laptop-backpack-brown.jpg', 3, 1),
('Drawstring Bucket Backpack', 'Trendy bucket-style backpack with drawstring closure and adjustable straps', 119.99, '13x11x11 inches', 'Q: Roomy? A: Very spacious main compartment. Q: Easy access? A: Yes, drawstring opens wide.', 96, 'bucket-backpack-tan.jpg', 3, 1),

-- SLING BAGS (Category 4) - 6 products
('Crossbody Mini Sling', 'Compact crossbody sling perfect for phone, cards and essentials', 89.99, '7x5x2 inches', 'Q: Phone size? A: Fits phones up to 6.7 inches. Q: RFID blocking? A: Yes, RFID protected pockets.', 145, 'mini-sling-black.jpg', 4, 1),
('Saddle Bag Sling', 'Classic saddle bag design with flap closure and adjustable strap', 249.99, '10x8x3 inches', 'Q: Real leather? A: Yes, premium full-grain leather. Q: Strap length? A: Adjusts from 20-26 inches.', 58, 'saddle-sling-cognac.jpg', 4, 1),
('Camera Bag Style Sling', 'Trendy camera bag with tassel detail and zip-around closure', 139.99, '8x6x4 inches', 'Q: Multiple compartments? A: Main pocket plus front zip. Q: Tassel removable? A: Yes, decorative tassel clips off.', 92, 'camera-sling-pink.jpg', 4, 1),
('Belt Bag Fanny Pack', 'Convertible belt bag that works as sling or waist pack with chain', 79.99, '9x6x3 inches', 'Q: Hands-free? A: Yes, wear around waist or crossbody. Q: Festival ready? A: Perfect for events and travel.', 167, 'belt-bag-red.jpg', 4, 1),
('Envelope Crossbody', 'Sleek envelope-style sling in smooth leather with magnetic closure', 169.99, '11x7x1 inches', 'Q: Slim profile? A: Yes, very sleek and lightweight. Q: Card slots? A: Interior has 4 card slots.', 83, 'envelope-sling-navy.jpg', 4, 1),
('Woven Straw Sling', 'Summer woven straw crossbody with leather trim and adjustable strap', 99.99, '9x7x3 inches', 'Q: Summer only? A: Great year-round accent piece. Q: Lined? A: Yes, fabric lined interior.', 71, 'straw-sling-natural.jpg', 4, 1);

-- Insert orders (12 orders total, max 2 per user)
INSERT INTO orders (status, created_at, user_id, total_price, quantity, produit_id, unit_price) VALUES
-- Emma Johnson (2 orders)
('delivered', '2024-02-10 14:20:00', 1, 299.99, 1, 7, 299.99),
('delivered', '2024-05-15 10:30:00', 1, 89.99, 1, 19, 89.99),

-- Olivia Smith (1 order)
('delivered', '2024-03-05 11:15:00', 2, 189.99, 1, 2, 189.99),

-- Ava Williams (2 orders)
('delivered', '2024-04-18 09:25:00', 3, 219.99, 1, 13, 219.99),
('shipped', '2024-10-02 15:10:00', 3, 249.99, 1, 20, 249.99),

-- Sophia Brown (1 order)
('delivered', '2024-05-22 14:50:00', 4, 349.99, 1, 9, 349.99),

-- Isabella Davis (2 orders)
('delivered', '2024-06-08 16:30:00', 5, 129.99, 1, 4, 129.99),
('processing', '2024-10-01 11:00:00', 5, 139.99, 1, 21, 139.99),

-- Mia Miller (1 order)
('delivered', '2024-07-12 13:45:00', 6, 79.99, 1, 1, 79.99),

-- Charlotte Wilson (1 order)
('shipped', '2024-09-25 14:25:00', 7, 169.99, 1, 23, 169.99),

-- Amelia Moore (1 order)
('pending', '2024-10-03 09:30:00', 8, 159.99, 1, 15, 159.99),

-- Harper Taylor (1 order)
('delivered', '2024-09-05 11:20:00', 9, 99.99, 1, 5, 99.99);

