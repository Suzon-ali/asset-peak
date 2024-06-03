const OurCustomers = () => {
    return (
      <div className="mt-5">
        <p className="text-center pb-5 font-semibold">Our Famous Customers Worlwide</p>
        <div>
          <marquee  behavior="scroll" direction="left" className="pt-10">
            <div className="flex gap-10">
             
              <div className="min-w-40">
                <img className="w-40 h-16 sm:w-40 sm:h-16" src="https://www.sloneek.com/wp-content/uploads/2022/01/kosik.svg" alt="košik"/>
              </div>
              <div className="min-w-40">
                <img className="w-40 h-16 sm:w-40 sm:h-16" src="https://www.sloneek.com/wp-content/uploads/2022/01/Volvo.svg" alt="Volvo"/>
              </div>
              <div className="min-w-40">
                <img className="w-40 h-16 sm:w-40 sm:h-16" src="https://www.sloneek.com/wp-content/uploads/2022/01/Lindt.svg" alt="Lindt"/>
              </div>
              <div className="min-w-40">
                <img className="w-40 h-16 sm:w-40 sm:h-16" src="https://www.sloneek.com/wp-content/uploads/2022/01/knigh-frank.svg" alt="knigh frank"/>
              </div>
              <div className="min-w-40">
                <img className="w-40 h-16 sm:w-40 sm:h-16" src="https://www.sloneek.com/wp-content/uploads/2022/01/Balikobot-1.svg" alt="Balikobot"/>
              </div>
              <div className="min-w-40">
                <img className="w-40 h-16 sm:w-40 sm:h-16" src="https://www.sloneek.com/wp-content/uploads/2022/01/sky.svg" alt="sky"/>
              </div>
              <div className="min-w-40">
                <img className="w-40 h-16 sm:w-40 sm:h-16" src="https://www.sloneek.com/wp-content/uploads/2022/01/cedok.svg" alt="čedok"/>
              </div>
              <div className="min-w-40">
                <img className="w-40 h-16 sm:w-40 sm:h-16" src="https://www.sloneek.com/wp-content/uploads/2022/01/Hyperia-1.svg" alt="Hyperia"/>
              </div>
              <div className="min-w-40">
                <img className="w-40 h-16 sm:w-40 sm:h-16" src="https://www.sloneek.com/wp-content/uploads/2022/01/Kontentino.svg" alt="Kontentino"/>
              </div>
            </div>
          </marquee>
        </div>
      </div>
    );
  };
  
  export default OurCustomers;
  