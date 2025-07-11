import React, { useState, useEffect } from "react";
import { Mail, Shield, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// import { useAuth } from "./AuthContext";


export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState("email"); // 'email' or 'otp'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [resendCount, setResendCount] = useState(0);

  const navigate=useNavigate();

  const { setIsAuthenticated } = useAuth();


  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Generate random OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleEmailSubmit = async () => {
    if (!email.endsWith("@rgukt.ac.in")) {
      setError("Only RGUKT emails are allowed");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setCurrentStep("otp");
      setOtpTimer(60);
      alert("OTP sent to your email");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

 

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      setError("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "OTP verification failed");

      alert("✅ Login successful!");
      // setIsAuthenticated(true);
      navigate("/userform");
      setCurrentStep("email");
      setEmail("");
      setOtp("");

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // Resend OTP
  const resendOtp = async () => {
    if (otpTimer > 0) return;

    setLoading(true);
    setResendCount((prev) => prev + 1);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);
    setOtpTimer(60);
    setLoading(false);
    setError("");

    console.log("Resent OTP:", newOtp);
    alert(`New OTP sent to ${email}\nFor demo: ${newOtp}`);
  };

  // Google OAuth integration
  const handleGoogleSignIn = () => {
    setLoading(true);

    // Create Google OAuth URL
    const googleOAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${encodeURIComponent(
      window.location.origin + "/auth/google/callback"
    )}&response_type=code&scope=email profile&access_type=offline`;

    // In a real app, you would redirect to Google
    // window.location.href = googleOAuthUrl;

    // For demo purposes, simulate the Google sign-in process
    setTimeout(() => {
      setLoading(false);
      const userConfirmed = confirm(
        "This would redirect you to Google sign-in. Simulate successful login?"
      );
      if (userConfirmed) {
        alert("✅ Google sign-in successful! Welcome back.");
        // Reset form
        setCurrentStep("email");
        setEmail("");
        setOtp("");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome
          </h1>
          <p className="text-slate-600">
            {currentStep === "email"
              ? "Enter your email to receive a verification code"
              : "Enter the verification code sent to your email"}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          {currentStep === "email" ? (
            // Email Step
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleEmailSubmit}
                disabled={loading || !email}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending verification code...
                  </div>
                ) : (
                  "Send Verification Code"
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center shadow-sm"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {loading ? "Redirecting to Google..." : "Continue with Google"}
              </button>
            </div>
          ) : (
            // OTP Step
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-slate-600">
                  We've sent a 6-digit verification code to
                  <br />
                  <span className="font-semibold text-slate-900">{email}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-center text-lg font-mono tracking-widest bg-white/50"
                  maxLength="6"
                  required
                />
              </div>

              {error && (
                <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleOtpSubmit}
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify Code"
                )}
              </button>

              <div className="text-center space-y-3">
                <div className="flex items-center justify-center text-sm text-slate-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {otpTimer > 0 ? (
                    <span>Resend code in {otpTimer}s</span>
                  ) : (
                    <span>Code expired</span>
                  )}
                </div>

                <p className="text-sm text-slate-600">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={loading || otpTimer > 0}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Resend Code
                  </button>
                  {resendCount > 0 && (
                    <span className="text-xs text-slate-500">
                      {" "}
                      ({resendCount} sent)
                    </span>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep("email");
                  setError("");
                  setOtp("");
                  setOtpTimer(0);
                }}
                className="w-full text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200 py-2"
              >
                ← Change email address
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>
            Don't have an account?{" "}
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
