import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

function VideoCarousel() {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: true,
          startPlay: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length < 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;
    if (span[videoId]) {
      // Animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
  }, [video, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: true,
        }));
        break;
      case "video-reset":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
          videoId: 0,
        }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, i) => (
          <div key={slide.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center bg-black rounded-3xl overflow-hidden">
                <video
                  id="video"
                  preload="auto"
                  playsInline={true}
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center bg-gray-300 px-7 py-5 rounded-full backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 h-3 w-3 relative bg-gray-200 rounded-full cursor-pointer"
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
          <button className="control-btn">
            <img
              src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
              alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
              onClick={
                isLastVideo
                  ? () => handleProcess("video-reset")
                  : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
              }
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default VideoCarousel;
