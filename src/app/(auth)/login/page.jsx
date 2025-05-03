"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/state/stores/authStore";

// Define validation schema
const formSchema = z.object({
  username: z.string("Please enter a valid username address"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters")
    .max(32, "Password must not exceed 32 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const {
    login,
    isAuthenticated,
    isLoading: authLoading,
    error,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await login(data.username, data.password);
      // toast.success("Login successful!");
      // router.push("/"); // Redirect to dashboard after successful login
    } catch (error) {
      toast.error(error?.message || "Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    // If user is already authenticated, redirect them
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your username and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">username</Label>
              <Input
                id="username"
                type="username"
                placeholder=""
                {...register("username")}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
                placeholder="********"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={authLoading}
            >
              {authLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Link
            href="/reset-password"
            className="text-sm text-muted-foreground hover:underline"
          >
            Forgot password?
          </Link>
          <Link
            href="/register"
            className="text-sm text-muted-foreground hover:underline"
          >
            Don't have an account? Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
