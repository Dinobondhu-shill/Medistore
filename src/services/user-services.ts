import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userServices = {
    getSession: async () => {
      try {
          const cookieStore = await cookies();

        const res = await fetch(`${AUTH_URL}/get-session`, {
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