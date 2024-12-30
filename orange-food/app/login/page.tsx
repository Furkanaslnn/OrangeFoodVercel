"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  return (
    <div
      style={{
        backgroundImage: "url('background.png')",
        backgroundSize: "cover",
      }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary"
    >
      {/* Login Card */}
      <div className="bg-card text-card-foreground shadow-lg rounded-lg p-8 sm:w-[400px] w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          Giriş Yap
        </h1>
        <form className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email adresinizi giriniz"
              className="pl-10"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Şifrenizi giriniz"
              className="pl-10"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Giriş Yap
          </Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-muted-foreground text-center mt-4">
          Hesabınız yok mu?{" "}
          <a href="/register" className="text-primary underline">
            Kayıt Ol
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
