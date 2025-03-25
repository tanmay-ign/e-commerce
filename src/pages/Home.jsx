import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Paper,
  CardActionArea,
  CardActions,
  Rating,
  Skeleton,
  Alert,
  IconButton,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Import images with optimized dimensions
import heroImage from '../images/download (7).jpeg';
import menCategoryImage from '../images/download (1).jpeg';
import womenCategoryImage from '../images/download (2).jpeg';
import product1Image from '../images/download (3).jpeg';
import product2Image from '../images/images.jpeg';
import product3Image from '../images/images (1).jpeg';
import product4Image from '../images/download (7).jpeg';
import product5Image from '../images/images (3).jpeg';
import product6Image from '../images/images (4).jpeg';

// Fallback images with optimized dimensions
const fallbackImages = {
  hero: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=95',
  men: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=95',
  women: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=95',
  product: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=95',
};

// MongoDB Product Schema (commented out for future use)
/*
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  subCategory: String,
  image: String,
  stock: Number,
  sizes: [String],
  colors: [String],
  rating: Number,
  numReviews: Number
});
*/

const staticProducts = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    description: "A comfortable and stylish white t-shirt made from 100% cotton.",
    price: 29.99,
    category: "men",
    subCategory: "shirts",
    image: product1Image,
    stock: 50,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    rating: 4.5,
    numReviews: 12
  },
  {
    id: 2,
    name: "Denim Jeans",
    description: "Classic fit denim jeans with comfortable stretch fabric.",
    price: 59.99,
    category: "men",
    subCategory: "pants",
    image: product2Image,
    stock: 30,
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Blue", "Black"],
    rating: 4.8,
    numReviews: 8
  },
  {
    id: 3,
    name: "Summer Dress",
    description: "Light and breezy summer dress perfect for warm weather.",
    price: 79.99,
    category: "women",
    subCategory: "dresses",
    image: product3Image,
    stock: 25,
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Pink", "Blue"],
    rating: 4.6,
    numReviews: 15
  },
  {
    id: 4,
    name: "Pleated Skirt",
    description: "Elegant pleated skirt with comfortable elastic waistband.",
    price: 49.99,
    category: "women",
    subCategory: "skirts",
    image: product4Image,
    stock: 40,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Gray"],
    rating: 4.3,
    numReviews: 10
  },
  {
    id: 5,
    name: "Floral Maxi Dress",
    description: "Beautiful floral print maxi dress perfect for summer occasions.",
    price: 89.99,
    category: "women",
    subCategory: "dresses",
    image: product5Image,
    stock: 20,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink", "Blue", "White"],
    rating: 4.7,
    numReviews: 18
  },
  {
    id: 6,
    name: "Casual Blazer",
    description: "Versatile blazer that can be dressed up or down.",
    price: 69.99,
    category: "women",
    subCategory: "jackets",
    image: product6Image,
    stock: 35,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Gray"],
    rating: 4.4,
    numReviews: 14
  },
  {
    id: 7,
    name: "High-Waist Jeans",
    description: "Flattering high-waist jeans with perfect stretch.",
    price: 59.99,
    category: "women",
    subCategory: "pants",
    image: product2Image,
    stock: 45,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue", "Black"],
    rating: 4.6,
    numReviews: 22
  },
  {
    id: 8,
    name: "Silk Blouse",
    description: "Luxurious silk blouse with elegant design.",
    price: 49.99,
    category: "women",
    subCategory: "shirts",
    image: product1Image,
    stock: 30,
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Black", "Pink"],
    rating: 4.5,
    numReviews: 16
  }
];

const categories = [
  {
    name: "Men's Collection",
    image: menCategoryImage,
    link: "/products?category=men",
    description: "Discover our latest men's fashion collection"
  },
  {
    name: "Women's Collection",
    image: womenCategoryImage,
    link: "/products?category=women",
    description: "Explore our women's fashion trends"
  }
];

const featuredCategories = [
  {
    name: 'Dresses',
    image: product3Image,
    subCategory: 'dresses'
  },
  {
    name: 'Tops',
    image: product1Image,
    subCategory: 'shirts'
  },
  {
    name: 'Bottoms',
    image: product2Image,
    subCategory: 'pants'
  },
  {
    name: 'Accessories',
    image: product4Image,
    subCategory: 'accessories'
  }
];

const Home = () => {
  const [featuredProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Initialize quantities for each product
    const initialQuantities = {};
    featuredProducts.forEach(product => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);

    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [featuredProducts]);

  const handleImageError = (imageKey) => {
    setImageErrors(prev => ({
      ...prev,
      [imageKey]: true
    }));
  };

  const getImage = (imageKey, fallbackKey) => {
    return imageErrors[imageKey] ? fallbackImages[fallbackKey] : imageKey;
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => {
      const currentQuantity = prev[productId] || 1;
      const newQuantity = currentQuantity + change;
      const product = featuredProducts.find(p => p.id === productId);
      
      if (newQuantity < 1 || newQuantity > product.stock) {
        return prev;
      }
      
      return {
        ...prev,
        [productId]: newQuantity
      };
    });
  };

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section with enhanced background image */}
      <Box
        sx={{
          position: 'relative',
          height: '80vh',
          width: '100%',
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Box
          component="img"
          src={getImage(heroImage, 'hero')}
          alt="Fashion Hero"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.9)',
            transition: 'transform 10s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          onError={() => handleImageError('hero')}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container maxWidth="md">
            <Box textAlign="center" color="white">
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  mb: 3,
                }}
              >
                Discover the Latest Fashion Trends
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                paragraph
                sx={{
                  mb: 4,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                Explore our collection of stylish clothing and accessories for every occasion.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/products"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '30px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                  },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Featured Products Section with optimized images */}
      <Container>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              backgroundColor: 'primary.main',
            }
          }}
        >
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {loading ? (
            // Loading skeletons
            [...Array(4)].map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card>
                  <Skeleton variant="rectangular" height={250} />
                  <CardContent>
                    <Skeleton variant="text" height={32} />
                    <Skeleton variant="text" height={60} />
                    <Skeleton variant="text" height={24} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            featuredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardActionArea component={RouterLink} to={`/products/${product.id}`}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={getImage(product.image, 'product')}
                      alt={product.name}
                      onError={() => handleImageError(product.image)}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                  </CardActionArea>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description.substring(0, 100)}...
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={product.rating} readOnly precision={0.5} size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.numReviews})
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <IconButton 
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={quantities[product.id] <= 1}
                        size="small"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={quantities[product.id]}
                        size="small"
                        sx={{ width: '60px', mx: 1 }}
                        inputProps={{ 
                          min: 1, 
                          max: product.stock,
                          style: { textAlign: 'center' }
                        }}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value >= 1 && value <= product.stock) {
                            setQuantities(prev => ({
                              ...prev,
                              [product.id]: value
                            }));
                          }
                        }}
                      />
                      <IconButton 
                        onClick={() => handleQuantityChange(product.id, 1)}
                        disabled={quantities[product.id] >= product.stock}
                        size="small"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      component={RouterLink}
                      to={`/products/${product.id}`}
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Categories Section with optimized images */}
      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              backgroundColor: 'primary.main',
            }
          }}
        >
          Shop by Category
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.name} xs={12} md={6}>
              <Card
                component={RouterLink}
                to={category.link}
                sx={{
                  height: '500px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={getImage(category.image, category.name.toLowerCase().includes('men') ? 'men' : 'women')}
                  alt={category.name}
                  onError={() => handleImageError(category.image)}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    {category.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Shop Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* New Section: Featured Categories */}
      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              backgroundColor: 'primary.main',
            }
          }}
        >
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {featuredCategories.map((category) => (
            <Grid item key={category.name} xs={6} md={3}>
              <Card
                component={RouterLink}
                to={`/products?subCategory=${category.subCategory}`}
                sx={{
                  height: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={getImage(category.image, 'product')}
                  alt={category.name}
                  sx={{
                    objectFit: 'cover',
                    filter: 'brightness(0.7)',
                    transform: 'scale(1.1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* New Section: Newsletter */}
      <Container sx={{ mt: 8, mb: 8 }}>
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Get the latest updates on new products and upcoming sales
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home; 