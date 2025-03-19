const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: "Classic White T-Shirt",
    description: "A comfortable and stylish white t-shirt made from 100% cotton.",
    price: 29.99,
    category: "men",
    subCategory: "shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 50,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    rating: 4.5,
    numReviews: 12
  },
  {
    name: "Denim Jeans",
    description: "Classic fit denim jeans with comfortable stretch fabric.",
    price: 59.99,
    category: "men",
    subCategory: "pants",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 30,
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Blue", "Black"],
    rating: 4.8,
    numReviews: 8
  },
  {
    name: "Summer Dress",
    description: "Light and breezy summer dress perfect for warm weather.",
    price: 79.99,
    category: "women",
    subCategory: "dresses",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 25,
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Pink", "Blue"],
    rating: 4.6,
    numReviews: 15
  },
  {
    name: "Pleated Skirt",
    description: "Elegant pleated skirt with comfortable elastic waistband.",
    price: 49.99,
    category: "women",
    subCategory: "skirts",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 40,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Gray"],
    rating: 4.3,
    numReviews: 10
  },
  {
    name: "Leather Belt",
    description: "Genuine leather belt with classic buckle design.",
    price: 39.99,
    category: "men",
    subCategory: "accessories",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 100,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Black"],
    rating: 4.7,
    numReviews: 20
  },
  {
    name: "Silk Scarf",
    description: "Luxurious silk scarf with beautiful pattern.",
    price: 45.99,
    category: "women",
    subCategory: "accessories",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    stock: 60,
    sizes: ["One Size"],
    colors: ["Multicolor", "Blue", "Pink"],
    rating: 4.4,
    numReviews: 18
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/fashion-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 