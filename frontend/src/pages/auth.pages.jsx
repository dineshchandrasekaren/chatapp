import { useState } from "react";
import Logo from "../components/logo.component";
import { Mail, User, Lock, EyeOff, Eye } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { pathname } = useLocation();

  const isLogin = pathname === "/login";

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = () => {
    // toast.success("fdfaf");
  };
  return (
    <>
      <div className="grid lg:grid-cols-2 ">
        <div className="w-96 m-auto  py-20 flex flex-col gap-4 items-center justify-center group">
          <Logo size={30} />
          <h2 className="text-2xl font-extrabold mt-4">
            {!isLogin ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="font-medium mb-4 text-base-content/60">
            {!isLogin
              ? "Get started with your free account"
              : "Sign in to your account"}
          </p>

          <fieldset className="fieldset w-full gap-4 ">
            {!isLogin && (
              <div>
                <legend className="fieldset-legend mb-0.5 ml-1">
                  Full Name
                </legend>
                <label className="w-full input input-md ">
                  <User className="text-primary/60" />
                  <input
                    type="text"
                    className="text-base-content  font-bold pl-1"
                    placeholder="John Doe"
                  />
                </label>
              </div>
            )}
            <div>
              <legend className="fieldset-legend mb-0.5 ml-1">Email</legend>
              <label className="w-full input input-md">
                <Mail className="text-primary/60" />
                <input
                  type="email"
                  className="text-base-content  font-bold pl-1"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <div>
              <legend className="fieldset-legend mb-0.5 ml-1">Password</legend>
              <label className="w-full input input-md">
                <Lock className="text-primary/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="text-base-content  font-bold pl-1"
                  placeholder=". . . . . . . ."
                  style={{ lineHeight: "1.2", letterSpacing: "3px" }}
                />
                {showPassword ? (
                  <EyeOff
                    onClick={handleShowPassword}
                    className="cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={handleShowPassword}
                    className="cursor-pointer"
                  />
                )}
              </label>
            </div>
            <button
              className="btn btn-primary mt-2 w-full"
              onClick={handleSubmit}
            >
              {!isLogin ? "Create Account" : "Sign in"}
            </button>
          </fieldset>
          <p className="font-medium mt-6 opacity-70">
            {!isLogin ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              to={!isLogin ? "/login" : "/signup"}
              className="font-bold text-primary opacity-100 underline"
            >
              {!isLogin ? "Sign In" : "Create Account"}
            </Link>
          </p>
        </div>

        <div className="bg-base-200 text-center  py-20 flex flex-col justify-center items-center gap-4">
          <div className="grid grid-cols-3 gap-2 w-max ">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`${
                  i % 2 == 0 ? "animate-pulse" : ""
                }  rounded-md h-32 w-32 bg-primary/10`}
              ></div>
            ))}
          </div>
          <h2 className="text-2xl font-extrabold mt-6">
            {!isLogin ? "Join our community" : "Welcome back!"}
          </h2>
          <p className="font-medium mb-4 text-base-content/60  w-9/12">
            {!isLogin
              ? "Connect with friends, share moments, and stay in touch with your loved onces."
              : "Sign in to continue your conversations and catch up with your messages."}
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
