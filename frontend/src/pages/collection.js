import React, { useState, useContext } from "react";
import Sticker from "../components/sticker";
import api from "../services/api";
import { useRouter } from "next/router";
import { Plus } from "../icons";
import { UserContext } from "../components/context/context";

export default function Collection({ data, error }) {
  const { user } = useContext(UserContext);

  const [stickers, setStickers] = useState(data || []);
  const [errorFetchStickers, setErrorFetchStickers] = useState(
    data ? null : error
  );

  const [stickerNumber, setStickerNumber] = useState("");
  const [errorAddSticker, setErrorAddSticker] = useState(false);

  const router = useRouter();

  async function addSticker() {
    if (stickerNumber) {
      try {
        await api.post(`/api/userStickers/${stickerNumber}`, null, {
          withCredentials: true,
        });

        setErrorAddSticker(false);
        setStickers((prevState) => [...prevState, stickerNumber]);
        setStickerNumber("");
      } catch (err) {
        console.log(err);
        setErrorAddSticker(true);
      }
    }
  }

  if (!user) {
    router.push("/");
    return null;
  } else {
    return (
      <div className="collection">
        <div className="collection__grid">
          <div className="collection__headerBox">
            <div className="coolHeading coolHeading--medium">Minha coleção</div>
          </div>
          <div className="collection__addBox">
            <a onClick={addSticker} className="collection__addBtn">
              <div className="collection__addBtn--icon">
                <Plus />
              </div>
              <input
                type="text"
                placeholder="Número"
                value={stickerNumber}
                onChange={(e) => setStickerNumber(e.target.value)}
              />
            </a>
          </div>
          <div className="collection__contentBox">
            {stickers &&
              stickers.map((sticker, index) => (
                <Sticker key={index} number={sticker} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps({ req }) {
  return api
    .get("/api/userStickers/", {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    .then((response) => {
      const stickers = [];

      if (response.data) {
        response.data.forEach((sticker) => {
          for (let i = 0; i < sticker.amount; i++) {
            stickers.push(sticker.Sticker.number);
          }
        });
      }

      stickers.sort((a, b) => {
        if (a < b) return -1;
        else if (b > a) return 1;
        else return 0;
      });

      return {
        props: {
          data: stickers,
        },
      };
    })
    .catch((err) => ({
      props: {
        error: err.response ? err.response.data : true,
      },
    }));
}
