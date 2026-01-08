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
        websiteToken: "bwu3GcQDKjsFsqm3irJdcijx", 
        baseUrl: BASE_URL
      });

       window.openChatwootChat = () => {
        if (window.$chatwoot) {
          window.$chatwoot.toggle('open');
        } else if (window.chatwootSDK) {
          window.chatwootSDK.toggle();
        }
      };
    };

    document.body.appendChild(script);
  }, []);

  return null;
}