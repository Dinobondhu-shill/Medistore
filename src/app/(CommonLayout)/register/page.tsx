import RegisterForm from "@/components/auth/registerFrom";


export default function SignupPage() {
 

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative w-full">
        <div className="flex justify-center items-center max-w-4xl mx-auto bg-card/90 backdrop-blur-xl rounded-3xl shadow-lg p-8 lg:p-12 gap-8 lg:gap-12">
          {/* Right Side - Signup Form Section */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
