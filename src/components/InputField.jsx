import react, { useState } from 'react';
import { eye, eyeOff } from 'lucide-react';
export default function InputField({
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  required = false
}) {
// state untuk toggle visibility password
    const [showPassword, setShowPassword] = useState(false);
    // menentukan tipe input berdasarkan state showPassword
    const inputType = type ===  'password' && showPassword ? 'text' : type;
    return (
        <div>
            <label className= 'block text-xs font-semibold text-slate-700 mb-1.5'>
                {label}
            </label>
            <div className='relative flex items-center'>
            {Icon && (
                <span className='absolute left-3 text-slate-400'>
                    <Icon size={16} />
                </span>
            )}
            <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all text-slate-600 placeholder:text-slate-300"
          required={required}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
            </div>
        </div>
    );

}