import { useEffect, useState } from "react";
import "./Buttons.css";
import "./Screen.css";
import zingtouch from "zingtouch";
import img1 from './assets/songs.png'
import img2 from './assets/artists.png'
import img3 from './assets/albums.jpg'
import img4 from './assets/playlists.png'

// global variables
let index = 0,
  range = 0,
  visibility = true,
  selectItem;

function App() {
  // state hooks
  const [list, setList] = useState([
    { listItem: "Songs", state: true, id: 0 },
    { listItem: "Albums", state: false, id: 1 },
    { listItem: "Artists", state: false, id: 2 },
    { listItem: "Playlists", state: false, id: 3 },
  ]);

  const [activeItem, setActiveItem] = useState([]);

  useEffect(() => {
    let buttonWheel = document.getElementById("button-wheel");
    let activeRegion = zingtouch.Region(buttonWheel);
    activeRegion.bind(buttonWheel, "rotate", function (event) {
      range += Math.floor(event.detail.distanceFromLast);

      if (range > 70) {
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
        index++;
        range = 0;

        if (index === 5) {
          index = 0;
        }
      } else if (range < -100) {
        index--;

        if (index < 0) {
          index = 4;
        }
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
        range = 0;
      }
    });
  }, []);

  // select button position at middle
  const handleSelect = () => {
    selectItem = list.filter((item) => item.state === true);
    const title = selectItem[0].listItem;

    if (title === "Songs") {
      setActiveItem({
        ...selectItem,
        src: img1,
      });
    } else if (title === "Albums") {
      setActiveItem({
        ...selectItem,
        src: img2,
      });
    } else if (title === "Artists") {
      setActiveItem({
        ...selectItem,
        src: img3,
      });
    } else if (title === "Playlists") {
      setActiveItem({
        ...selectItem,
        src: img4,
      });
    }

    visibility = false;
  };

  const handleMenu = () => {
    visibility = true;
    setActiveItem([]);
  };

  // render function
  return (
    <div className="ipod">
      <div className="screen">
        {/* side-menu section */}
        <div
          style={!visibility ? { display: "none" } : {}}
          className="side-menu"
        >
          <h2 style={{marginLeft: '1rem'}}>iPod</h2>
          {list.map((item) => (
            <li key={item.id} className={item.state ? "active" : ""}>
              {item.listItem}
            </li>
          ))}
        </div>

        {/* display section */}
        <div className="display">
          {/* <h2>{visibility ? "" : activeItem[0].listItem}</h2> */}
          {activeItem.src && <img src={visibility ? "" : activeItem.src} />}
        </div>
      </div>

      {/* Controls section */}
      <div className="button-container">
        <div className="button-wheel" id="button-wheel">
          <span className="select" onClick={handleSelect}></span>
          <span className="backward">
            <i className="fa-solid fa-backward-fast "></i>
          </span>
          <span className="menu" onClick={handleMenu}>MENU</span>
          <span className="forward">
            <i className="fa-solid fa-forward-fast "></i>
          </span>
          <span className="play-pause">
            <i className="fa-solid fa-play"></i>
            <i className="fa-solid fa-pause"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
