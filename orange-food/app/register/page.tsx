"use client";

import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";

const Register = () => {
  return (
    <div
      style={{
        backgroundImage: "url('background.png')",
        backgroundSize: "cover",
      }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary"
    >
      {/* Register Card */}
      <div className="bg-card text-card-foreground shadow-lg rounded-lg p-8 sm:w-[400px] w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          Kayıt Ol
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
            Kayıt Ol
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-muted" />
          <span className="px-2 text-muted-foreground text-sm">veya</span>
          <hr className="flex-grow border-muted" />
        </div>

        {/* Google ile Kayıt Ol */}
        <Button
          className="w-full bg-muted text-muted-foreground hover:bg-muted/90 flex items-center justify-center space-x-2"
          onClick={() => alert("Google ile kayıt olma işlemi")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
            className="h-5 w-5"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.5 1.4 8.8 3.6l6.6-6.6C35.4 2.5 30 0 24 0 14.8 0 7.1 5.5 3.8 13.3l7.8 6c1.7-5.4 6.7-9.3 12.4-9.3z"
            />
            <path
              fill="#4285F4"
              d="M47.5 24.5c0-1.4-.1-2.7-.4-4H24v8.3h13.3c-.6 3-2.5 5.5-5.3 7.3l7.8 6C44.8 37.6 47.5 31.5 47.5 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M13.4 29.2c-1.3-2-2-4.4-2-6.9 0-2.4.7-4.7 2-6.7l-7.8-6c-2.5 4.1-4 8.8-4 14.3s1.5 10.2 4 14.3l7.8-6c-1.1-1.9-1.8-4.2-1.8-6.7z"
            />
            <path
              fill="#34A853"
              d="M24 48c6 0 11.1-2 14.8-5.4l-7.8-6c-2.2 1.5-5 2.3-7.8 2.3-5.7 0-10.7-3.9-12.4-9.3l-7.8 6C7.1 42.5 14.8 48 24 48z"
            />
          </svg>
          <span>Google</span>
        </Button>

        {/* Footer */}
        <p className="text-sm text-muted-foreground text-center mt-4">
          Zaten hesabınız var mı?{" "}
          <a href="/login" className="text-primary underline">
            Giriş Yap
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
