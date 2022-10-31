import React from "react";
import Link from "next/link";
import { Exchange, List, Notification } from "../../icons";
import { CSSTransition } from "react-transition-group";

export default function DashboardPopup({ popupIn, setPopupIn }) {
  return (
    <CSSTransition in={popupIn} timeout={300} classNames="optionsPopup">
      <div className="optionsPopup">
        <div className="optionsPopup__optionBox">
          <Link href="/collection">
            <a
              onClick={() => setPopupIn(false)}
              className="textBtn textBtn--mobileActive textBtn--stretch"
            >
              <div className="textBtn__text">
                <List />
                <p>Coleção</p>
              </div>
              <div className="textBtn__background"></div>
            </a>
          </Link>
        </div>
        <div className="optionsPopup__optionBox">
          <Link href="/exchange">
            <a
              onClick={() => setPopupIn(false)}
              className="textBtn textBtn--mobileActive textBtn--stretch"
            >
              <div className="textBtn__text">
                <Exchange />
                <p>Trocar</p>
              </div>
              <div className="textBtn__background"></div>
            </a>
          </Link>
        </div>
        <div className="optionsPopup__optionBox">
          <Link href="/notifications">
            <a
              onClick={() => setPopupIn(false)}
              className="textBtn textBtn--mobileActive textBtn--stretch"
            >
              <div className="textBtn__text">
                <Notification />
                <p>Notificações</p>
              </div>
              <div className="textBtn__background"></div>
            </a>
          </Link>
        </div>
      </div>
    </CSSTransition>
  );
}
