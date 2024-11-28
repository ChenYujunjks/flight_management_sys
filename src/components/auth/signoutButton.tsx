"use client";

import { Button } from "@/components/ui/button";
import { signout } from "@/server/auth/actions/signout";

export function SignoutButton() {
  const handleSignout = async () => {
    try {
      await signout();
      // 在此处处理登出后的逻辑，例如页面刷新或重定向
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <Button
      variant="destructive"
      className="rounded-full"
      onClick={handleSignout}
    >
      Sign out
    </Button>
  );
}
