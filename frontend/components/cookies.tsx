"use client";

import React from "react";
import Cookies from "js-cookie";

import { Button, Link } from "@/components/nextui-use-client";

const cookieAttributes = (attrs: Partial<Cookies.CookieAttributes>): Cookies.CookieAttributes => ({
  expires: 7,
  sameSite: "strict",
  secure: true,
  path: "/",
  ...attrs,
});

const COOKIE_CONSENT = "cookieConsent";

interface CookiesComponentProps {
  isSignedIn: boolean;
  userId: string | null | undefined;
}
export default function CookiesComponent({ isSignedIn, userId }: Readonly<CookiesComponentProps>) {
  const cookieConsent = Cookies.get(COOKIE_CONSENT);
  const [showConsent, setShowConsent] = React.useState(false);

  function handleAccept() {
    Cookies.set(COOKIE_CONSENT, "accepted", cookieAttributes({ expires: 365 }));

    if (isSignedIn && userId) {
      Cookies.set("userId", userId, cookieAttributes({ expires: 7 }));
    }

    setShowConsent(false);
  }

  function handleReject() {
    Cookies.set(COOKIE_CONSENT, "rejected", cookieAttributes({ expires: 1 }));
    setShowConsent(false);
  }

  React.useEffect(() => {
    if (cookieConsent === "rejected" || cookieConsent === "accepted") {
      return;
    }

    setShowConsent(true);
  }, [cookieConsent]);

  React.useEffect(() => {
    if (isSignedIn && cookieConsent === "accepted" && userId) {
      const userIdCookie = Cookies.get("userId");

      if (!userIdCookie || userIdCookie.split(".")[0] !== userId) {
        callApiToSetUserId(userId);
      }
    }
  }, [isSignedIn, cookieConsent, userId]);

  async function callApiToSetUserId(userId: string) {
    try {
      await fetch("/api/cookies/user-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.error("Error setting userId cookie:", error); // eslint-disable-line no-console
    }
  }

  if (!showConsent) return null;

  return (
    <div aria-live="polite" className="fixed inset-x-0 bottom-0 px-[21px] pb-[26px] z-20" role="alert">
      <div className="flex w-full items-center justify-between gap-x-20 rounded-large border border-divider bg-background/15 px-6 py-4 shadow-small backdrop-blur">
        <p className="text-small font-normal text-default-700">
          We use cookies to provide the best experience. By continuing to use our site, you agree to our&nbsp;
          <Link className="font-normal" href="/tos/cookies" size="sm" underline="hover">
            Cookie Policy.
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <Button
            className="px-4 font-medium"
            radius="lg"
            style={{
              border: "solid 2px transparent",
              backgroundImage: `linear-gradient(hsl(var(--nextui-background)), hsl(var(--nextui-background))), linear-gradient(83.87deg, #F54180, #9353D3)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
            onClick={handleAccept}
          >
            Accept All
          </Button>
          <Button
            aria-label="Reject all cookies"
            className="font-medium"
            radius="lg"
            variant="light"
            onClick={handleReject}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
