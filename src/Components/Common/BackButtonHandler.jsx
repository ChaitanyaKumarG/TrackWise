import React, { useEffect, useRef } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { useNavigate } from "react-router-dom";

const BackButtonHandler = () => {
  const navigate = useNavigate();
  const listenerRef = useRef(false);

  useEffect(() => {
    // Only add the listener if we haven't already
    if (!listenerRef.current) {
      const handleBackButton = () => {
        const currentUrl = window.location.pathname;
        if (currentUrl === "/" || currentUrl === "/home") {
          CapacitorApp.exitApp();
        } else {
          navigate(-1);
        }
      };

      // Register the listener
      CapacitorApp.addListener("backButton", handleBackButton);
      listenerRef.current = true;
    }

    // We don't try to remove the listener anymore since it's causing issues
    // The app will handle cleanup automatically when it closes
    return () => {
      // No cleanup needed
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default BackButtonHandler;
