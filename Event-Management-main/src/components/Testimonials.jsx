

import React from 'react'
import StarRating from './StarRating'
import Title from './Title'
import { testimonials } from '../constants/data'

const Testimonials = () => {
    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 pt-12 pb-30'>
            <Title title="What our Guests Says" subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations and the world." />

            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 w-full">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs border border-gray-300">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        {/* .........................child....................... */}
                        <div className="flex items-center gap-1 mt-4">
                            <StarRating />
                        </div>

                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials