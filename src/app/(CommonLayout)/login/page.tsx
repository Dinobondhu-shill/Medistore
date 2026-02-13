import Image from "next/image";
import photo from "./loginimg.png";
import { Heart } from "lucide-react";
import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/5 flex items-center justify-center px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image Section */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-full aspect-square max-w-md">
              {/* Animated background circle */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl animate-pulse"></div>

              {/* Image container */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={photo}
                  alt="Medical Professional"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 right-4 z-20 animate-bounce">
                <div className="w-12 h-12 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center border border-accent/40">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
              </div>

              <div className="absolute bottom-8 left-4 z-20 animate-pulse">
                <div className="px-4 py-2 rounded-lg bg-background/80 backdrop-blur-md border border-border shadow-lg">
                  <p className="text-sm font-semibold text-foreground">
                    24/7 Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form Section */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
