"use client";
import PortfolioImage from "@/components/PortfolioImage";
import { useEffect, useRef, useState } from "react";
import type { WorkMedia } from "@/lib/work";

export default function MediaGallery({ media }: { media: WorkMedia[] }) {
  const [active, setActive] = useState<WorkMedia>();
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const pushed = useRef(false);
  const groups = [...new Set(media.map((m) => m.group))];
  const viewableMedia = media.filter((m) =>
    ["image", "video", "youtube"].includes(m.kind),
  );
  const activeIndex = viewableMedia.findIndex((m) => m.id === active?.id);
  function selectMedia(item: WorkMedia) {
    const url = new URL(location.href);
    url.searchParams.set("media", item.id);
    history.replaceState({}, "", url);
    setZoomed(false);
    setActive(item);
  }
  useEffect(() => {
    if (!active || active.kind !== "image") return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.altKey || event.metaKey || event.ctrlKey) return;
      if (
        event.key === "ArrowRight" &&
        activeIndex < viewableMedia.length - 1
      ) {
        event.preventDefault();
        selectMedia(viewableMedia[activeIndex + 1]);
      }
      if (event.key === "ArrowLeft" && activeIndex > 0) {
        event.preventDefault();
        selectMedia(viewableMedia[activeIndex - 1]);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [active, activeIndex, media]);
  useEffect(() => {
    const sync = () =>
      setActive(
        media.find(
          (m) => m.id === new URLSearchParams(location.search).get("media"),
        ),
      );
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [media]);
  useEffect(() => {
    if (active && !dialog.current?.open) dialog.current?.showModal();
    if (!active && dialog.current?.open) {
      dialog.current.close();
      trigger.current?.focus();
    }
  }, [active]);
  function open(item: WorkMedia, event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    trigger.current = event.currentTarget;
    const url = new URL(location.href);
    url.searchParams.set("media", item.id);
    history.pushState({}, "", url);
    pushed.current = true;
    setZoomed(false);
    setActive(item);
  }
  function close() {
    if (pushed.current) {
      pushed.current = false;
      history.back();
    } else {
      const url = new URL(location.href);
      url.searchParams.delete("media");
      history.replaceState({}, "", url);
      setActive(undefined);
    }
  }
  return (
    <>
      <nav className="gallery-jump" aria-label="Case sections">
        {groups.map((group, i) => (
          <a key={group} href={`#gallery-${i}`}>
            {group}
          </a>
        ))}
      </nav>
      {groups.map((group, i) => (
        <section key={group} id={`gallery-${i}`} className="gallery-group">
          <div className="gallery-heading">
            <h2>{group}</h2>
            <span>{media.filter((m) => m.group === group).length} items</span>
          </div>
          <div className="media-grid">
            {media
              .filter((m) => m.group === group)
              .map((item) => {
                const viewable = ["image", "video", "youtube"].includes(
                  item.kind,
                );
                return (
                  <figure
                    key={item.id}
                    id={item.id}
                    className={`media-item ${item.status === "Roster record" ? "roster-media" : ""}`}
                  >
                    <a
                      className={`media-thumb ${!item.thumbnail ? "text-thumb" : ""}`}
                      href={
                        viewable ? `?media=${item.id}#${item.id}` : item.href
                      }
                      onClick={viewable ? (e) => open(item, e) : undefined}
                      target={viewable ? undefined : "_blank"}
                      rel={viewable ? undefined : "noreferrer"}
                      aria-label={`${item.sourceNote ? "Original source unavailable:" : viewable ? "View" : "Open"} ${item.title}`}
                    >
                      {item.thumbnail ? (
                        <PortfolioImage
                          src={item.thumbnail}
                          alt={item.title}
                          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 30vw"
                        />
                      ) : (
                        <span>
                          {item.kind === "article" ? "Read" : "Open source"} ↗
                        </span>
                      )}
                      <span className="media-action">
                        {item.kind === "video" || item.kind === "youtube"
                          ? "Play ↗"
                          : viewable
                            ? "View ↗"
                            : item.sourceNote ? "Original URL ↗" : "Open ↗"}
                      </span>
                    </a>
                    <figcaption>
                      <span className="eyebrow">{item.status}</span>
                      <h3>{item.title}</h3>
                      {item.caption && <p>{item.caption}</p>}
                      {item.sourceNote && <p>{item.sourceNote}</p>}
                      {(item.createdAt || item.publishedAt) && (
                        <p className="media-date">
                          {item.createdAt && `Created ${item.createdAt}`}
                          {item.createdAt && item.publishedAt && " · "}
                          {item.publishedAt && `Published ${item.publishedAt}`}
                        </p>
                      )}
                      {item.sourceHref && (
                        <a
                          href={item.sourceHref}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Publication source ↗
                        </a>
                      )}
                      {viewable && (item.src || item.href) && (
                        <a
                          className="media-file-link"
                          href={item.src || item.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.src
                            ? "Open full media file"
                            : "Open video source"}{" "}
                          ↗
                        </a>
                      )}
                    </figcaption>
                  </figure>
                );
              })}
          </div>
        </section>
      ))}
      <dialog
        ref={dialog}
        className="media-dialog"
        aria-labelledby="media-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="dialog-inner">
          <div className="dialog-heading">
            <div>
              <p className="eyebrow">{active?.status}</p>
              <h2 id="media-dialog-title">{active?.title}</h2>
            </div>
            <button autoFocus onClick={close} aria-label="Close media viewer">
              Close ×
            </button>
          </div>
          {activeIndex >= 0 && (
            <nav className="viewer-controls" aria-label="Media navigation">
              <button
                disabled={activeIndex === 0}
                onClick={() => selectMedia(viewableMedia[activeIndex - 1])}
              >
                ← Previous
              </button>
              <span>
                {activeIndex + 1} / {viewableMedia.length}
              </span>
              <button
                disabled={activeIndex === viewableMedia.length - 1}
                onClick={() => selectMedia(viewableMedia[activeIndex + 1])}
              >
                Next →
              </button>
              {active?.kind === "image" && (
                <button
                  aria-pressed={zoomed}
                  onClick={() => setZoomed(!zoomed)}
                >
                  {zoomed ? "Fit image" : "Zoom image"}
                </button>
              )}
            </nav>
          )}
          {active?.kind === "image" && (
            <div
              className={`image-viewport ${active.status === "Roster record" ? "roster-viewport" : ""}`}
              tabIndex={zoomed ? 0 : undefined}
              aria-label={
                zoomed ? "Zoomed image: scroll to explore" : undefined
              }
            >
              <img
                className={`dialog-image ${zoomed ? "is-zoomed" : ""}`}
                src={active.src}
                alt={active.title}
                width={active.width}
                height={active.height}
              />
            </div>
          )}{" "}
          {active?.kind === "video" && (
            <video
              className={`dialog-video ${(active.height ?? 0) > (active.width ?? 0) ? "portrait-video" : ""}`}
              controls
              playsInline
              preload="none"
              poster={active.thumbnail}
              width={active.width}
              height={active.height}
              src={active.src}
            />
          )}{" "}
          {active?.kind === "youtube" && (
            <iframe
              className="dialog-video"
              title={active.title}
              src={`https://www.youtube-nocookie.com/embed/${active.videoId}?rel=0`}
              allow="fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
          <p>{active?.caption}</p>
          {active?.href && (
            <a
              className="source-link"
              href={active.href}
              target="_blank"
              rel="noreferrer"
            >
              If the player is unavailable, open the source ↗
            </a>
          )}
          {active?.src && (
            <a
              className="source-link"
              href={active.src}
              target="_blank"
              rel="noreferrer"
            >
              Open media file ↗
            </a>
          )}
        </div>
      </dialog>
    </>
  );
}
