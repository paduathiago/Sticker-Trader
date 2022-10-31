import React from "react";
import Logo from "../logo";
import Link from "next/link";

export default function DefaultContainer({ children, loadingUser }) {
  return (
    <div className="container">
      <div className="container__grid container__grid--default">
        <div className="container__navbarBox container__navbarBox--logo">
          <Link href="/">
            <a className="uDontDecorate">
              <Logo size={"small"} />
            </a>
          </Link>
        </div>
        {!loadingUser ? (
          <>
            <div className="container__navbarBox container__navbarBox--about">
              <Link href="/about">
                <a className="textBtn textBtn--mobileActive">
                  <div className="textBtn__text">About</div>
                  <div className="textBtn__background"></div>
                </a>
              </Link>
            </div>
            <div className="container__navbarBox container__navbarBox--login">
              <Link href="/login">
                <a className="textBtn textBtn--mobileActive">
                  <div className="textBtn__text">Login</div>
                  <div className="textBtn__background"></div>
                </a>
              </Link>
            </div>
            <div className="container__navbarBox container__navbarBox--register">
              <Link href="/register">
                <a className="textBtn textBtn--mobileActive">
                  <div className="textBtn__text">Register</div>
                  <div className="textBtn__background"></div>
                </a>
              </Link>
            </div>
          </>
        ) : null}
        <div className="container__contentBox">{children}</div>
      </div>
    </div>
  );
}
