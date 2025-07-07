import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AmericanExpress from "../assets/icons/AmericanExpress";
import MasterCard from "../assets/icons/MasterCard";
import { VisaCard } from "../assets/icons/VisaCard";
import { formSchema } from "./formSchema";
import LeftSide from "./LeftSide";
import PaymentModal from "./PaymentModal";

type FormData = z.infer<typeof formSchema>;
function CdrReport() {

  const [modal,setModal] = useState(false);
    const {
    register,
    handleSubmit,
    setValue,
    watch,
  formState: { errors },  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
 const hasCardErrors =
    errors.cardNumber || errors.expiryDate || errors.cvc ? true : false;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value;
  const digitsOnly = rawValue.replace(/\D/g, '').substring(0, 16); 

  const formatted = digitsOnly.replace(/(.{4})/g, '$1 ').trim();

  setValue('cardNumber', formatted);
};

const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value.replace(/\D/g, '').slice(0, 4); // only digits, max 4

  if (raw.length === 1) {
    if (!['0', '1'].includes(raw)) return;
    setValue('expiryDate', raw);
    return;
  }

  if (raw.length === 2) {
    const month = parseInt(raw, 10);
    if (month < 1 || month > 12) return; 
    setValue('expiryDate', raw + '/');
    return;
  }

  if (raw.length > 2) {
    const month = raw.slice(0, 2);
    const year = raw.slice(2);
    setValue('expiryDate', `${month}/${year}`);
  }
};
const watchedFields = watch(['email', 'name', 'address', 'country', 'cardNumber', 'expiryDate', 'cvc']);

const anyEmpty = watchedFields.some(field => !field || field.trim() === '');
  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    setModal(true);
  };
  return (
  
    <div className="flex w-full h-screen">

      {/* Left Panel - Fixed, no scroll */}
   <LeftSide />

      <div className="w-1/2 bg-white overflow-y-auto">
        <div className="pt-12 pl-[70px] pb-12">
      <div className='max-w-[540px]'>

<p className="text-[#404348] font-semibold text-2xl">
  <span className="border-b-2 border-[#404348] pb-1">Pay</span>ment
</p>
<div>

</div>
       <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium text-[#404348]">Email</label>
            <input
              {...register('email')}
className={`mt-1 block w-full border ${errors.email?.message ? 'border-red-500' : 'border-[#ECECEC]'} rounded-md px-[14px] py-[13px]`}
              type="email"
              placeholder='email@example.com'
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
 <label className="block mb-2 text-lg font-semibold text-gray-700">
        Card Information
      </label>

      <div
        className={`rounded border ${
          hasCardErrors ? "border-red-500" : "border-[#ECECEC]"
        }`}
      >
       <div className="px-3 py-2 border-b border-[#ECECEC] relative">
  <input
    {...register("cardNumber")}
    placeholder="4242 4242 4242 4242"
    maxLength={19}
    className="w-full outline-none pr-28" 
    onChange={handleCardNumberChange}
  />

  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
    <MasterCard  />
    <VisaCard  />
    <AmericanExpress  />
  </div>
</div>


        <div className="flex">
          <div className="w-1/2 px-3 py-2">
            <input
              {...register("expiryDate")}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full outline-none"
                onChange={handleExpiryChange}
            />
          </div>

          <div className="border-l border-[#ECECEC]"></div>

          <div className="w-1/2 px-3 py-2">
            <input
              {...register("cvc")}
              placeholder="CVC"
              maxLength={4}
              className="w-full outline-none"
            />
          </div>
        </div>
      </div>

      {hasCardErrors && (
        <p className="text-red-500 text-sm">Invalid card information.</p>
      )}

          <div>
            <label className="block font-medium text-[#404348]">Name</label>
            <input
              {...register('name')}
className={`mt-1 block w-full border ${errors.name?.message ? 'border-red-500' : 'border-[#ECECEC]'} rounded-md px-[14px] py-[13px]`}
              type="text"
              placeholder='eg. John Doe'
            />
            {errors.name && (
              <p className="text-red-500 text-sm ">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block  font-medium text-[#404348]">Address</label>
            <input
              {...register('address')}
className={`mt-1 block w-full border ${errors.address?.message ? 'border-red-500' : 'border-[#ECECEC]'} rounded-md px-[14px] py-[13px]`}
              type="text"
              placeholder='Street Address or PO box'
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className='flex w-full gap-2'>

          <div className='w-1/2'>
            <label className="block  font-medium text-[#404348]">City</label>
            <input
              {...register('city')}
className={`mt-1 block w-full border ${errors.city?.message ? 'border-red-500' : 'border-[#ECECEC]'} rounded-md px-[14px] py-[13px]`}
              type="text"
              placeholder='City'
              />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city?.message}</p>
            )}
          </div>
          <div className='w-1/2'>
            <label className="block  font-medium text-[#404348]">State</label>
            <input
              {...register('state')}
className={`mt-1 block w-full border ${errors.state?.message ? 'border-red-500' : 'border-[#ECECEC]'} rounded-md px-[14px] py-[13px]`}
              type="text"
              placeholder='State, province, region'
              />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
            </div>
          <div>
            <label className="block  font-medium text-[#404348]">Country</label>
            <input
              {...register('country')}
className={`mt-1 block w-full border ${errors.country?.message ? 'border-red-500' : 'border-[#ECECEC]'} rounded-md px-[14px] py-[13px]`}
              type="text"
              placeholder='Country'
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

        <button
  type="submit"
  disabled={anyEmpty} 
  className={`mt-4 mb-5 px-6 py-2 rounded w-full text-white ${
    anyEmpty ? 'bg-[#BBB4FE] cursor-not-allowed' : 'bg-[#5926DB] cursor-pointer'
  }`}
>
  Pay
</button>
        </form>
        <div className='flex justify-center items-center'>
          <p className='text-[#404348] text-sm font-semibold pr-4'>

Powered by <span>Stripe</span>
          </p>
          <span className='text-[#ECECEC] pr-1.5'>|</span>
          <p className='text-[#6C6C6C] text-sm'>Terms</p>
          <p className='text-[#6C6C6C] text-sm pl-4'>Privacy</p>
        </div>
    </div>
    </div>
      </div>
   {modal && (
 <PaymentModal modal={modal} setModal={setModal} />
)}
    </div>
  );
}

export default CdrReport;
