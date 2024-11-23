import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import './HomePage.css';

const HomePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const stars: { x: number; y: number; radius: number; dx: number; dy: number }[] = [];

        const createStars = (numStars: number) => {
          for (let i = 0; i < numStars; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 1.5;
            const dx = (Math.random() - 0.5) * 0.5;
            const dy = (Math.random() - 0.5) * 0.5;
            stars.push({ x, y, radius, dx, dy });
          }
        };

        const drawStars = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          stars.forEach((star) => {
            context.beginPath();
            context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
            context.fillStyle = "white";
            context.fill();
            context.closePath();
          });
        };

        const updateStars = () => {
          stars.forEach((star) => {
            star.x += star.dx;
            star.y += star.dy;

            if (star.x < 0 || star.x > canvas.width) star.dx = -star.dx;
            if (star.y < 0 || star.y > canvas.height) star.dy = -star.dy;
          });
        };

        const animate = () => {
          drawStars();
          updateStars();
          requestAnimationFrame(animate);
        };

        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          stars.length = 0;
          createStars(200);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
          window.removeEventListener('resize', resizeCanvas);
        };
      }
    }
  }, []);

  return (
    <>
     <div
        className="fixed h-screen w-screen"
        // style={{ background: 'black',  opacity: 0.3 }}
        data-sentry-component="Stars"
        data-sentry-source-file="index.tsx"
      >
        <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true"></canvas>
      </div>
    <div className="home-page min-h-screen p-8 w-full bg-[#05020e] text-white"  style={{ background: 'black', zIndex: 1, opacity: 0.8 }}>
      {/* Hero Section */}
     
      <section className="hero p-8 rounded-lg mb-12 w-full bg-[#05020e] text-white">
        <div className="hero-content text-center text-white">
          <h1 className="mb-8 bg-[linear-gradient(107.41deg,#FFFFFF_65%,rgba(255,255,255,0.43)_100%)] bg-clip-text text-center font-semibold tracking-[1%] text-transparent laptop:text-left xl:!text-6xl/[72px] text-4xl md:text-5xl text-white">
            Boost Your Sales Calls with Free AI-Powered Analysis & Practice
          </h1>
          <p className="subheadline text-lg mb-6 font-bold text-base md:text-lg text-white">
            Get started for FREE—just enter your Assembly and OpenAI API keys,
            and start improving your cold calls with tailored feedback and
            practice!
          </p>
          <div className="cta-buttons flex justify-center space-x-4">
            <Link
              to="/register"
              className="btn btn-secondary text-white py-2 px-4 rounded-lg shadow-md text-sm md:text-base text-white"
            >
              Start for Free
            </Link>
            
          </div>
        </div>
        <div className="hero-visual mt-8">
          {/* Add hero animation/image here */}
        </div>
      </section>

      {/* Features Section */}
      <section className="features glassmorphism p-8 rounded-lg shadow-lg mb-12 w-full bg-[#05020e] text-white">
        <h2 className="text-3xl font-semibold text-white text-center mb-8 text-2xl md:text-3xl text-white">
          Powerful AI Features to Improve Your Sales Calls—For Free!
        </h2>
        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 transition-all duration-300 flex h-full w-full shrink-0 flex-col items-start gap-6 self-stretch rounded-xl border-none bg-neutral-0 px-4 py-6 shadow-none ring-1 ring-inset ring-neutral-40 bg-neutral-800 shadow-none ring-neutral-600  desktop:w-[324px] text-white">
            <i className="feature-icon analysis-icon text-green-600 text-3xl mb-4 text-white"></i>
            <h3 className="text-xl font-semibold mb-2 text-lg md:text-xl text-white">
              Free Call Analysis
            </h3>
            <p className="text-sm md:text-base text-white">
              Upload your call recordings and get instant feedback on tone,
              pace, and engagement—completely free.
            </p>
          </div>
          <div className="p-6 transition-all duration-300 flex h-full w-full shrink-0 flex-col items-start gap-6 self-stretch rounded-xl border-none bg-neutral-0 px-4 py-6 shadow-none ring-1 ring-inset ring-neutral-40 bg-neutral-800 shadow-none ring-neutral-600  desktop:w-[324px] text-white">
            <i className="feature-icon practice-icon text-green-600 text-3xl mb-4 text-white"></i>
            <h3 className="text-xl font-semibold mb-2 text-lg md:text-xl text-white">
              Cold Call Practice with AI Personas
            </h3>
            <p className="text-sm md:text-base text-white">
              Select your ideal prospect persona and practice cold calling.
              Start speaking right away with AI-generated responses.
            </p>
          </div>
          <div className="p-6 transition-all duration-300 flex h-full w-full shrink-0 flex-col items-start gap-6 self-stretch rounded-xl border-none bg-neutral-0 px-4 py-6 shadow-none ring-1 ring-inset ring-neutral-40 bg-neutral-800 shadow-none ring-neutral-600  desktop:w-[324px] text-white">
            <i className="feature-icon feedback-icon text-green-600 text-3xl mb-4 text-white"></i>
            <h3 className="text-xl font-semibold mb-2 text-lg md:text-xl text-white">
              Real-Time Feedback & Progress Tracking
            </h3>
            <p className="text-sm md:text-base text-white">
              Receive actionable insights after each call and track your
              improvement over time—all without spending a dime.
            </p>
          </div>
          <div className="p-6 transition-all duration-300 flex h-full w-full shrink-0 flex-col items-start gap-6 self-stretch rounded-xl border-none bg-neutral-0 px-4 py-6 shadow-none ring-1 ring-inset ring-neutral-40 bg-neutral-800 shadow-none ring-neutral-600  desktop:w-[324px] text-white">
            <i className="feature-icon integration-icon text-green-600 text-3xl mb-4 text-white"></i>
            <h3 className="text-xl font-semibold mb-2 text-lg md:text-xl text-white">
              Easy Integration with API Keys
            </h3>
            <p className="text-sm md:text-base text-white">
              Simply enter your Assembly and OpenAI API keys to get started
              instantly with no setup cost.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works glassmorphism p-8 rounded-lg shadow-lg mb-12 w-full bg-[#05020e] text-white">
        <h2 className="text-3xl font-semibold text-white text-center mb-8 text-2xl md:text-3xl text-white">
          Getting Started Is Simple—And FREE
        </h2>
        <div className="steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          {[
            {
              number: 1,
              title: "Get Your API Keys",
              description:
                "Sign up for Assembly and OpenAI (or use your existing accounts) and grab your API keys.",
            },
            {
              number: 2,
              title: "Enter API Keys",
              description:
                "Simply paste your API keys into the app—no complicated setup required.",
            },
            {
              number: 3,
              title: "Upload Your Call Recording",
              description:
                "Upload your call recording and let our AI instantly analyze it.",
            },
            {
              number: 4,
              title: "Practice Cold Calls",
              description:
                "Choose a prospect persona, start your practice, and get real-time AI feedback.",
            },
            {
              number: 5,
              title: "Track Your Progress",
              description:
                "See your performance improve with detailed reports and suggestions for every call.",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="p-6 transition-all duration-300 flex h-full w-full shrink-0 flex-col items-start gap-6 self-stretch rounded-xl border-none bg-neutral-0 px-4 py-6 shadow-none ring-1 ring-inset ring-neutral-40 bg-neutral-800 shadow-none ring-neutral-600  desktop:w-[324px] text-white"
            >
              {/* <div className="step-number text-green-600 text-2xl font-bold mb-2 text-white">
                {step.number}
              </div> */}
              <h3 className="text-xl font-semibold mb-2 text-lg md:text-xl text-white">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-white">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq glassmorphism p-8 rounded-lg shadow-lg mb-12 w-full bg-[#05020e] text-white">
        <h2 className="text-3xl font-semibold text-white text-center mb-8 text-2xl md:text-3xl text-white">
          Frequently Asked Questions
        </h2>
        <div className="faq-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          {[
            {
              question: "How do I get my Assembly and OpenAI API keys?",
              answer:
                "You can obtain your API keys by signing up at Assembly AI and OpenAI websites. We provide detailed instructions in our setup guide.",
            },
            {
              question:
                "Is there a limit to how many calls I can upload or practice with?",
              answer:
                "No, you can analyze and practice as many calls as you want. You only pay for what you use through your API keys.",
            },
            {
              question: "Can I use the platform for free forever?",
              answer:
                "Yes! Our platform is completely free to use. You only need to cover the cost of your API usage through Assembly AI and OpenAI.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="p-6 transition-all duration-300 flex h-full w-full shrink-0 flex-col items-start gap-6 self-stretch rounded-xl border-none bg-neutral-0 px-4 py-6 shadow-none ring-1 ring-inset ring-neutral-40 bg-neutral-800 shadow-none ring-neutral-600  desktop:w-[324px] text-white"
            >
              <h3 className="text-xl font-semibold mb-2 text-lg md:text-xl text-white">
                {faq.question}
              </h3>
              <p className="text-sm md:text-base text-white">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>

  );
};

export default HomePage;
