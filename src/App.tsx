/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import TrackOrder from './pages/TrackOrder';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:categorySlug" element={<Category />} />
          <Route path="category/:categorySlug/:subCategorySlug" element={<Category />} />
          <Route path="product/:productSlug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<div className="py-24 text-center text-4xl font-bold">404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

