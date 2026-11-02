"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { announcementMessages, saleText } from "./data";
import { GuaranteeIcon, TruckIcon } from "./icons";

const TICK_MS = 3000;

export function Announcement() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % announcementMessages.length), TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="px-container">
      <div className="px-announcement">
        <div className="px-announcement__ticker" aria-live="polite">
          {announcementMessages.map((message, i) => (
            <h5
              key={message.text}
              className={cn("px-announcement__message", i === active && "px-announcement__message--active")}
              aria-hidden={i !== active}
            >
              {"icon" in message && message.icon === "truck" && <TruckIcon />}
              {"icon" in message && message.icon === "guarantee" && <GuaranteeIcon />}
              <span>{message.text}</span>
              {"icon" in message && message.icon === "truck" && (
                <span className="px-announcement__mirror">
                  <TruckIcon />
                </span>
              )}
              {"icon" in message && message.icon === "guarantee" && <GuaranteeIcon />}
            </h5>
          ))}
        </div>
        <div className="px-announcement__sale">
          <p>{saleText}</p>
        </div>
      </div>
    </section>
  );
}
