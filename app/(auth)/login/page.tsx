"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function DashboardMockup() {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-lg">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-200">
        {["Dashboard", "Blocks", "Mail", "Component"].map((tab, i) => (
          <div
            key={tab}
            className={`flex-1 py-2 text-center text-xs font-medium ${
              i === 0
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-8 bg-gray-50 rounded-md border border-gray-200" />
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 bg-gray-100 rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-5 gap-2">
          {[
            { color: "bg-blue-100", value: "$13.4k", label: "Total Sales" },
            { color: "bg-cyan-100", value: "155K", label: "Visitors" },
            { color: "bg-yellow-100", value: "$98.3k", label: "Revenue" },
            { color: "bg-pink-100", value: "$1,200", label: "Bonus" },
            { color: "bg-amber-100", value: "42.4k", label: "Customers" },
          ].map((card, i) => (
            <div key={i} className={`${card.color} rounded-lg p-2`}>
              <div className="text-[10px] font-bold text-gray-800">
                {card.value}
              </div>
              <div className="text-[8px] text-gray-500">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1 bg-gray-50 rounded-lg p-2 h-24">
            <div className="text-[8px] font-medium text-gray-600 mb-1">
              Total Income
            </div>
            <div className="h-12 flex items-end gap-0.5">
              {[40, 60, 30, 80, 50, 70, 45].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-blue-200 rounded-t-sm"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="col-span-1 bg-gray-50 rounded-lg p-2 h-24">
            <div className="text-[8px] font-medium text-gray-600 mb-1">
              Report
            </div>
            <div className="space-y-1">
              {["Income", "Expense", "Profit"].map((label, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-sm ${
                      i === 0
                        ? "bg-blue-400"
                        : i === 1
                          ? "bg-amber-400"
                          : "bg-pink-400"
                    }`}
                  />
                  <span className="text-[7px] text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 bg-gray-50 rounded-lg p-2 h-24">
            <div className="text-[8px] font-medium text-gray-600 mb-1">
              Campaign Stats
            </div>
            <div className="space-y-1">
              {["Emails", "Opened", "Clicked"].map((label, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[7px] text-gray-500">{label}</span>
                  <span className="text-[7px] font-medium text-gray-700">
                    {["6.9%", "3%", "1.2%"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-[8px] font-medium text-gray-600">
              Total Earning
            </div>
            <div className="text-sm font-bold text-gray-900">87%</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-[8px] font-medium text-gray-600">
              For Business Sharks
            </div>
            <div className="text-[7px] text-gray-500 mt-1">
              Choose a plan to get started
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-[8px] font-medium text-gray-600">
              Vehicle Condition
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-[7px] text-gray-600">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Dark with Dashboard Preview */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 flex-col justify-between p-10">
        <div className="text-white">
          <h1 className="font-hedvig text-3xl font-bold leading-tight">
            Welcome back! Please sign in to your Taloo account
          </h1>
          <p className="mt-4 text-gray-400 text-sm">
            Thank you for registering! Please check your inbox and click the
            verification link to activate your account.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="flex-1 flex items-center justify-center py-10">
          <DashboardMockup />
        </div>

        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/taloo-icon-big.svg"
            alt="Taloo"
            width={40}
            height={40}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-hedvig text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Lets get started with your 30 days free trial
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-11 text-gray-700 font-medium"
              type="button"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
              Login with Google
            </Button>

            <Button
              variant="outline"
              className="w-full h-11 text-gray-700 font-medium"
              type="button"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Login with Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Or</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="h-11"
              />
            </div>

            <div className="space-y-2 relative">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••"
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-600 font-normal cursor-pointer"
                >
                  Remember Me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In to Taloo"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="font-semibold text-gray-900 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
