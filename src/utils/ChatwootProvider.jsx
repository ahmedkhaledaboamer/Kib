import { useEffect } from "react";

export default function ChatwootProvider() {
  useEffect(() => {
    if (window.chatwootSDK) return;

    window.chatwootSettings = {
      position: "right",
      type: "standard",
      launcherTitle: "Chat with us",
      hideMessageBubble: false
    };

    const BASE_URL = "https://chatwoot.pro-shazmlc.cloud";
    const script = document.createElement("script");
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.async = true;

    script.onload = () => {
      window.chatwootSDK.run({
        websiteToken: "jQUnRztZgsRn1aheDV4xZs79",
        baseUrl: BASE_URL
      });
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
