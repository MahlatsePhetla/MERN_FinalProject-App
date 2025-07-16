
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleBookClick = () => {
    if (token) {
      navigate('/book');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6 text-center">
      <h2 className="text-4xl font-bold text-blue-800 mb-4">
        Book Your Doctor Visit Anytime, Anywhere
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Your health, just a click away.
      </p>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={handleBookClick}
          className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900"
        >
          Book Appointment
        </button>
        <button
          onClick={() => navigate('/register')}
          className="border border-blue-800 text-blue-800 px-6 py-2 rounded hover:bg-blue-50"
        >
          Register Now
        </button>
      </div>

      <div className="flex justify-center">
        <img
          src="/public/Medicine-cuate.svg"
          alt="Doctor illustration"
          className="w-[350px] max-w-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
