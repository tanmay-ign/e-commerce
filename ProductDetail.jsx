import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Rating,
  Divider,
} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const staticProducts = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = staticProducts.find(p => p.id === parseInt(id));

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    try {
      await addToCart(product.id, quantity, selectedSize, selectedColor);
      toast.success('Item added to cart successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding item to cart');
    }
  };

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
              }}
            />
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.numReviews} reviews)
            </Typography>
          </Box>

          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Size Selection */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Size</InputLabel>
            <Select
              value={selectedSize}
              label="Size"
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Color Selection */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={selectedColor}
              label="Color"
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {product.colors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Quantity Selection */}
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1, max: product.stock }}
            sx={{ mb: 3 }}
          />

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>

          {/* Stock Information */}
          <Typography
            variant="body2"
            color={product.stock > 0 ? 'success.main' : 'error.main'}
            sx={{ mt: 2 }}
          >
            {product.stock > 0
              ? `${product.stock} items in stock`
              : 'Currently out of stock'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 