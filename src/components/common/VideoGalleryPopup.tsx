import React, { useEffect } from "react";

interface VideoGalleryPopupProps {
    url?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const VideoGalleryPopup: React.FC<VideoGalleryPopupProps> = ({
    url = "",
    isOpen = false,
    onClose = () => { },
}) => {
    const extractYouTubeVideoId = (inputUrl: string): string | null => {
        if (!inputUrl) return null;

        const patterns: RegExp[] = [
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
            /(?:https?:\/\/)?youtu\.be\/([^&\n?#]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\n?#]+)/,
        ];

        for (const pattern of patterns) {
            const match = inputUrl.match(pattern);
            if (match) {
                return match[1];
            }
        }
        return null;
    };

    const getEmbedUrl = (inputUrl: string): string => {
        if (!inputUrl) {
            return "https://www.youtube-nocookie.com/embed/MLpWrANjFbI?autoplay=1&rel=0&modestbranding=1&showinfo=0";
        }

        const videoId = extractYouTubeVideoId(inputUrl);
        if (videoId) {
            return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;
        }

        return inputUrl;
    };

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent): void => {
            if (e.key === "Escape" && onClose) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (): void => {
        if (onClose) onClose();
    };

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    const embedUrl = getEmbedUrl(url);

    return (
        <div className="video-popup-overlay active" onClick={handleOverlayClick}>
            <div className="video-popup-content" onClick={handleContentClick}>
                <button className="video-popup-close" onClick={onClose}>
                    ×
                </button>
                <iframe
                    className="video-iframe"
                    width="800"
                    height="450"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        aspectRatio: "16/9",
                    }}
                />
            </div>
        </div>
    );
};

export default VideoGalleryPopup;