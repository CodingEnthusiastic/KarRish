import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Star } from 'lucide-react';

const ProjectShowcase: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      id: 1,
      title: "DSA Visualiser Application",
      description: "A powerful visualization tool for Data Structures and Algorithms with interactive UI, code walkthroughs, and step-by-step animations.",
      image: "https://ristonrodrigues723.github.io/algo-visvualizer/images/pexels-tranmautritam-326503.jpg",
      tech: ["React", "TypeScript", "MongoDB"],
      stars: 234,
      category: "Data Structures",
      liveDemo: "https://coderarmyrishabh.netlify.app/",
      sourceCode: "https://github.com/CodingEnthusiastic/DSA-Visualizer-App"
    },
    {
      id: 2,
      title: "Restaurant Landing Page",
      description: "A visually stunning landing page for a premium restaurant brand featuring menu highlights, reservation options, and testimonials.",
      image: "http://coveteur.com/wp-content/uploads/2018/03/london-regent-street-best-restaurants-2.jpg",
      tech: ["HTML", "CSS", "JavaScript"],
      stars: 189,
      category: "Landing Page",
      liveDemo: "https://imperialrestaurant.in/",
      sourceCode: "https://github.com/CodingEnthusiastic/imperial-restaurant"
    },
    {
      id: 3,
      title: "Rominos Pizza",
      description: "Delicious pizza ordering platform with sleek UI, dynamic cart system, animations, and mobile responsiveness built for fast user experience.",
      image: "https://colorlib.com/wp/wp-content/uploads/sites/2/3_pizza-website-design.jpg",
      tech: ["React", "Framer Motion", "CSS"],
      stars: 312,
      category: "Pizza",
      liveDemo: "https://rominospizza.netlify.app/",
      sourceCode: "https://github.com/CodingEnthusiastic/Rominos-Pizza-OS"
    },
    {
      id: 4,
      title: "ChatBOT App",
      description: "An AI-powered chatbot platform for answering DSA queries, built with Node.js and MongoDB. Features include real-time conversations and learning feedback.",
      image: "https://botup.com/images/ai-chatbot-screenshot-1.png?v=1681707593517652013",
      tech: ["Express JS", "Node.js", "MongoDB"],
      stars: 156,
      category: "Web App",
      liveDemo: "https://chatbotindia.netlify.app/",
      sourceCode: "https://github.com/CodingEnthusiastic/CHATBOT_RISHI-KA-DSA-GURU"
    },
    {
      id: 5,
      title: "UBER LLD Design",
      description: "Low-Level Design prototype of Uber with ride flow simulation, real-time map updates, and user-driver assignment logic following system design principles.",
      image: "https://i.abcnewsfe.com/a/66ccf624-01fe-4808-b044-c23af0e43055/uber-logo-app-as-lv-240917_1726618115234_hpMain.jpg",
      tech: ["React Native", "Low Level Design", "System Design"],
      stars: 278,
      category: "System Design + Website",
      liveDemo: "https://wondrous-phoenix-e05927.netlify.app/",
      sourceCode: "https://github.com/CodingEnthusiastic/UBER_LLD_DESIGN"
    }

  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Explore Amazing
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Projects</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Discover what's possible with modern web development. Check out these incredible projects built by our community.
          </p>
          <a
            href="https://github.com/CodingEnthusiastic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span>View More Projects</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center space-x-2 mb-4">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-white/80">{project.stars} stars</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                      <p className="text-white/80 mb-6 leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-white/10 text-white/90 px-3 py-1 rounded-lg text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4">
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-purple-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;