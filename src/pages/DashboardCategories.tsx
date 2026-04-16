import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, FolderTree, ChevronRight, Save, X } from 'lucide-react';
import { categories as initialCategories } from '../data/mockData';
import { cn } from '../utils/cn';

interface SubCategory {
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories: SubCategory[];
}

export default function DashboardCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    subCategories: [] as SubCategory[]
  });

  const [newSubCategory, setNewSubCategory] = useState({ name: '', slug: '' });

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    const category: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCategory.name,
      slug: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      subCategories: newCategory.subCategories
    };
    setCategories([...categories, category]);
    setNewCategory({ name: '', slug: '', subCategories: [] });
    setIsAddingCategory(false);
  };

  const handleAddSubCategoryToNew = () => {
    if (!newSubCategory.name) return;
    setNewCategory({
      ...newCategory,
      subCategories: [...newCategory.subCategories, { 
        name: newSubCategory.name, 
        slug: newSubCategory.name.toLowerCase().replace(/\s+/g, '-') 
      }]
    });
    setNewSubCategory({ name: '', slug: '' });
  };

  const handleRemoveSubCategoryFromNew = (index: number) => {
    setNewCategory({
      ...newCategory,
      subCategories: newCategory.subCategories.filter((_, i) => i !== index)
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Categories</h1>
          <p className="text-gray-500 mt-1">Manage your store categories and sub-categories.</p>
        </div>
        <button 
          onClick={() => setIsAddingCategory(true)}
          className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-gray-200"
        >
          <Plus size={20} /> Add Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
          />
        </div>
      </div>

      {/* Add Category Modal/Form Overlay */}
      {isAddingCategory && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-10 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight uppercase">Add New Category</h2>
                <button onClick={() => setIsAddingCategory(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Category Name</label>
                  <input 
                    type="text" 
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                    placeholder="e.g. Electronics"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Sub-Categories</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newSubCategory.name}
                      onChange={(e) => setNewSubCategory({...newSubCategory, name: e.target.value})}
                      className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                      placeholder="e.g. Smartphones"
                    />
                    <button 
                      onClick={handleAddSubCategoryToNew}
                      className="bg-black text-white px-6 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all"
                    >
                      Add
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {newCategory.subCategories.map((sub, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                        <span className="text-sm font-medium">{sub.name}</span>
                        <button onClick={() => handleRemoveSubCategoryFromNew(i)} className="text-gray-400 hover:text-red-600">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setIsAddingCategory(false)}
                  className="flex-1 py-4 rounded-full font-bold text-gray-500 hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddCategory}
                  className="flex-1 bg-black text-white py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl shadow-gray-200"
                >
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6 group hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-black">
                  <FolderTree size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-tight">{category.name}</h3>
                  <p className="text-xs text-gray-400 font-mono">/{category.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-black transition-all">
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Sub-Categories ({category.subCategories.length})</p>
              <div className="flex flex-wrap gap-2">
                {category.subCategories.map((sub, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {sub.name}
                  </div>
                ))}
                {category.subCategories.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No sub-categories added yet.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
