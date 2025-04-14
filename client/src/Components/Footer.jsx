import React from 'react'

function Footer() {
  return (
    <footer className="py-12 text-white bg-green-900">
        <div className="container px-6 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-xl font-bold">AgriConnect</h3>
              <p className="text-green-200">Empowering farmers through technology</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-green-400">Home</a></li>
                <li><a href="#features" className="hover:text-green-400">Features</a></li>
                <li><a href="#prices" className="hover:text-green-400">Market Prices</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Contact</h4>
              <p className="text-green-200">contact@agriconnect.com</p>
              <p className="text-green-200">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer