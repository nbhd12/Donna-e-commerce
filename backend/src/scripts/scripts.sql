-- Users table 
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(255)
);

-- Products table
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
    is_new_arrival BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_cart_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,
    CONSTRAINT unique_user_product UNIQUE(user_id, product_id)
);


-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_new_arrival, is_bestseller);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_product ON orders(product_id);
CREATE INDEX idx_cart_user ON cart(user_id);


-- Insert users
INSERT INTO users (first_name, last_name, email, password, created_at) VALUES 
('Emma', 'Johnson', 'emma.johnson@email.com', '$2a$12$6Bcs73jHEK4.D3b2r1HiAujqOAV6nVM1JicyV8t9uobOAh3uzppg6', '2024-01-15 10:30:00'),
('Olivia', 'Smith', 'olivia.smith@email.com', '$2a$12$6Bcs73jHEK4.D3b2r1HiAujqOAV6nVM1JicyV8t9uobOAh3uzppg6', '2024-02-20 14:45:00'),
('Ava', 'Williams', 'ava.williams@email.com', '$2a$12$6Bcs73jHEK4.D3b2r1HiAujqOAV6nVM1JicyV8t9uobOAh3uzppg6', '2024-03-10 09:15:00'),
('Sophia', 'Brown', 'sophia.brown@email.com', '$2a$12$6Bcs73jHEK4.D3b2r1HiAujqOAV6nVM1JicyV8t9uobOAh3uzppg6', '2024-03-25 16:20:00');

-- Insert categories
INSERT INTO categories (name, description, image) VALUES
('Tote', 'Spacious tote bags perfect for everyday use, work and shopping', 'tote-category.jpg'),
('Handbag', 'Classic handbags with timeless elegance and style', 'handbag-category.jpg'),
('Minibags', 'Compact and stylish mini bags for carrying essentials', 'minibags-category.jpg'),
('Sling', 'Compact sling bags for hands-free convenience', 'sling-category.jpg');

-- Insert products (4 NEW ARRIVALS, 4 BESTSELLERS marked)
INSERT INTO products (name, description, price, dimension, faq, stock, image, category_id, is_new_arrival, is_bestseller) VALUES

-- TOTE BAGS (Category 1)
('Classic Tote', 'Durable canvas tote bag with leather handles and reinforced bottom', 79.99, '18x14x6 inches', 'Q: Is it machine washable? A: Spot clean only recommended. Q: Weight capacity? A: Holds up to 25 lbs comfortably.', 85, 'canvas-tote-black.jpg', 1, TRUE, FALSE),
('Professional Work Tote', 'Structured leather tote with laptop compartment and organizer pockets', 189.99, '16x12x5 inches', 'Q: Laptop size? A: Fits up to 15 inch laptop securely. Q: Water resistant? A: Yes, treated leather is water resistant.', 62, 'work-tote-brown.jpg', 1, FALSE, TRUE),
('Beach Tote', 'Natural straw tote with striped cotton lining and inner zip pocket', 69.99, '20x15x8 inches', 'Q: Sturdy handles? A: Yes, reinforced rope handles. Q: Waterproof lining? A: Interior has water-resistant coating.', 94, 'straw-tote-natural.jpg', 1, FALSE, FALSE),
('Vegan Tote', 'Eco-friendly reversible tote in premium vegan leather with matching pouch', 129.99, '17x13x7 inches', 'Q: Two colors? A: Yes, black/tan or navy/beige options. Q: Sustainable? A: Made from recycled materials.', 71, 'reversible-tote.jpg', 1, FALSE, FALSE),
('Quilted Tote', 'Lightweight quilted nylon tote with multiple interior compartments', 99.99, '15x12x6 inches', 'Q: Easy to clean? A: Yes, wipe clean with damp cloth. Q: Zipper closure? A: Top zipper keeps items secure.', 103, 'quilted-tote-navy.jpg', 1, FALSE, FALSE),
('Everyday Tote', 'Compact leather tote perfect for essentials with crossbody strap option', 149.99, '12x10x5 inches', 'Q: Convertible? A: Yes, comes with detachable strap. Q: Daily use? A: Perfect size for phone, wallet, keys.', 78, 'mini-tote-cognac.jpg', 1, FALSE, FALSE),

-- HANDBAGS (Category 2)
('Classic Satchel', 'Timeless leather satchel with adjustable shoulder strap and gold hardware', 299.99, '12x9x5 inches', 'Q: Genuine leather? A: Yes, 100% full-grain leather. Q: Fits tablet? A: Yes, fits 10 inch tablets easily.', 45, 'satchel-black.jpg', 2, FALSE, TRUE),
('Vintage Frame Handbag', 'Retro-inspired structured bag with metal frame and kiss-lock closure', 219.99, '10x7x4 inches', 'Q: Stands upright? A: Yes, structured frame maintains shape. Q: Shoulder carry? A: Yes, 10 inch drop handle.', 38, 'frame-bag-burgundy.jpg', 2, TRUE, FALSE),
('Designer Bag', 'Slouchy soft leather hobo with magnetic snap and interior pockets', 349.99, '14x11x6 inches', 'Q: Spacious? A: Very roomy for daily essentials. Q: Zip pocket? A: Yes, secure interior zip compartment.', 29, 'hobo-tan.jpg', 2, FALSE, FALSE),
('Structured Top Handle', 'Professional structured handbag with top handles and removable strap', 269.99, '11x8x5 inches', 'Q: Office appropriate? A: Perfect for professional settings. Q: Bottom feet? A: Yes, protective metal feet.', 52, 'top-handle-navy.jpg', 2, FALSE, FALSE),
('Bucket Bag', 'Drawstring bucket bag in pebbled leather with adjustable strap', 199.99, '10x10x10 inches', 'Q: Secure closure? A: Drawstring plus magnetic button. Q: Crossbody length? A: Strap adjusts 18-24 inches.', 67, 'bucket-bag-black.jpg', 2, FALSE, FALSE),
('Doctor Bag', 'Classic structured doctor bag style with double handles and shoulder strap', 239.99, '9x7x5 inches', 'Q: Lightweight? A: Yes, despite structure weighs 1.2 lbs. Q: Interior organized? A: Multiple slip pockets inside.', 41, 'doctor-bag-cream.jpg', 2, FALSE, FALSE),

-- MINIBAGS (Category 3)
('Leather Mini', 'Refined genuine leather minibag with convertible straps and polished flap', 219.99, '10x8x4 inches', 'Q: Converts to purse? A: Yes, straps tuck for shoulder bag. Q: Closure? A: Secure flap with magnetic finish.', 88, 'mini-backpack-black.jpg', 3, FALSE, TRUE),
('Canvas Rucksack', 'Sophisticated canvas minibag with tonal drawstring and slim inner pocket', 89.99, '15x12x6 inches', 'Q: Style? A: Ideal for casual luxury looks. Q: Durable? A: Crafted from premium canvas.', 112, 'rucksack-olive.jpg', 3, TRUE, FALSE),
('Fashion Purse', 'Elegant vegan leather minibag with gold trims and structured silhouette', 159.99, '12x10x5 inches', 'Q: Comfort? A: Soft straps ensure easy wear. Q: Organization? A: Multiple pockets inside.', 73, 'fashion-backpack-burgundy.jpg', 3, FALSE, FALSE),
('Quilted Mini', 'Light quilted minibag with metal chain detail and sleek zip accents', 179.99, '11x9x5 inches', 'Q: Water resistant? A: Yes, nylon is water repellent. Q: Feel? A: Ultra-light and refined.', 59, 'quilted-backpack-black.jpg', 3, FALSE, FALSE),
('Professional Mini', 'Modern leather minibag with padded finish and minimalist profile', 249.99, '16x12x6 inches', 'Q: Style vibe? A: Effortless and chic for city wear. Q: Details? A: Subtle metal signature pieces.', 47, 'laptop-backpack-brown.jpg', 3, FALSE, FALSE),
('Drawstring Bucket', 'Contemporary bucket-style minibag with soft curves and drawstring close', 119.99, '13x11x11 inches', 'Q: Capacity? A: Perfect for daily must-haves. Q: Access? A: Wide opening with sleek ties.', 96, 'bucket-backpack-tan.jpg', 3, FALSE, FALSE),

-- SLING BAGS (Category 4)
('Crossbody Mini Sling', 'Compact crossbody sling perfect for phone, cards and essentials', 89.99, '7x5x2 inches', 'Q: Phone size? A: Fits phones up to 6.7 inches. Q: RFID blocking? A: Yes, RFID protected pockets.', 145, 'mini-sling-black.jpg', 4, FALSE, TRUE),
('Saddle Bag Sling', 'Classic saddle bag design with flap closure and adjustable strap', 249.99, '10x8x3 inches', 'Q: Real leather? A: Yes, premium full-grain leather. Q: Strap length? A: Adjusts from 20-26 inches.', 58, 'saddle-sling-cognac.jpg', 4, FALSE, FALSE),
('Camera Bag Style Sling', 'Trendy camera bag with tassel detail and zip-around closure', 139.99, '8x6x4 inches', 'Q: Multiple compartments? A: Main pocket plus front zip. Q: Tassel removable? A: Yes, decorative tassel clips off.', 92, 'camera-sling-pink.jpg', 4, TRUE, FALSE),
('Belt Bag Fanny Pack', 'Belt bag that works as sling or waist pack with chain', 79.99, '9x6x3 inches', 'Q: Hands-free? A: Yes, wear around waist or crossbody. Q: Festival ready? A: Perfect for events and travel.', 167, 'belt-bag-red.jpg', 4, FALSE, FALSE),
('Envelope Crossbody', 'Sleek envelope-style sling in smooth leather with magnetic closure', 169.99, '11x7x1 inches', 'Q: Slim profile? A: Yes, very sleek and lightweight. Q: Card slots? A: Interior has 4 card slots.', 83, 'envelope-sling-navy.jpg', 4, FALSE, FALSE),
('Woven Straw Sling', 'Summer woven straw crossbody with leather trim and adjustable strap', 99.99, '9x7x3 inches', 'Q: Summer only? A: Great year-round accent piece. Q: Lined? A: Yes, fabric lined interior.', 71, 'straw-sling-natural.jpg', 4, FALSE, FALSE);

-- Insert sample orders
INSERT INTO orders (order_number, user_id, product_id, quantity, unit_price, subtotal, status, created_at) VALUES
('ORD-001', 1, 7, 1, 299.99, 299.99, 'delivered', '2024-02-10 14:20:00'),
('ORD-001', 1, 1, 2, 79.99, 159.98, 'delivered', '2024-02-10 14:20:00');

INSERT INTO orders (order_number, user_id, product_id, quantity, unit_price, subtotal, status, created_at) VALUES
('ORD-002', 2, 2, 1, 189.99, 189.99, 'delivered', '2024-03-05 11:15:00');

INSERT INTO orders (order_number, user_id, product_id, quantity, unit_price, subtotal, status, created_at) VALUES
('ORD-003', 3, 13, 1, 219.99, 219.99, 'shipped', '2024-10-02 15:10:00'),
('ORD-003', 3, 19, 2, 89.99, 179.98, 'shipped', '2024-10-02 15:10:00'),
('ORD-003', 3, 21, 1, 139.99, 139.99, 'shipped', '2024-10-02 15:10:00');

INSERT INTO orders (order_number, user_id, product_id, quantity, unit_price, subtotal, status, created_at) VALUES
('ORD-004', 4, 9, 3, 349.99, 1049.97, 'delivered', '2024-05-22 14:50:00');