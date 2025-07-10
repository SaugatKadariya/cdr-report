import { useState } from 'react';
import Logo from '../assets/icons/Logo';

const LeftSide = ({ amount, setAmount }: { amount: string, setAmount: (val: string) => void }) => {

  const [isEditing, setIsEditing] = useState(true);

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    setAmount(value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
   <div className="xl:w-1/2 bg-[#4B1FB8] pt-12 xl:pl-[72px] px-8 flex xl:items-start polygon overflow-hidden items-center xl:h-full h-[400px] xl:justify-start justify-center">
        <div className="max-w-[465px] w-full">
          {/* Logo */}
          <div className="pb-[72px]">
            <Logo />
          </div>

      <div>
      <p className="text-[#BBB4FE] text-lg pb-2">Pay CDR Writer</p>

      {isEditing ? (
        <div className="relative max-w-[465px]">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F4F3FF] text-[40px] mr-4">
            AUD
          </span>
          <input
            className="border border-[#9A8AFB] rounded-[6px] focus:outline-none h-[68px] w-full pl-[98px] pr-3 py-1 text-[#F4F3FF] text-[40px] bg-transparent"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        <div className="h-[68px] max-w-[465px] py-1 text-[#F4F3FF] text-[40px] flex items-center">
          AUD {amount}
        </div>
      )}

      {!isEditing && (
        <button
          onClick={handleEdit}
          className="mt-2 text-white bg-[#3F1B97] rounded px-2 py-1 cursor-pointer"
        >
          Change
        </button>
      )}
    </div>
          {/* <p className="text-[#F4F3FF] font-semibold text-[40px] pb-[72px]">
            AUD$799{' '}
            <span className="text-[#EBE9FE] text-lg font-normal">
              (Standard Package)
            </span>
          </p>

          <div className="flex justify-between items-center text-[#EBE9FE] text-[20px]">
            <span>Subtotal:</span>
            <span>AUD$799</span>
          </div>

          <hr className="mt-4 mb-8 border border-[#6838EF]" />

          <div className="flex justify-between items-center text-[#EBE9FE] text-[20px] pb-6">
            <span>Deposit Paid:</span>
            <span>AUD$200</span>
          </div>

          <div className="flex justify-between items-center text-[#EBE9FE] text-[20px] pb-6">
            <span>Tax:</span>
            <span>AUD$0.00</span>
          </div>

          <div className="flex justify-between items-center text-[#EBE9FE] text-[20px] pb-6">
            <span>Remaining Balance:</span>
            <span>AUD$599</span>
          </div>

          <hr className="mb-8 border border-[#6838EF]" />

          <div className="flex justify-between items-center text-[#F4F3FF] text-[20px] font-semibold">
            <span>Total Due:</span>
            <span>AUD$599</span>
          </div> */}
        </div>
      </div>  )
}

export default LeftSide