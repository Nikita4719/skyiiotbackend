import { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import BASE_URL from "../../configs/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/api/auth/forgot-password`,
        { email }
      );

      alert(res.data.message);

    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 space-y-4">

        <Typography variant="h4">Forgot Password</Typography>

        <Input
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

      </form>
    </div>
  );
}