 

// import { X } from "lucide-react";
// import React from "react";

// function ChatWidget({ isOpen, onClose, service }) {
//   if (!isOpen) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: 500,
//         height: 600,
//         zIndex: 9999,
//         background: "#fff",
//         borderRadius: "1rem",
//         overflow: "hidden",
//         boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
//       }}
//     >
//       <button
//         onClick={onClose}
//         style={{
//           position: "absolute",
//           top: 10,
//           right: 10,
//           zIndex: 10,
//           background: "#f3f3f3",
//           border: "none",
//           padding: "0.5rem",
//           borderRadius: "0.5rem",
//           cursor: "pointer"
//         }}
//       >

// <X/>

         
//       </button>

//       <iframe
//         src={`https://chatwoot.pro-shazmlc.cloud/widget?website_token=${service.chatToken}`}
//         style={{ width: "100%", height: "100%", border: "none" }}
//         title={`Chat for ${service.title}`}
//       />
//     </div>
//   );
// }

// export default ChatWidget;


import React from "react";
import { X } from "lucide-react";

function ChatWidget({ isOpen, onClose, service }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-3">
      <div
        className="
          relative 
          w-full 
          max-w-sm sm:max-w-md 
          h-[65vh] sm:h-[520px]
          bg-white 
          rounded-xl 
          shadow-2xl 
          overflow-hidden
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="
            absolute top-2 right-2 z-10
            bg-gray-100 hover:bg-gray-200
            text-gray-700
            p-1.5
            rounded-md
            transition
          "
        >
          <X className="w-4 h-4" />
        </button>

        {/* Chat iframe */}
        <iframe
          src={`https://chatwoot.pro-shazmlc.cloud/widget?website_token=${service.chatToken}`}
          title={`Chat for ${service?.title || "Service"}`}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}

export default ChatWidget;
