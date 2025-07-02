import { useForm } from 'react-hook-form';
import Logo from './assets/icons/Logo';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter your email' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  address: z.string().min(5, { message: 'Address is too short' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State is required' }),
  country: z.string().min(2, { message: 'Country is required' }),
   cardNumber: z
    .string()
    .min(19, { message: 'Card number must be 16 digits with spaces' }) // "4242 4242 4242 4242" length = 19
    .regex(/^(\d{4} \d{4} \d{4} \d{4})$/, {
      message: 'Card number must be in format 4242 4242 4242 4242',
    }),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
      message: 'Expiry date must be in MM/YY format',
    }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: 'CVC must be 3 or 4 digits' }),
});

type FormData = z.infer<typeof formSchema>;
function App() {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
 const hasCardErrors =
    errors.cardNumber || errors.expiryDate || errors.cvc ? true : false;
  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };
  return (
    <div className="flex w-full h-screen">
      {/* Left Panel - Fixed, no scroll */}
      <div className="w-1/2 bg-[#4B1FB8] pt-12 pl-[72px] flex items-start polygon overflow-hidden">
        <div className="max-w-[465px] w-full">
          {/* Logo */}
          <div className="pb-[72px]">
            <Logo />
          </div>

          {/* Title and Package Info */}
          <p className="text-[#BBB4FE] text-lg pb-2">Pay CDR Writer</p>
          <p className="text-[#F4F3FF] font-semibold text-[40px] pb-[72px]">
            AUD$799{' '}
            <span className="text-[#EBE9FE] text-lg font-normal">
              (Standard Package)
            </span>
          </p>

          {/* Subtotal */}
          <div className="flex justify-between items-center text-[#EBE9FE] text-[20px]">
            <span>Subtotal:</span>
            <span>AUD$799</span>
          </div>

          <hr className="mt-4 mb-8 border border-[#6838EF]" />

          {/* Deposit */}
          <div className="flex justify-between items-center text-[#EBE9FE] text-[20px] pb-6">
            <span>Deposit Paid:</span>
            <span>AUD$200</span>
          </div>

          {/* Tax */}
          <div className="flex justify-between items-center text-[#EBE9FE] text-[20px] pb-6">
            <span>Tax:</span>
            <span>AUD$0.00</span>
          </div>

          {/* Remaining */}
          <div className="flex justify-between items-center text-[#EBE9FE] text-[20px] pb-6">
            <span>Remaining Balance:</span>
            <span>AUD$599</span>
          </div>

          <hr className="mb-8 border border-[#6838EF]" />

          {/* Total Due */}
          <div className="flex justify-between items-center text-[#F4F3FF] text-[20px] font-semibold">
            <span>Total Due:</span>
            <span>AUD$599</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Scrollable */}
      <div className="w-1/2 bg-white overflow-y-auto">
        <div className="pt-12 pl-[70px] pb-12">
      <div className='max-w-[540px]'>

<p className="text-[#404348] font-semibold text-2xl">
  <span className="border-b-2 border-[#404348] pb-1">Pay</span>ment
</p>
<div>

</div>
       <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block font-medium text-[#404348]">Email</label>
            <input
              {...register('email')}
              className="mt-1 block w-full border border-[#ECECEC] rounded-md px-[14px] py-[13px]"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
 <label className="block mb-2 text-lg font-semibold text-gray-700">
        Card Information
      </label>

      {/* Container with single border, red if errors */}
      <div
        className={`rounded border ${
          hasCardErrors ? "border-red-500" : "border-gray-300"
        }`}
      >
        {/* Card Number input full width with padding */}
        <div className="px-3 py-2 border-b border-gray-300">
          <input
            {...register("cardNumber")}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            className="w-full outline-none"
          />
        </div>

        {/* Expiry and CVC side by side with vertical line between */}
        <div className="flex">
          <div className="w-1/2 px-3 py-2">
            <input
              {...register("expiryDate")}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full outline-none"
            />
          </div>

          {/* vertical line */}
          <div className="border-l border-gray-300"></div>

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

      {/* Single error message below whole card info box */}
      {hasCardErrors && (
        <p className="text-red-500 text-sm">Invalid card information.</p>
      )}

          {/* Name */}
          <div>
            <label className="block font-medium text-[#404348]">Name</label>
            <input
              {...register('name')}
              className="mt-1 block w-full border border-[#ECECEC] rounded-md px-[14px] py-[13px]"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500 text-sm ">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block  font-medium text-[#404348]">Address</label>
            <input
              {...register('address')}
              className="mt-1 block w-full border border-[#ECECEC] rounded-md px-[14px] py-[13px]"
              type="text"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* Country */}
          <div className='flex w-full gap-2'>

          <div className='w-1/2'>
            <label className="block  font-medium text-[#404348]">City</label>
            <input
              {...register('city')}
              className="mt-1 block w-full border border-[#ECECEC] rounded-md px-[14px] py-[13px]"
              type="text"
              />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city?.message}</p>
            )}
          </div>
          <div className='w-1/2'>
            <label className="block  font-medium text-[#404348]">State</label>
            <input
              {...register('state')}
              className="mt-1 block w-full border border-[#ECECEC] rounded-md px-[14px] py-[13px]"
              type="text"
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
              className="mt-1 block w-full border border-[#ECECEC] rounded-md px-[14px] py-[13px]"
              type="text"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#404348] text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </form>
    </div>
    </div>
      </div>
    </div>
  );
}

export default App;
