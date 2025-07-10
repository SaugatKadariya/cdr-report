import { zodResolver } from '@hookform/resolvers/zod';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { getNames } from 'country-list';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { z } from 'zod';
import AmericanExpress from '../assets/icons/AmericanExpress';
import MasterCard from '../assets/icons/MasterCard';
import { VisaCard } from '../assets/icons/VisaCard';
import LeftSide from './LeftSide';
import PaymentModal from './PaymentModal';
import { formSchema } from './formSchema';
type FormData = z.infer<typeof formSchema>;


function CdrReport() {
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const countryOptions = getNames()
    .sort((a, b) => a.localeCompare(b))
    .map((country) => ({
      label: country,
      value: country,
    }));

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const watchedFields = watch([
    'email',
    'name',
    'address',
    'city',
    'state',
    'country', 
  ]);

  const anyEmpty =
    watchedFields.some((field) => !field || field.trim() === '') || !amount;
const onSubmit = async () => {
  if (!stripe || !elements || !amount) return;

  try {
    const res = await fetch('http://54.179.157.41:8080/public/v1/stripes/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    const clientSecret = data?.data?.client_secret;

    const cardElement = elements.getElement(CardNumberElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
      },
    });

    if (result.error) {
      alert('Payment failed: ' + result.error.message);
    } else if (result.paymentIntent?.status === 'succeeded') {
      setModal(true)
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    alert('Something went wrong.');
  }
};






  return (
    <div className="xl:flex w-full h-screen">
<LeftSide amount={amount} setAmount={setAmount} />

      <div className="xl:w-1/2 bg-white overflow-y-auto flex justify-center items-center">
        <div className="pt-12 xl:pl-[70px] px-4 pb-12 max-w-[540px]">
          <p className="text-[#404348] font-semibold text-2xl">
            <span className="border-b-2 border-[#404348] pb-1">Pay</span>ment
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="block font-medium text-[#404348]">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="email@example.com"
                className={`mt-1 block w-full border ${
                  errors.email ? 'border-red-500' : 'border-[#ECECEC]'
                } rounded-md px-[14px] py-[13px]`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Card Information */}
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Card Information
            </label>

            <div
              // className={`rounded border ${
              //   errors.cardNumber || errors.expiryDate || errors.cvc
              //     ? 'border-red-500'
              //     : 'border-[#ECECEC]'
              // }`}
              className='border-[#ECECEC] border rounded'
            >
              <div className="px-3 py-2 border-b border-[#ECECEC] relative">
                <CardNumberElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#404348',
                        '::placeholder': { color: '#BFBFBF' },
                      },
                      invalid: { color: '#fa755a' },
                    },
                  }}
                  className="w-full outline-none pr-28"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <MasterCard />
                  <VisaCard />
                  <AmericanExpress />
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 px-3 py-2">
                  <CardExpiryElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#404348',
                          '::placeholder': { color: '#BFBFBF' },
                        },
                        invalid: { color: '#fa755a' },
                      },
                    }}
                    className="w-full outline-none"
                  />
                </div>

                <div className="border-l border-[#ECECEC]"></div>

                <div className="w-1/2 px-3 py-2">
                  <CardCvcElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#404348',
                          '::placeholder': { color: '#BFBFBF' },
                        },
                        invalid: { color: '#fa755a' },
                      },
                    }}
                    className="w-full outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#404348]">Name</label>
              <input
                {...register('name')}
                type="text"
                placeholder="eg. John Doe"
                className={`mt-1 block w-full border ${
                  errors.name ? 'border-red-500' : 'border-[#ECECEC]'
                } rounded-md px-[14px] py-[13px]`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-[#404348]">Address</label>
              <input
                {...register('address')}
                type="text"
                placeholder="Street Address or PO box"
                className={`mt-1 block w-full border ${
                  errors.address ? 'border-red-500' : 'border-[#ECECEC]'
                } rounded-md px-[14px] py-[13px]`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="flex w-full gap-2">
              <div className="w-1/2">
                <label className="block font-medium text-[#404348]">City</label>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="City"
                  className={`mt-1 block w-full border ${
                    errors.city ? 'border-red-500' : 'border-[#ECECEC]'
                  } rounded-md px-[14px] py-[13px]`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block font-medium text-[#404348]">State</label>
                <input
                  {...register('state')}
                  type="text"
                  placeholder="State, province, region"
                  className={`mt-1 block w-full border ${
                    errors.state ? 'border-red-500' : 'border-[#ECECEC]'
                  } rounded-md px-[14px] py-[13px]`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
            </div>

         <div>
  <label className="block font-medium text-[#404348]">Country</label>

  <Controller
  name="country"
  control={control}
  rules={{ required: 'Country is required' }}
  render={({ field }) => (
    <Select
      {...field}
      options={countryOptions}
      placeholder="Select Country"
      className="mt-1"
      classNamePrefix="react-select"
      value={countryOptions.find((opt) => opt.value === field.value)}
      onChange={(selected) => field.onChange(selected?.value)}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: errors.country ? 'red' : '#ECECEC',
          borderWidth: '1px',
          borderRadius: '0.375rem',
          paddingTop: '2px',
          paddingBottom: '2px',
          paddingLeft: '2px',
          paddingRight: '2px',
          boxShadow: 'none',
          '&:hover': {
            borderColor: errors.country ? 'red' : '#ccc',
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: '#404348',
        }),
      }}
    />
  )}
/>


  {errors.country && (
    <p className="text-red-500 text-sm">{errors.country.message}</p>
  )}
</div>

            <button
              type="submit"
              disabled={anyEmpty}
              className={`mt-4 mb-5 px-6 py-2 rounded w-full text-white ${
                anyEmpty
                  ? 'bg-[#BBB4FE] cursor-not-allowed'
                  : 'bg-[#5926DB] cursor-pointer'
              }`}
            >
              Pay
            </button>
          </form>

          <div className="flex justify-center items-center">
            <p className="text-[#404348] text-sm font-semibold pr-4">
              Powered by <span>Stripe</span>
            </p>
            <span className="text-[#ECECEC] pr-1.5">|</span>
            <p className="text-[#6C6C6C] text-sm">Terms</p>
            <p className="text-[#6C6C6C] text-sm pl-4">Privacy</p>
          </div>
        </div>
      </div>

      {modal && <PaymentModal modal={modal} setModal={setModal} />}
    </div>
  );
}

export default CdrReport;
