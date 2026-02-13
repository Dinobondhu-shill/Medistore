import { cookies } from "next/headers";

export const userServices = {
    getSession: async () => {
      try {
          const cookieStore = await cookies();

        const res = await fetch("http://localhost:5000/api/auth/get-session", {
            headers: cookieStore ? { cookie: cookieStore.toString() } : undefined,
            cache: "no-store",
        });
        const sessionData = await res.json();
        if(!sessionData || !sessionData.user) {
            return null;
        }

        return sessionData;
      } catch (error) {
        console.error("Error fetching session data:", error);
        return null;
      }
    }
}