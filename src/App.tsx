import React, { useState, useEffect } from 'react';
import CodeGenerator from './components/CodeGenerator';
import ProjectShowcase from './components/ProjectShowcase';
import { 
  Zap, 
  Globe, 
  Smartphone, 
  Code, 
  Palette, 
  Shield, 
  ArrowRight, 
  Check, 
  Star,
  Menu,
  X,
  Bot,
  ChevronDown,
  Play,
  Sparkles,
  Timer,
  Users,
  ChevronLeft,
  ChevronRight,
  Trophy,
  History,
  MessageSquare
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showAIBuilder, setShowAIBuilder] = useState(true);
  const [currentHowItWorksSlide, setCurrentHowItWorksSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Design",
      description: "Let our advanced AI create stunning websites tailored to your brand in seconds"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "SEO Optimized",
      description: "Built-in SEO optimization ensures your website ranks higher on search engines"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Responsive",
      description: "Every website is automatically optimized for all devices and screen sizes"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Production-ready, clean code that's easy to maintain and extend"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Themes",
      description: "Choose from hundreds of professional themes or let AI create a unique design"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Fast",
      description: "Enterprise-grade security with lightning-fast loading speeds"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for personal projects and small businesses",
      features: [
        "5 AI-generated websites",
        "Basic customization",
        "Mobile responsive design",
        "SSL certificate included",
        "24/7 support"
      ],
      isPopular: false,
      
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for growing businesses and agencies",
      features: [
        "Unlimited AI websites",
        "Advanced customization",
        "SEO optimization tools",
        "Analytics dashboard",
        "Custom domain support",
        "Priority support",
        "White-label options"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations with advanced needs",
      features: [
        "Everything in Professional",
        "Advanced AI models",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom branding",
        "Advanced security features"
      ],
      isPopular: false
    }
  ];

  const testimonials = [
    {
    name: "Santosh Shenoy",
    role: "Software Engineer",
    company: "Uber",
    content:
      "KarRish delivers fast, clean, and scalable code. It’s like having an expert dev team working in the background.",
    rating: 5,
      imageUrl: "https://media.licdn.com/dms/image/v2/D4D22AQFQBDomCcFHGQ/feedshare-shrink_1280/B4DZXNtkZzHAAk-/0/1742913031155?e=1755129600&v=beta&t=CqXmjSevBMjrGRhzht366xx8HLj2Vf6SHvAdMacAQnk"
  },
    {
      name: "Rohit Negi",
      role: "Founder",
      company: "CoderArmy",
      content: "As a Gen-AI instructor, I was skeptical about AI-generated websites. KarRish proved me wrong with its attention to detail and design quality.",
      rating: 5,
      imageUrl: "https://yt3.googleusercontent.com/ytc/AIdro_kMl44oPi4fNs0L0DhQxsXWFhMWym0bfH3tagBnNeBkNyc=s900-c-k-c0x00ffffff-no-rj"
    },
    {
    name: "Sagar Shah",
    role: "Founder",
    company: "ChessBase India",
    content:
      "KarRish helped us showcase our chess ecosystem beautifully. The UI is intuitive, and everything just works.",
    rating: 5,
      imageUrl:"https://www.profileage.com/wp-content/uploads/2024/10/sagar_shah.jpg"
  }
  ];

  const howItWorksSlides = [
    {
      id: 1,
      title: "1. Describe Your Vision",
      description: "Tell our AI about your business, goals, and preferences in plain English. Our advanced AI understands context and creates exactly what you need.",
      image: "/screenshots/step1-describe.png",
      icon: <Timer className="w-8 h-8 text-white" />
    },
    
    {
      id: 2,
      title: "2. Live Preview & Edit",
      description: "See your website come to life instantly with our live preview. Make changes, test functionality, and perfect your design in real-time.",
      image: "/screenshots/step3-preview.png",
      icon: <Play className="w-8 h-8 text-white" />
    },
    {
      id: 3,
      title: "3. Go Full Screen and Deploy Instantly",
      description: "Launch your website to the world with one click. Deploy to Netlify, Vercel, or download your files for any hosting platform.",
      image: "/screenshots/step4-deploy.png",
      icon: <Globe className="w-8 h-8 text-white" />
    }
  ];

  const nextHowItWorksSlide = () => {
    setCurrentHowItWorksSlide((prev) => (prev + 1) % howItWorksSlides.length);
  };

  const prevHowItWorksSlide = () => {
    setCurrentHowItWorksSlide((prev) => (prev - 1 + howItWorksSlides.length) % howItWorksSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextHowItWorksSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                {/* <Sparkles className="w-5 h-5 text-white" /> */}
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">KarRish</span>
            </div>

            {/* Desktop Menu */}
           
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Reviews</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Back on Top</a>
{/*               <a href="#historys" className="text-white/80 hover:text-white transition-colors">History</a> */}
            
              <button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105" 
                onClick={() => {
                  setShowAIBuilder(true);
                  setTimeout(() => {
                    document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Get Started
              </button>
            </div>


            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
         
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
              <div className="px-4 py-4 space-y-4">
                <a href="#features" className="block text-white/80 hover:text-white transition-colors">Features</a>
                <a href="#projects" className="block text-white/80 hover:text-white transition-colors">Projects</a>
                <a href="#how-it-works" className="block text-white/80 hover:text-white transition-colors">How it Works</a>
                <a href="#pricing" className="block text-white/80 hover:text-white transition-colors">Pricing</a>
                <a href="#testimonials" className="block text-white/80 hover:text-white transition-colors">Reviews</a>
{/*                 <a href="#historys" className="block text-white/80 hover:text-white transition-colors">History</a> */}
                <button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300" 
                  onClick={() => {
                    setShowAIBuilder(true);
                    setTimeout(() => {
                      document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          )}

        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Create Professional Websites
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                From KarRish
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-10 pt-5 max-w-3xl mx-auto leading-relaxed">
              Build beautiful, responsive websites with our intuitive tools and modern templates. 
              From concept to launch in minutes, not months.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button 
                className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
                onClick={() => {
                  setShowAIBuilder(true);
                  setTimeout(() => {
                    document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Start Building Now
                <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                className="group flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span>View Projects</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">9876+</div>
                <div className="text-white/60">Websites Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98.9%</div>
                <div className="text-white/60">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">569+</div>
                <div className="text-white/60">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <div id="projects" className="pt-0">
        <ProjectShowcase />
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Modern Websites</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Professional tools and features that help you build stunning websites that convert
            </p>
          </div>

          {/* Marquee Container */}
          <div className="marquee-container">
            <div className="marquee-content">
              {/* Triple set of cards for proper seamless loop */}
              {[...features, ...features, ...features].map((feature, index) => (
                <div 
                  key={index}
                  className="marquee-card group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      {/*         <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 scale-90 max-w-4xl mx-auto"> */}
          <section
            id="how-it-works"
            className="py-20 px-4 sm:px-6 lg:px-8 flex justify-center"
            style={{
              height: 'auto',
              ...(window.innerWidth >= 1024 && {
                transform: 'scale(0.85)',
                transformOrigin: 'top center',
              }),
            }}
          >
{/*             <div className="w-full sm:w-[90%] lg:w-[75%] xl:w-[70%] max-w-screen-lg transition-all duration-300"> */}
          <div
            className={`w-full sm:w-[90%] lg:w-[75%] xl:w-[70%] max-w-screen-lg transition-all ${
              window.innerWidth < 768 ? 'duration-[3500ms]' : 'duration-300'
            }`}
          >
          
                  
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              From Idea to Website in
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 3 Simple Steps</span>
            </h2>
          </div>

          {/* Image Carousel - Separated Image and Text */}
          <div className="relative">
            {/* Image Section */}
            <div className="overflow-hidden rounded-2xl mb-8">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentHowItWorksSlide * 100}%)` }}
              >
                {howItWorksSlides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
{/*                     <div className="relative h-96 rounded-2xl overflow-hidden"> */}
                        <div className="relative w-full rounded-2xl overflow-hidden">

                      {/* Icon positioned at top-left */}
                      <div className="absolute top-6 left-6 z-10">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                          {slide.icon}
                        </div>
                      </div>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Section Below Image */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                {howItWorksSlides[currentHowItWorksSlide].title}
              </h3>
              <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                {howItWorksSlides[currentHowItWorksSlide].description}
              </p>
            </div>
            {/* Navigation Arrows */}
            <button
              onClick={prevHowItWorksSlide}
              className="absolute left-4 top-48 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextHowItWorksSlide}
              className="absolute right-4 top-48 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {howItWorksSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHowItWorksSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentHowItWorksSlide 
                      ? 'bg-purple-500 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Code Generator Demo */}
      {showAIBuilder && <CodeGenerator onClose={() => setShowAIBuilder(false)} />}

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Perfect Plan</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Start free, scale as you grow. All plans include our core AI website building features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-pink-400/30 group ${
                  plan.isPopular 
                    ? 'border-purple-400 ring-2 ring-purple-400/50 scale-105' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Image Box at Bottom Right */}
                  
{/*                 <div className="absolute bottom-3 right-3 w-10 h-10">
                  <img
                    src={`https://via.placeholder.com/40?text=${plan.name.charAt(0)}`} // replace with your own URLs
                    alt={`${plan.name} icon`}
                    className="rounded-md"
                  />
                </div> */}
                
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/70 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => {
                  setShowAIBuilder(true);
                  setTimeout(() => {
                    document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Loved by
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Thousands</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See what our customers are saying about their KarRish experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-white/60">{testimonial.role}, {testimonial.company}</div>
              </div>
            </div>

            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who've transformed their online presence with KarRish. 
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => {
                setShowAIBuilder(true);
                setTimeout(() => {
                  document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Start Building Now
            </button>
            <button 
              className="text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Examples
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">KarRish</span>
              </div>
              <p className="text-white/70 mb-4">
                Empowering developers and creators with cutting-edge tools to build exceptional web experiences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product Summary</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Back on Top</a></li>
                <li><a href="https://github.com/google/generative-ai-docs" className="hover:text-white transition-colors">Generative AI</a></li>
                <li><a href="https://nodejs.org/en" className="hover:text-white transition-colors">Node JS</a></li>
                <li><a href="https://www.postman.com/api-platform/api-documentation/" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">My Coding Journey</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="https://codeforces.com/profile/tenperformer" className="hover:text-white transition-colors">Codeforces</a></li>
                <li><a href="https://www.codechef.com/users/rishabh_55" className="hover:text-white transition-colors">Codechef</a></li>
                <li><a href="https://leetcode.com/u/Tenperformer7/" className="hover:text-white transition-colors">Leetcode</a></li>
                <li><a href="https://www.geeksforgeeks.org/user/rishabhs82nm/" className="hover:text-white transition-colors">GeeksForGeeks</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">About the Creator</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="https://www.linkedin.com/in/rishabh-shenoy-3b3566286/" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="https://github.com/CodingEnthusiastic" className="hover:text-white transition-colors">Github</a></li>
                <li><a href="https://www.chess.com/member/tenperformer" className="hover:text-white transition-colors">Chess.com</a></li>
                <li><a href="https://www.crosswalk.com/devotionals/" className="hover:text-white transition-colors">Devotion</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/70">
              © 2025 KarRish. All rights reserved. Built with ❤️ by Rishabh Shenoy for the future of GenAI and web development.
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed ChatBot Button */}
      <a 
        href="https://chatbotindia.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 z-50 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="font-semibold">ChatBot India</span>
      </a>
    </div>
  );
}

export default App;
