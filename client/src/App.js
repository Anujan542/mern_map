import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import NewForm from "./components/NewForm";
import { Toaster } from "react-hot-toast";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [viewport, setViewport] = useState({
    // srilanka lat and long
    width: "100vw",
    height: "100vh",
    latitude: 7.8731,
    longitude: 80.7718,
    zoom: 8,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/api/pin");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(currentUser);
    getPins();
  }, [currentUser]);

  const handleClose = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, longitude: long, latitude: lat });
  };

  const addPlace = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <>
      <Toaster position="top-center" />
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        // mapStyle="mapbox://styles/anujan007/ckqfgz7es6hkf18nupb6qnfww"
        onDblClick={addPlace}
        transitionDuration="200"
      >
        {pins &&
          pins.map((p) => (
            <div key={p._id}>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-viewport.zoom * 3.5}
                offsetTop={-viewport.zoom * 7}
              >
                <Room
                  style={{
                    fontSize: viewport.zoom * 7,
                    color:
                      currentUser && currentUser.username === p.user.username
                        ? "tomato"
                        : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClose(p._id, p.lat, p.long)}
                />
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setCurrentPlaceId(null)}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      created By : <b>{p.user.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
              {/* {currentUser ? (
                <>
                  {" "} */}
              {newPlace && currentUser && (
                <Popup
                  latitude={newPlace.lat}
                  longitude={newPlace.long}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={() => setNewPlace(null)}
                >
                  <NewForm
                    pins={pins}
                    setPins={setPins}
                    newPlace={newPlace}
                    setNewPlace={setNewPlace}
                    currentUser={currentUser}
                  />
                </Popup>
              )}
              {/* </>
              ) : (
                <div style={{ color: "tomato" }}></div>
              )} */}
            </div>
          ))}
        {currentUser ? (
          <button className="button logout" onClick={logout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
        )}
      </ReactMapGL>
    </>
  );
};

export default App;
