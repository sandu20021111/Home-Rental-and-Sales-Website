import React from "react";
import { User, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section className="bg-[#FFFBEF] py-16 pt-28">
      <div className="max-w-sm mx-auto px-4 text-center">
        {/* Badge (moved down) */}
        <div className="flex justify-center mt-8 mb-6">
          <span className="bg-black text-white text-xs px-4 py-1.5 rounded-full">
            Contact Us
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Let’s Get In Touch.
        </h1>

        {/* Sub text */}
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          Or just reach out manually to us at{" "}
          <span className="text-yellow-500 font-medium">
            contact@nestorria.com
          </span>
        </p>

        {/* Form */}
        <form className="space-y-5 text-left">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="flex items-center gap-3 bg-[#FFF6D8] border border-[#CBD5E1] rounded-full px-4 py-2.5">
              <User size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="flex items-center gap-3 bg-[#FFF6D8] border border-[#CBD5E1] rounded-full px-4 py-2.5">
              <Mail size={16} className="text-gray-500" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Enter your message"
              className="w-full bg-[#FFF6D8] border border-[#CBD5E1] rounded-xl px-4 py-3 outline-none resize-none text-sm"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2 text-sm"
          >
            Submit Form →
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
