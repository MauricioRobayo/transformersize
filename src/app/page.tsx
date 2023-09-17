"use client";

import { useState } from "react";

const transformers = {
  Rumble: 2,
  Frenzy: 2,
  Ravage: 2,
  Laserbeak: 2,
  Buzzsaw: 2,
  Kickback: 2.5,
  Shrapnel: 2.5,
  Bombshell: 2.5,
  Bumblebee: 3,
  Cliffjumper: 3,
  Windcharger: 3,
  Gears: 3,
  Huffer: 3.5,
  Brawn: 3.5,
  Reflector: 4,
  Mirage: 4,
  Wheeljack: 4,
  Smokescreen: 4,
  Bluestreak: 4,
  Prowl: 4,
  Jazz: 4,
  "Red Alert": 4,
  Sideswipe: 4,
  Sunstreaker: 4,
  Hoist: 5,
  Grapple: 5,
  Inferno: 5,
  Ratchet: 5,
  Ironhide: 5,
  Trailbreaker: 5,
  Perceptor: 5,
  Skywarp: 5,
  Thundercracker: 5,
  Starscream: 5,
  Soundwave: 5.5,
  Shockwave: 5.5,
  Blaster: 5.5,
  Ramjet: 5.5,
  Dirge: 5.5,
  Thrust: 5.5,
  Blitzwing: 5.5,
  Astrotrain: 5.5,
  "Optimus Prime": 6,
  Megatron: 6,
  Snarl: 7,
  Slag: 7,
  Sludge: 7,
  Grimlock: 7,
  Devastator: 16,
  "Omega Supreme": 18,
} as const;
export default function Home() {
  const [currentTransformer, setCurrentTransformer] = useState(0);
  const [selectedTransformers, setSelectedTransformers] = useState<
    Array<keyof typeof transformers>
  >(["Optimus Prime", "Megatron"]);
  return (
    <main className="flex flex-col gap-8">
      <h1 className="my-4 text-center uppercase text-4xl font-bold">
        Transformers
      </h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {Object.entries(transformers).map(([name, size]: any) => (
          <button
            onClick={() =>
              setSelectedTransformers((currentSelection) => {
                const newSelection = [...currentSelection];
                newSelection[currentTransformer] = name;
                return newSelection;
              })
            }
            className="flex gap-2 items-center cursor-pointer"
            key={name}
          >
            <span
              className={`text-blue-600 ${
                selectedTransformers.includes(name)
                  ? "font-bold text-black"
                  : ""
              }`}
            >
              {name}
            </span>
            <span className="text-xs text-gray-800 bg-gray-300 rounded-lg p-1">
              {size}m
            </span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 place-items-center max-w-md">
        {selectedTransformers.map((selectedTransformer, index) => {
          const textColor = index === 0 ? "text-red-600" : "text-blue-600";
          const backgroundColor = index === 0 ? "bg-red-600" : "bg-blue-600";
          return (
            <div
              key={selectedTransformer}
              onClick={() => setCurrentTransformer(index)}
            >
              <h2 className={textColor}>{selectedTransformer}</h2>
              <div
                style={{
                  height: `${
                    Math.max(
                      transformers[selectedTransformers[0]],
                      transformers[selectedTransformers[1]]
                    ) * 100
                  }px`,
                }}
                className="flex items-end"
              >
                <div
                  style={{
                    height: `${transformers[selectedTransformer] * 100}px`,
                    width: "8rem",
                  }}
                  className={backgroundColor}
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
