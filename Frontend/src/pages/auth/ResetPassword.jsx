import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import BASE_URL from "../../configs/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/api/auth/reset-password`, {
        token,
        password,
      });

      alert("Password reset successful");
      navigate("/auth/sign-in");

    } catch {
      alert("Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 space-y-4">

        <Typography variant="h4">Reset Password</Typography>

        <Input
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>

      </form>
    </div>
  );
}