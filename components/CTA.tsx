const CallToAction = () => {
  return (
    <div className="flex container flex-col justify-between mb-4 bg-[#0A190F] text-white px-5 py-6 rounded-2xl sm:flex-row">
      <div className="">
        <h4 className="text-2xl sm:text-3xl sm:w-52 py-6">
          Ready To Get Our New Stuff?
        </h4>
        <div className="relative">
          <input
            type="email"
            placeholder="Your email"
            className="bg-white text-sm text-black outline-none placeholder:text-gray-400 w-full py-2 px-4 rounded-full"
          />
          <button className="absolute text-xs right-2 top-1 bg-[#0A190F]/90 rounded-full px-4 py-1.5 cursor-pointer transition-all hover:bg-[#0A190F]">
            Send
          </button>
        </div>
      </div>
      <div className="sm:self-end pt-8 pb-4 text-sm sm:text-base">
        <p>Devish blog for devs and enthusiasts.</p>
      </div>
    </div>
  );
};

export default CallToAction;
