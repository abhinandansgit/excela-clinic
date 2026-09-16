import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import AdminPanelModal from "./AdminPanelModal";
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  UserCheck,
  AlertCircle,
  Sparkles
} from "lucide-react";

export default function ManagePage({
  doctors = [],
  tests = [],
  bookings = [],
  clinicConfig = {},
  onUpdateDoctors,
  onUpdateTests,
  onUpdateBookings,
  onResetData,
  onNavigateHome
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("excela_staff_auth") === "true";
  });

  const [email, setEmail] = useState("admin@excelaclinic.com");
  const [password, setPassword] = useState("excela123");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);

    setTimeout(() => {
      // Allow default credentials admin@excelaclinic.com / excela123 or any valid filled credentials
      if (email.trim() && password.trim()) {
        if (password.length < 4) {
          setAuthError("Password must be at least 4 characters.");
          setIsSubmitting(false);
          return;
        }

        sessionStorage.setItem("excela_staff_auth", "true");
        sessionStorage.setItem("excela_staff_email", email.trim());
        setIsAuthenticated(true);
      } else {
        setAuthError("Please provide both email address and password.");
      }
      setIsSubmitting(false);
    }, 400);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("excela_staff_auth");
    sessionStorage.removeItem("excela_staff_email");
    setIsAuthenticated(false);
  };

  // If not authenticated, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#112015] text-[#E7EFE9] flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden font-sans">
        {/* Background Architectural Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#C9A84C]/15 via-[#C9A84C]/5 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-[#86A789]/10 blur-3xl pointer-events-none rounded-full" />

        {/* Top Header Navigation back to site */}
        <div className="w-full max-w-5xl flex items-center justify-between py-4 relative z-10">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#E7CF86] text-xs font-medium border border-[#C9A84C]/30 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Clinic Site</span>
          </button>
          
          <div className="text-xs text-[#9BB5A2] font-light">
            Excela Portal Security System v2.4
          </div>
        </div>

        {/* Main Login Card */}
        <div className="w-full max-w-md my-auto relative z-10">
          <div className="bg-[#182C20]/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-[#C9A84C]/40 shadow-2xl shadow-black/40">
            {/* Header Brand */}
            <div className="flex flex-col items-center text-center mb-8">
              <Logo light size="lg" layout="stacked" className="mb-4" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/40 text-[#E7CF86] text-[10px] uppercase font-bold tracking-widest mt-1">
                <Lock className="w-3 h-3 text-[#C9A84C]" />
                <span>Staff &amp; Doctor Management</span>
              </div>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#D0E2D4] mb-2 uppercase tracking-wider">
                  Staff Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#C9A84C] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@excelaclinic.com"
                    className="w-full bg-[#101D14] text-white text-sm rounded-xl pl-11 pr-4 py-3.5 border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D0E2D4] mb-2 uppercase tracking-wider">
                  Access Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-[#C9A84C] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#101D14] text-white text-sm rounded-xl pl-11 pr-4 py-3.5 border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] transition-all"
                  />
                </div>
              </div>

              {/* Demo Credentials Helper Box */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#A6C4AE] leading-relaxed">
                <div className="font-bold text-[#E7CF86] mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span>Authorized Staff Portal Access</span>
                </div>
                <div>Demo Credentials: <code className="text-white font-mono bg-black/40 px-1 py-0.5 rounded">admin@excelaclinic.com</code> / <code className="text-white font-mono bg-black/40 px-1 py-0.5 rounded">excela123</code></div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#E3C472] to-[#C9A84C] text-[#132218] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl shadow-[#C9A84C]/15 transition-all cursor-pointer flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 text-[#132218]" />
                    <span>Sign In To Management Portal</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="w-full text-center py-4 text-xs text-[#6B8A74] relative z-10">
          © {new Date().getFullYear()} Excela Clinic. Authorized Personnel Only. AIIMS Road, Patrapada, Bhubaneswar.
        </div>
      </div>
    );
  }

  // If Authenticated, show full management portal
  const userEmail = sessionStorage.getItem("excela_staff_email") || "admin@excelaclinic.com";

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-[#192A1F]">
      {/* Top Header Bar for Staff Management */}
      <header className="bg-[#122217] text-white border-b border-[#C9A84C]/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#E7CF86] text-xs font-medium transition-colors cursor-pointer"
              title="View Public Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>
            
            <div className="h-5 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-2">
              <Logo light size="sm" layout="horizontal" />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#D1E0D5]">
              <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              <span>Authenticated: <strong className="text-white font-mono">{userEmail}</strong></span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-200 text-xs font-semibold border border-red-500/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Panel View */}
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <AdminPanelModal
          isOpen={true}
          onClose={onNavigateHome}
          doctors={doctors}
          tests={tests}
          bookings={bookings}
          clinicConfig={clinicConfig}
          onUpdateDoctors={onUpdateDoctors}
          onUpdateTests={onUpdateTests}
          onUpdateBookings={onUpdateBookings}
          onResetData={onResetData}
          isStandalonePage={true}
        />
      </div>
    </div>
  );
}
