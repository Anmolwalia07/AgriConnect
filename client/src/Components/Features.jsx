import React from 'react'
import { FaChartLine, FaComments, FaLeaf, FaSeedling, FaShieldAlt, FaTruck } from 'react-icons/fa';

function Features() {
// Feature cards data
  const features = [
    { icon: <FaLeaf />, title: "Fair Pricing", desc: "Farmers get fair prices, buyers get competitive rates" },
    { icon: <FaComments />, title: "Direct Communication", desc: "Connect directly with farmers or buyers" },
    { icon: <FaChartLine/>, title: "Real-Time Updates", desc: "Stay updated with live market prices" },
    { icon: <FaShieldAlt />, title: "Secure Payments", desc: "Safe and hassle-free transactions" },
    { icon: <FaTruck />, title: "Logistics Support", desc: "Efficient delivery services" },
    { icon: <FaSeedling />, title: "Sustainability", desc: "Promoting sustainable farming practices" },
  ];
  return (
    <section className="py-16 bg-green-50" id="features">
        <div className="container px-6 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">Why Choose AgriConnect?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="p-6 transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl">
                <div className="mb-4 text-3xl text-green-600">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}

export default Features