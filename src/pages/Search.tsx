import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { products } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subCategory.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-600 mb-4">Search Results</p>
        <h1 className="text-5xl font-bold tracking-tighter uppercase">
          {query ? `"${query}"` : "Search Our Store"}
        </h1>
        <p className="text-gray-400 mt-4">Found {results.length} products matching your search.</p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-gray-50 rounded-[40px]">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 shadow-sm">
            <SearchIcon size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-2">No results found</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            We couldn't find any products matching your search. Try checking your spelling or using more general terms.
          </p>
        </div>
      )}
    </div>
  );
}
