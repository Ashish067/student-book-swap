import React from "react";

const Footer = () => {
  return (
    <>
      <div className="m-auto px-20 py-10 ">
        <div className="border-b-1 border-b-gray-300 grid grid-cols-3">
          <div className="p-10">
            <h2 className="text-gray-700 text-2xl font-bold">
              StudentBookSwap
            </h2>
            <p className="text-gray-400 mt-2">
              A platform for students to buy and sell used textbooks at
              reasonable prices.
            </p>
          </div>
          <div className="p-10">
            <h2 className="text-gray-700 text-2xl font-bold">Quick Links</h2>
            <ul>
              <li className="text-gray-400 mt-2">
                <a href="#">Home</a>
              </li>
              <li className="text-gray-400 mt-2">
                <a href="#">Sell a Book</a>
              </li>
              <li className="text-gray-400 mt-2">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="p-10">
            <h2 className="text-gray-700 text-2xl font-bold">Account</h2>
            <ul>
              <li className="text-gray-400 mt-2">
                <a href="#">Login</a>
              </li>
              <li className="text-gray-400 mt-2">
                <a href="#">Register</a>
              </li>
            </ul>
          </div>
        </div>
        <span className="text-gray-400 flex items-center justify-center mt-3">
          &copy; StudentBookSwap. All rights reserved.
        </span>
      </div>
    </>
  );
};

export default Footer;
