import { Outlet } from "react-router-dom";
import backgroundImage from "../../assets/bg-login.jpg";

const LayoutAuth = () => {
  return (
    <div className="flex h-screen">
      {/* Background image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center p-12 relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="max-w-md text-white text-center grid gap-8 relative z-10">
          <h1 className="text-5xl font-bold mb-4">CineVista Theater</h1>
          <p className="text-xl">
            Movies are the only escape that transports you to worlds beyond your
            imagination.
          </p>
        </div>
      </div>

      {/* Right half - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;
