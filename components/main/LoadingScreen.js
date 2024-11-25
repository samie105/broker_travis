/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";
import Image from "next/image";
import logoDark from "../../public/assets/logoDark.png";
import logoWhite from "../../public/assets/logoWhite.png";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { isDarkMode, baseColor } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the progress by a certain amount
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1.4; // Increase by 10% (adjust as needed)
        } else {
          clearInterval(interval); // Stop the interval when progress reaches 100%
          setIsVisible(false);
          return prevProgress;
        }
      });
    }, 100);
  }, []);

  return isVisible ? (
    <div
      className={`fixed top-0 left-0 z-50 ${
        isDarkMode ? `${baseColor}` : "bg-white"
      } w-full h-full`}
    >
      <section className="section relative w-full h-full">
        {" "}
        <div
          className={`   animate__animated text-xl flex w-full h-full justify-center items-center ${
            progress > 94 ? "animate__slideOutRight" : ""
          }`}
        >
          <div className="progress-cont w-4/5 md:w-1/2">
            <div
              className={`${
                isDarkMode ? "bg-[#11111150]" : "bg-gray-100"
              } progressguauge w-full h-1.5 rounded-full  overflow-hidden transition-all relative`}
            >
              <div
                className="progressbar absolute rounded-full h-full top-0 left-0 transition-all bg-[#0052FF]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>{" "}
        <div
          className={`header  absolute w-full flex items-center justify-center font-bold pt-4  ${
            progress > 10 ? "top-0 " : "-top-20"
          }`}
        >
          <div
            className={` animate__faster animate__animated ${
              isDarkMode ? "text-white" : "text-black"
            } font-bold text-lg ${
              progress > 10 && progress <= 95 ? "animate__slideInDown" : ""
            } ${progress >= 95 ? "animate__slideOutUp" : ""}`}
          >
            {isDarkMode ? (
              <Image
                alt=""
                src={logoWhite}
                width={1000}
                height={1000}
                className="w-40"
              />
            ) : (
              <Image
                alt=""
                src={logoDark}
                width={1000}
                height={1000}
                className="w-40"
              />
            )}
          </div>
        </div>
      </section>{" "}
    </div>
  ) : null;
}
