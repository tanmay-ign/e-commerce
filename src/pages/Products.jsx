import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  Paper,
} from '@mui/material';

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

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    subCategory: searchParams.get('subCategory') || '',
    sort: searchParams.get('sort') || 'newest',
    minPrice: searchParams.get('minPrice') || 0,
    maxPrice: searchParams.get('maxPrice') || 1000,
    search: searchParams.get('search') || '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(name, value);
      return newParams;
    });
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    }));
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('minPrice', newValue[0]);
      newParams.set('maxPrice', newValue[1]);
      return newParams;
    });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, search: value }));
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('search', value);
      return newParams;
    });
  };

  // Filter products based on current filters
  const filteredProducts = staticProducts.filter(product => {
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesSubCategory = !filters.subCategory || product.subCategory === filters.subCategory;
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase());

    return matchesCategory && matchesSubCategory && matchesPrice && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>

            <TextField
              fullWidth
              label="Search"
              value={filters.search}
              onChange={handleSearch}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={filters.category}
                label="Category"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Subcategory</InputLabel>
              <Select
                name="subCategory"
                value={filters.subCategory}
                label="Subcategory"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="shirts">Shirts</MenuItem>
                <MenuItem value="pants">Pants</MenuItem>
                <MenuItem value="dresses">Dresses</MenuItem>
                <MenuItem value="skirts">Skirts</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                name="sort"
                value={filters.sort}
                label="Sort By"
                onChange={handleFilterChange}
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating-desc">Highest Rated</MenuItem>
              </Select>
            </FormControl>

            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              sx={{ mb: 2 }}
            />
          </Paper>
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description.substring(0, 100)}...
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      href={`/products/${product.id}`}
                      sx={{ mt: 2 }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products; 