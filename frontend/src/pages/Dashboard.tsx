import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../services/api';
import { Plus, ChevronDown } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="max-w-[1200px] mx-auto pt-6">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-5">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Imran" 
            alt="Profile" 
            className="w-20 h-20 rounded-full bg-gray-200"
          />
          <div>
            <div className="text-gray-500 text-[1.1rem] mb-1">Hello admin</div>
            <h1 className="text-[1.8rem] font-semibold text-gray-900 m-0">
              Welcome back to Taxflow Admin!
            </h1>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/quotations/create')}
          className="flex items-center gap-2 bg-rose-600 border-none px-4 py-2.5 rounded-lg font-semibold text-white cursor-pointer shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] text-[0.95rem] hover:bg-rose-700 transition-colors"
        >
          <Plus size={18} />
          Create Quotation
          <ChevronDown size={18} className="ml-1" />
        </button>
      </div>

      {/* Getting Started Section */}
      <h2 className="text-[1.5rem] font-semibold text-gray-700 mb-6">
        Getting Started
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
        {/* Invoice Card */}
        <div className="refrens-card">
          <div className="refrens-card-title">Your Last Invoice</div>
          
          <div className="refrens-card-label">Invoice No.</div>
          <div className="refrens-card-value">May-25-15</div>
          
          <div className="refrens-card-label">Billed To</div>
          <div className="refrens-card-value">Vision Fab Private Limited</div>
          
          <div className="refrens-card-label">Amount</div>
          <div className="refrens-card-value">₹1,77,000</div>
          
          <div className="refrens-card-label">Invoice Date</div>
          <div className="refrens-card-value mb-0">08 Jun 2026</div>
        </div>

        {/* Quotation Card */}
        <div className="refrens-card">
          <div className="refrens-card-title">Your Last Quotation</div>
          
          <div className="refrens-card-label">Quotation No.</div>
          <div className="refrens-card-value">NA223</div>
          
          <div className="refrens-card-label">Quotation For</div>
          <div className="refrens-card-value">Vision Fab Private Limited</div>
          
          <div className="refrens-card-label">Amount</div>
          <div className="refrens-card-value">₹5,90,000</div>
          
          <div className="refrens-card-label">Quotation Date</div>
          <div className="refrens-card-value mb-0">27 Mar 2026</div>
        </div>

        {/* Expenses Card */}
        <div className="refrens-card flex flex-col">
          <div className="refrens-card-title">Expenses</div>
          <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-6">
            Stay on top of your expenses. Track and manage your finances with ease and accuracy.
          </p>
          <div className="flex-1 flex items-end justify-center">
            <img 
              src="/expense_receipt.png" 
              alt="Expense Tracker Preview" 
              className="w-full rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
