import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import BASE_URL from "../../configs/api";

export function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      return alert(
        "Password must be 8+ chars, include uppercase, number & special char"
      );
    }

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data?.data?.token || res.data?.token;

      if (formData.remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      navigate("/dashboard/home");

    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-8 flex gap-4">

      
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-2">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">

            
            <Typography variant="small" className="-mb-3 font-medium">
              Your Email
            </Typography>
            <Input
              size="lg"
              name="email"
              placeholder="name@mail.com"
              onChange={handleChange}
              required
            />

           
            <Typography variant="small" className="-mb-3 font-medium">
              Password
            </Typography>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                size="lg"
                name="password"
                placeholder="********"
                onChange={handleChange}
                required
              />

              
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-600" />
                )}
              </span>
            </div>
          </div>

         
          <Checkbox
            name="remember"
            onChange={handleChange}
            label={
              <Typography variant="small" color="gray" className="font-medium">
                Remember Me
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          
          <Typography className="text-sm text-right mt-2">
            <Link to="/auth/forgot-password">Forgot Password?</Link>
          </Typography>

          <Button type="submit" className="mt-6" fullWidth disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

        </form>
      </div>

      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt=""
        />
      </div>

    </section>
  );
}

export default SignIn;