import React from "react";

const About = () => {
  return <section>
    /*Container */
    <div>
      /* info-left side */
      <div>
        <Title 
        title1={"Your Trusted Real Estate Partner"}
        title2={"Helping You Every Step of the Way"}
        para={"Trust, clarity, and simplicity are at the core of everything we do to make your property journey easy."}
        titleStyles={'mb-10'}/>
        <div className='flex flex-col gap-6 mt-5'>
          <div className='flex gap-3'>
            <img src={assets.calendarSecondary} alt="" width={20} />
            <p>In-app scheduling for property viewings</p>
        </div>
         <div className='flex gap-3'>
            <img src={assets.graph} alt="" width={20} />
            <p>Real-time market price updates</p>
        </div>
         <div className='flex gap-3'>
            <img src={assets.map} alt="" width={20} />
            <p>User-friendly interface for smooth navigation</p>
        </div>
         <div className='flex gap-3'>
            <img src={assets.pound} alt="" width={20} />
            <p>Access to off-market properties</p>
        </div>
        </div>
        /*Rating*/
        <div className='flex items-center divide-x divide-gray-300 mt-11'></div>
        </div>
    </div>
    </section>
};

export default About;
