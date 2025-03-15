'use client'
import { useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const musicSchoolTestimonial = [
  {
    quote:
      'Joining the music school transformed my understanding of music and helped me to truly discover my own sound. The instructors are world-class!',
    name: 'Alex Johnson',
    title: 'Guitar Student',
  },
  {
    quote:
      "The community and support at this school are unmatched. I've grown not just as a pianist, but also as a performer, thanks to their comprehensive approach.",
    name: 'Samantha Lee',
    title: 'Piano Student',
  },
  {
    quote:
      "This school offered me the tools and confidence to take my singing to the next level. I'm endlessly grateful for the personalized coaching.",
    name: 'Michael Chen',
    title: 'Vocal Student',
  },
  {
    quote:
      'As a violinist, finding the right mentor can be challenging, but this school matched me with a teacher who truly understands my goals and challenges.',
    name: 'Emily Taylor',
    title: 'Violin Student',
  },
  {
    quote:
      'The production courses here opened my eyes to the intricacies of music production. Highly recommend for any aspiring producers!',
    name: 'Chris Morales',
    title: 'Music Production Student',
  },
];

// Duplicate items for seamless scrolling
const loopedTestimonials = [...musicSchoolTestimonial, ...musicSchoolTestimonial];

function MusicSchoolTestimonials() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="h-[40rem] w-full dark:bg-black relative flex flex-col items-center justify-center overflow-hidden">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_39px,rgba(255,255,255,0.2)_40px),linear-gradient(90deg,transparent_39px,rgba(255,255,255,0.2)_40px)] bg-[size:40px_40px] pointer-events-none"></div>
      <h2 className="text-4xl m-2 font-bold text-center mb-8 z-10">Hear our Harmony: Voices of success</h2>
      <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8 mt-20 ">
        <div className=" rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden  bg-white dark:bg-black dark:bg-grid-white/[0.05]">
          <div className="relative flex w-full max-w-6xl overflow-hidden">
            <div
              className="flex whitespace-nowrap animate-scroll"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {loopedTestimonials.map((testimonial, index) => (
               <div
               key={index}
               className="bg-[#0f172a] text-gray-300 p-6 mx-4 rounded-xl shadow-md shadow-gray-700/50 w-130 min-h-fit flex flex-col justify-between cursor-pointer"
               onMouseEnter={() => setIsPaused(true)}
               onMouseLeave={() => setIsPaused(false)}
             >
               <p className="text-sm italic whitespace-normal">{testimonial.quote}</p>
               <div className="mt-4">
                 <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                 <p className="text-sm text-gray-400">{testimonial.title}</p>
               </div>
             </div>
             
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scrollTestimonials {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            display: flex;
            animation: scrollTestimonials 20s linear infinite;
          }
        `}
      </style>
    </div>

  )
}

export default MusicSchoolTestimonials
