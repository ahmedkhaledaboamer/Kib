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
        websiteToken: "rpVangi8xrXgUAg7t8puLwtz", 
        baseUrl: BASE_URL
      });
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
