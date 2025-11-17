"use client";
import s from "./page.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  setCarriageNumber,
} from "@/store/slices/counterSlice";
import Link from "next/link";

export default function HomePage() {
  const counterValue = useSelector((state) => state.counter.counterValue);
  const carriageNumber = useSelector((state) => state.counter.carriageNumber);
  const dispatch = useDispatch();

  function handleClick() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const time = `${hours}:${minutes}`;
    localStorage.setItem("time", time);
  }

  return (
    <main className="container">
      <div className={s.counter}>
        <h2 className={s.counter__title}>
          Количество пассажиров: <span>{counterValue}</span>
        </h2>
        <div className={s.counter__buttons}>
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(decrement())}>−</button>
        </div>
      </div>
      <hr />
      <div className={s.form}>
        <h2 className={s.form__title}>Номер вагона</h2>
        <input
          type="number"
          value={carriageNumber === 0 ? "" : carriageNumber}
          min="1"
          max="20"
          inputMode="numeric"
          pattern="[0-9]*"
          className={s.form__input}
          onChange={(e) => dispatch(setCarriageNumber(Number(e.target.value)))}
        />
      </div>
      <Link href="/ticket" className={s.link} onClick={handleClick}>
        <div>Перейти на страницу билета</div>
      </Link>
    </main>
  );
}
