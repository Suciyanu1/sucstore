import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Upload, Plus, X, Trash2 } from 'lucide-react';
import { products } from '../data/mockData';
import { cn } from '../utils/cn';

interface Variant {
  id: string;
  type: string;
  options: string[];
}

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const product = isEditing ? products.find(p => p.id === id) : null;

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || '',
    price: product?.price || '',
    oldPrice: product?.oldPrice || '',
    stock: product?.stock || '',
  });

  const [enableVariants, setEnableVariants] = useState(product?.variants && product.variants.length > 0 || false);
  const [variants, setVariants] = useState<Variant[]>(product?.variants || []);
  const [images, setImages] = useState<string[]>(product?.images || []);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload the file to a server
      // Here we'll just create a local URL for preview
      const url = URL.createObjectURL(file);
      setImages([...images, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddVariant = () => {
    const newVariant: Variant = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Size',
      options: ['']
    };
    setVariants([...variants, newVariant]);
  };

  const handleUpdateVariantType = (id: string, type: string) => {
    setVariants(variants.map(v => v.id === id ? { ...v, type } : v));
  };

  const handleAddOption = (variantId: string) => {
    setVariants(variants.map(v => v.id === variantId ? { ...v, options: [...v.options, ''] } : v));
  };

  const handleUpdateOption = (variantId: string, index: number, value: string) => {
    setVariants(variants.map(v => {
      if (v.id === variantId) {
        const newOptions = [...v.options];
        newOptions[index] = value;
        return { ...v, options: newOptions };
      }
      return v;
    }));
  };

  const handleRemoveOption = (variantId: string, index: number) => {
    setVariants(variants.map(v => {
      if (v.id === variantId) {
        return { ...v, options: v.options.filter((_, i) => i !== index) };
      }
      return v;
    }));
  };

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter(v => v.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/products')}
            className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-gray-500 mt-1">Fill in the details below to {isEditing ? 'update' : 'create'} a product.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/dashboard/products')}
            className="px-8 py-4 rounded-full font-bold text-gray-500 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl shadow-gray-200">
            {isEditing ? 'Update Product' : 'Publish Product'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <h3 className="font-bold uppercase tracking-widest text-sm border-b border-gray-50 pb-6">Basic Information</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Product Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                  placeholder="e.g. Wireless Noise Cancelling Headphones"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Description</label>
                <textarea 
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all resize-none" 
                  placeholder="Describe your product in detail..."
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Living">Home & Living</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Stock Quantity</label>
                  <input 
                    type="number" 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <h3 className="font-bold uppercase tracking-widest text-sm border-b border-gray-50 pb-6">Pricing</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Sale Price (₦)</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Regular Price (₦)</label>
                <input 
                  type="number" 
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({...formData, oldPrice: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                  placeholder="0.00"
                />
              </div>
            </div>
          </section>

          {/* Variants */}
          <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <h3 className="font-bold uppercase tracking-widest text-sm">Product Variants</h3>
              <button 
                onClick={() => setEnableVariants(!enableVariants)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                  enableVariants ? "bg-black" : "bg-gray-200"
                )}
              >
                <span className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  enableVariants ? "translate-x-6" : "translate-x-1"
                )} />
              </button>
            </div>

            {enableVariants && (
              <div className="space-y-8">
                {variants.map((variant) => (
                  <div key={variant.id} className="p-6 bg-gray-50 rounded-3xl space-y-6 relative group">
                    <button 
                      onClick={() => handleRemoveVariant(variant.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Variant Type</label>
                        <select 
                          value={variant.type}
                          onChange={(e) => handleUpdateVariantType(variant.id, e.target.value)}
                          className="w-full bg-white border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                        >
                          <option value="Size">Size</option>
                          <option value="Color">Color</option>
                          <option value="Material">Material</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Options</label>
                        <div className="flex flex-wrap gap-2">
                          {variant.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100">
                              <input 
                                type="text" 
                                value={option}
                                onChange={(e) => handleUpdateOption(variant.id, index, e.target.value)}
                                className="bg-transparent border-none p-0 text-sm focus:ring-0 w-20 outline-none"
                                placeholder="Value"
                              />
                              <button 
                                onClick={() => handleRemoveOption(variant.id, index)}
                                className="text-gray-400 hover:text-black"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => handleAddOption(variant.id)}
                            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-dashed border-gray-300 text-gray-400 hover:text-black hover:border-black transition-all text-sm"
                          >
                            <Plus size={14} /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={handleAddVariant}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:text-black hover:border-black transition-all font-bold text-sm"
                >
                  <Plus size={18} /> Add Another Variant
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Media */}
          <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <h3 className="font-bold uppercase tracking-widest text-sm border-b border-gray-50 pb-6">Product Media</h3>
            <div className="space-y-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              <div 
                onClick={handleUploadClick}
                className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all cursor-pointer group"
              >
                <Upload size={32} className="mb-4 group-hover:-translate-y-1 transition-transform" />
                <p className="text-xs font-bold uppercase tracking-widest">Upload Image</p>
                <p className="text-[10px] mt-2">PNG, JPG up to 5MB</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center relative group overflow-hidden">
                    <img src={img} alt={`Product ${i}`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => handleRemoveImage(i)}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {images.length < 4 && Array.from({ length: 4 - images.length - 1 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300">
                    <Plus size={16} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Organization */}
          <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <h3 className="font-bold uppercase tracking-widest text-sm border-b border-gray-50 pb-6">Organization</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Status</label>
                <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all">
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Scheduled</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Tags</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                  placeholder="e.g. summer, new, sale"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
