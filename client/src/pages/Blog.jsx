import React from "react";
import { blogs } from "../assets/data";

const Blog = () => {
  return (
    <div className="bg-gradient-to-r from-[#fffbee] to-white py-20">
      <div className="max-padd-container">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-14">
          {blogs.map((blog, index) => (
            <div key={index} className="relative">
              
              {/* Image */}
              <div className="bg-secondary/10 p-4 rounded-2xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="shadow-md shadow-slate-900/20 rounded-xl w-full h-52 object-cover"
                />
              </div>

              {/* Category */}
              <p className="text-xs font-medium mt-6 text-gray-500 tracking-wide">
                {blog.category}
              </p>

              {/* Title */}
              <h5 className="text-base font-semibold pr-4 mb-2 line-clamp-2 text-gray-900 leading-snug">
                {blog.title}
              </h5>

              {/* Description */}
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {blog.description}
              </p>

              {/* Continue Reading */}
              <button className="mt-3 text-xs font-semibold underline underline-offset-4 text-gray-900 hover:text-primary transition">
                continue reading
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
