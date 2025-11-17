"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import styles from "./page.module.scss";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCarriageNumber } from "@/store/slices/counterSlice";

export default function Ticket() {
  const dispatch = useDispatch();

  const passengers = useSelector((state) => state.counter.counterValue);
  const carriageNumber = useSelector((state) => state.counter.carriageNumber);

  const [ticketNumber, setTicketNumber] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const randomNumber = () => {
      let number;
      do {
        number = Math.floor(Math.random() * 400000000);
      } while (number <= 100000000);
      return number;
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTicketNumber(randomNumber());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("carriageNumber");
    if (saved) {
      dispatch(setCarriageNumber(Number(saved)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("time");
      if (savedTime) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentTime(savedTime);
      }
    }
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const containerRef = useRef(null);

  const handleFullScreen = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  function getTodayDay() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    return dd + "." + mm + "." + yyyy;
  }

  return (
    <div className={`${styles.container} ${styles.layout}`}>
      <header className={styles.header}>
        <div className={styles.arrowBack}>
          <Link href="/">
            <Image
              src="/img/left-arrow.png"
              alt="Back"
              width={20}
              height={20}
            />
          </Link>
        </div>
        <p>Архів</p>
      </header>

      <div className={styles.ticketOrFare}>
        <button className={`${styles.ticketBtn} ${styles.active}`}>
          Квиток
        </button>
        <button className={styles.ticketBtn}>Проїзний</button>
      </div>

      <main className={styles.main}>
        <div className={styles.mainTop}>
          <div className={styles.rightPart}>
            <Image
              src="/img/Coat_of_Arms_of_Odesa.png"
              alt="Coat of arms"
              width={50}
              height={50}
            />
          </div>

          <div className={styles.leftPart}>
            <p>Одеса</p>
            <p>Одесміськелектротранс</p>
            <p>
              Серія <span className={styles.series}>{ticketNumber}</span>
            </p>
          </div>
        </div>

        <div className={styles.mainMiddle}>
          <Image src="/img/1.png" alt="QR" width={120} height={120} />
        </div>

        <div className={styles.mainNumber}>
          № <span>{carriageNumber}</span>
          <p className={styles.carriage}>Вагон</p>
        </div>

        <div className={styles.data}>
          <div>
            <p className={styles.dataText}>Дата</p>
            <p className={styles.dataBottom}>{getTodayDay()}</p>
          </div>
          <div>
            <p className={styles.dataText}>Час</p>
            <p className={styles.dataBottom}>{currentTime}</p>
          </div>
          <div>
            <p className={styles.dataText}>Пасажири</p>
            <p className={styles.dataBottom}>{passengers}</p>
          </div>
        </div>

        <div className={styles.mainFooter}>
          <p className={styles.footerText}>Квиток разового використання</p>
          <p className={`${styles.footerText} ${styles.timer}`}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </main>

      <button className={styles.bottomButton} onClick={handleFullScreen}>
        Відсканувати QR-код
      </button>
    </div>
  );
}
