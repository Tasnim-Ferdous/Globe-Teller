import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { feature } from "topojson-client";


export default function GlobeTeller() {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [stories, setStories] = useState({});
  const [isRotating, setIsRotating] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
      .then((res) => res.json())
      .then((worldData) => {
        const countriesGeoJson = feature(worldData, worldData.objects.countries);
        // Compute centroids for all countries
        countriesGeoJson.features.forEach((f) => {
          const coords = f.geometry.coordinates.flat(Infinity);
          const lon = coords.reduce((sum, val, i) => i % 2 === 0 ? sum + val : sum, 0) / (coords.length / 2);
          const lat = coords.reduce((sum, val, i) => i % 2 !== 0 ? sum + val : sum, 0) / (coords.length / 2);
          f.properties.centroid = [lon, lat];
        });
        setCountries(countriesGeoJson);
      });

    fetch("/src/data/countryStories.json")
      .then((res) => res.json())
      .then(setStories)
      .catch(() => setStories({}));
  }, []);

  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
    globeEl.current.pointOfView({ altitude: 2 }, 4000);
  }, []);

  const toggleRotation = () => {
    const controls = globeEl.current.controls();
    controls.autoRotate = !controls.autoRotate;
    setIsRotating(controls.autoRotate);
  };

  const handleCountryClick = (country) => {
    const name = country.properties.name;
    setHighlightedCountry(name);
    setSelectedCountry({
      name,
      story: stories[name]?.story || "No story available.",
      audio: stories[name]?.audio || null,
      image: stories[name]?.image || null,
    });

    const [lng, lat] = country.properties.centroid || [0, 0];
    const target = { lat, lng, altitude: 1.5 };

    // current camera angle
    const currentView = globeEl.current.pointOfView();

    // Animate camera to look at the selected country
    globeEl.current.pointOfView(target, 2000);
  };

  const handleSearch = () => {
    const country = countries.features.find(
      (c) => c.properties.name.toLowerCase() === searchQuery.toLowerCase()
    );
    if (country) {
      setSearchQuery(country.properties.name);
      handleCountryClick(country);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black text-white font-sans select-none">
      {/* Search Bar */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex flex-col items-center w-72 z-10">
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Search country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-md text-black bg-white/95 backdrop-blur-sm focus:outline-none w-full"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition"
          >
            Go
          </button>
        </div>

        {/* Dropdown suggestions */}
        {searchQuery && (
          <ul className="w-full mt-1 bg-white/90 backdrop-blur-md text-black rounded-md shadow-lg max-h-40 overflow-y-auto">
            {countries.features
              .filter((c) =>
                c.properties.name
                  .toLowerCase()
                  .startsWith(searchQuery.toLowerCase())
              )
              .slice(0, 6)
              .map((c) => (
                <li
                  key={c.properties.name}
                  onClick={() => {
                    const name = c.properties.name;
                    setSearchQuery(name);
                    const country = countries.features.find(
                      (c) => c.properties.name === name
                    );
                    if (country) handleCountryClick(country);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {c.properties.name}
                </li>
              ))}
          </ul>
        )}
      </div>

      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        polygonsData={countries.features}
        polygonAltitude={0.01}
        polygonCapColor={(d) =>
          d.properties.name === highlightedCountry
            ? "rgba(30, 144, 255, 0.9)"
            : "rgba(255, 255, 255, 0.15)"
        }
        polygonSideColor={() => "rgba(255, 255, 255, 0.05)"}
        polygonStrokeColor={() => "#111"}
        onPolygonClick={handleCountryClick}
        polygonsTransitionDuration={300}
      />

      {/* Play/Pause button */}
      <button
        onClick={toggleRotation}
        className="absolute top-5 right-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 backdrop-blur-md transition"
      >
        {isRotating ? "Pause Rotation" : "Play Rotation"}
      </button>

      {/* Instruction Modal */}
      {showInstructions && (
        <div 
          className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn"
          style={{ animationDuration: "0.3s" }}
        >
          <div 
            className="bg-gradient-to-br from-white/95 to-gray-100 text-black p-6 rounded-2xl max-w-md w-full shadow-2xl relative backdrop-blur-md border border-gray-300 animate-fadeIn"
            style={{ animationDuration: "0.3s" }}
          >
            <h2 className="text-3xl font-extrabold mb-3.5 text-center">Welcome to <span className="text-blue-600">Globe Teller</span></h2>
            <p className="mb-5 text-sm leading-relaxed text-center">
              Click on any country to explore its <b>details</b>, and see its <b>flag.</b> <br />
              You can also <b>rotate or pause</b> the globe freely.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowInstructions(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105"
              >
                Let’s Explore!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Country Info Popup */}
      {selectedCountry && (
        <div
          className="absolute top-5 left-5 bg-white/95 text-black rounded-xl shadow-xl max-w-sm max-h-[60vh] overflow-y-auto p-5 backdrop-blur-sm animate-fadeIn border border-gray-200"
          style={{ animationDuration: "0.3s" }}
        >
          <h2 className="text-3xl font-bold mb-3 border-b pb-2">{selectedCountry.name}</h2>
          {selectedCountry.image && (
            <img
              src={selectedCountry.image}
              alt={selectedCountry.name}
              className="w-full rounded-md mb-4 border"
            />
          )}
          <div className="text-1xl font-medium mb-4 whitespace-pre-line overflow-y-auto max-h-40 pr-2 custom-scroll">
            {selectedCountry.story}
          </div>
          {selectedCountry.audio && (
            <audio
              controls
              src={selectedCountry.audio}
              className="w-full mb-4"
            />
          )}
          <button
            onClick={() => setSelectedCountry(null)}
            className="absolute top-3.5 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full py-2 px-3.5 shadow-md transition transform"
            aria-label="Close Country Info"
          >
            ✕
          </button>

        </div>
      )}
    </div>
  );
}
