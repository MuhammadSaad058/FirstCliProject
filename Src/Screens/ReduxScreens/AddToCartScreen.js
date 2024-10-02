import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart, RemoveFromCart, ClearCart } from '../../Components/redux/action'; // Ensure correct path
import { useNavigation } from '@react-navigation/native';
const AddToCartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cart); // Use the correct key from rootReducer

  const [cartItem, setCartItem] = useState(0);

  useEffect(() => {
    setCartItem(cartData.length);
  }, [cartData]);

  const [products] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: '$10',
      color: 'Red',
      imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2024/03/androidphones-2048px-0803.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$20',
      color: 'Blue',
      imageUrl: 'https://i.pcmag.com/imagery/roundups/07ml3nh3QrzTLZ9UycfQQB2-52.fit_lim.size_1050x.jpg',
    },
    // Add more products as needed
  ]);

  const handleAddToCart = (item) => {
    // Check if the item is already in the cart
    if (cartData.some((cartItem) => cartItem.id === item.id)) {
      Alert.alert('Item already in cart', 'This item is already in your cart.');
    } else {
      dispatch(AddToCart(item));
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(RemoveFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(ClearCart());
  };
  
  const handleNext = () => {
    navigation.navigate('UserList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartCountContainer}>
        <Text style={styles.cartCountText}>Products in Cart: {cartItem}</Text>
      </View>

      <ScrollView style={styles.productList}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              <Text style={styles.productColor}>Color: {product.color}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(product.id)}>
                <Text style={styles.removeButtonText}>Remove from Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
        <Text style={styles.clearButtonText}>Clear Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={handleNext}>
        <Text style={styles.clearButtonText}>UserList</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  cartCountContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  cartCountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productList: {
    marginTop: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
  },
  productColor: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF4500',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddToCartScreen;
