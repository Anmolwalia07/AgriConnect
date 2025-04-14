import React from 'react'

function Feedback({testimonials}) {
  return (
    <section className="py-16 bg-white">
        <div className="container px-6 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-white shadow-lg rounded-xl">
                <p className="mb-4 italic text-gray-600">"{testimonial.text}"</p>
                <div className="font-semibold">
                  {testimonial.name}, <span className="text-green-600">{testimonial.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Feedback