 

import { X } from "lucide-react";
import React from "react";

function ChatWidget({ isOpen, onClose, service }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 600,
        zIndex: 9999,
        background: "#fff",
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10,
          background: "#f3f3f3",
          border: "none",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          cursor: "pointer"
        }}
      >

<X/>

         
      </button>

      <iframe
        src={`https://chatwoot.pro-shazmlc.cloud/widget?website_token=${service.chatToken}`}
        style={{ width: "100%", height: "100%", border: "none" }}
        title={`Chat for ${service.title}`}
      />
    </div>
  );
}

export default ChatWidget;
