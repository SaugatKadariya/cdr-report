import Logo from '../assets/icons/Logo'

const LeftSide = () => {
  return (
   <div className="w-1/2 bg-[#4B1FB8] pt-12 pl-[72px] flex items-start polygon overflow-hidden">
        <div className="max-w-[465px] w-full">
          {/* Logo */}
          <div className="pb-[72px]">
            <Logo />
          </div>

          <p className="text-[#BBB4FE] text-lg pb-2">Pay CDR Writer</p>
          <p className="text-[#F4F3FF] font-semibold text-[40px] pb-[72px]">
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
          </div>
        </div>
      </div>  )
}

export default LeftSide