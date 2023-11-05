"use client";

import { ChangeEvent, ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

const transformers = {
  rumble: { name: "Rumble", size: 2 },
  frenzy: { name: "Frenzy", size: 2 },
  ravage: { name: "Ravage", size: 2 },
  laserbeak: { name: "Laserbeak", size: 2 },
  buzzsaw: { name: "Buzzsaw", size: 2 },
  kickback: { name: "Kickback", size: 2.5 },
  shrapnel: { name: "Shrapnel", size: 2.5 },
  bombshell: { name: "Bombshell", size: 2.5 },
  bumblebee: { name: "Bumblebee", size: 3 },
  cliffjumper: { name: "Cliffjumper", size: 3 },
  windcharger: { name: "Windcharger", size: 3 },
  gears: { name: "Gears", size: 3 },
  huffer: { name: "Huffer", size: 3.5 },
  brawn: { name: "Brawn", size: 3.5 },
  reflector: { name: "Reflector", size: 4 },
  mirage: { name: "Mirage", size: 4 },
  wheeljack: { name: "Wheeljack", size: 4 },
  smokescreen: { name: "Smokescreen", size: 4 },
  bluestreak: { name: "Bluestreak", size: 4 },
  prowl: { name: "Prowl", size: 4 },
  jazz: { name: "Jazz", size: 4 },
  redAlert: { name: "Red Alert", size: 4 },
  sideswipe: { name: "Sideswipe", size: 4 },
  sunstreaker: { name: "Sunstreaker", size: 4 },
  hoist: { name: "Hoist", size: 5 },
  grapple: { name: "Grapple", size: 5 },
  inferno: { name: "Inferno", size: 5 },
  ratchet: { name: "Ratchet", size: 5 },
  ironhide: { name: "Ironhide", size: 5 },
  trailbreaker: { name: "Trailbreaker", size: 5 },
  perceptor: { name: "Perceptor", size: 5 },
  skywarp: { name: "Skywarp", size: 5 },
  thundercracker: { name: "Thundercracker", size: 5 },
  starscream: { name: "Starscream", size: 5 },
  soundwave: { name: "Soundwave", size: 5.5 },
  shockwave: { name: "Shockwave", size: 5.5 },
  blaster: { name: "Blaster", size: 5.5 },
  ramjet: { name: "Ramjet", size: 5.5 },
  dirge: { name: "Dirge", size: 5.5 },
  thrust: { name: "Thrust", size: 5.5 },
  blitzwing: { name: "Blitzwing", size: 5.5 },
  astrotrain: { name: "Astrotrain", size: 5.5 },
  optimusPrime: {
    name: "Optimus Prime",
    size: 6,
    image: "/optimus-prime.jpeg",
  },
  megatron: { name: "Megatron", size: 6, image: "/megatron.jpeg" },
  snarl: { name: "Snarl", size: 7 },
  slag: { name: "Slag", size: 7 },
  sludge: { name: "Sludge", size: 7 },
  grimlock: { name: "Grimlock", size: 7 },
  devastator: { name: "Devastator", size: 16 },
  omegaSupreme: { name: "Omega Supreme", size: 18 },
} as const;

const options = Object.entries(transformers).map(([slug, { name }]) => (
  <option key={slug} value={slug}>
    {name}
  </option>
));

export default function Home() {
  const [selectedTransformers, setSelectedTransformers] = useState<{
    transformer1: keyof typeof transformers;
    transformer2: keyof typeof transformers;
  }>({
    transformer1: "optimusPrime",
    transformer2: "megatron",
  });

  function onSelectedTransformerChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedTransformers((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const transformer1 = transformers[selectedTransformers.transformer1];
  const transformer2 = transformers[selectedTransformers.transformer2];

  const isTransformer1Bigger = transformer1.size > transformer2.size;
  const height1 = isTransformer1Bigger
    ? "100%"
    : `${(transformer1.size / transformer2.size) * 100}%`;
  const height2 = isTransformer1Bigger
    ? `${(transformer2.size / transformer1.size) * 100}%`
    : "100%";

  return (
    <main className="flex flex-col gap-16 items-center max-w-2xl m-auto">
      <header>
        <h1 className="pt-16 uppercase text-4xl font-bold text-blue-700">
          Transformersize
        </h1>
      </header>
      <aside className="flex-col flex max-w-sm gap-2 sm:flex-row justify-evenly ">
        <Select
          name="transformer1"
          value={selectedTransformers.transformer1}
          onChange={onSelectedTransformerChange}
          className="bg-blue-500 text-gray-100 "
        />
        <Select
          name="transformer2"
          value={selectedTransformers.transformer2}
          onChange={onSelectedTransformerChange}
          className="bg-red-500 text-gray-100 "
        />
      </aside>
      <article className="grid gap-2 grid-cols-[1fr_1fr] justify-center w-full items-end">
        <Transformer
          transformer={transformer1}
          height={height1}
          className="border border-blue-500 text-blue-500"
        />
        <Transformer
          transformer={transformer2}
          height={height2}
          className="border border-red-500 text-red-500"
        />
      </article>
    </main>
  );
}

function Transformer({
  className = "",
  transformer,
  height,
}: {
  className?: string;
  transformer: (typeof transformers)[keyof typeof transformers];
  height: string;
}) {
  return (
    <div
      style={{
        height,
      }}
      className={twMerge("relative text-center pt-4", className)}
    >
      {"image" in transformer ? (
        <Image
          src={transformer.image}
          alt={transformer.name}
          fill
          className="object-contain"
        />
      ) : (
        <RobotSvg />
      )}
    </div>
  );
}

function Select(props: ComponentProps<"select">) {
  return (
    <select {...props} className={twMerge("rounded-lg p-2", props.className)}>
      {options}
    </select>
  );
}

function RobotSvg() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 87.285 87.285"
      fill="currentColor"
    >
      <g>
        <path d="M64.728,23.41c-1.393,0-2.637,0.633-3.462,1.628h-4.633c-1.122-1.663-2.767-2.941-4.698-3.604   c2.824-1.597,4.732-4.625,4.732-8.101V9.302C56.667,4.165,52.501,0,47.365,0h-7.132c-5.138,0-9.303,4.165-9.303,9.302v4.031   c0,3.476,1.908,6.504,4.732,8.101c-1.932,0.663-3.577,1.941-4.698,3.604H26.02c-0.825-0.995-2.069-1.628-3.462-1.628   c-2.483,0-4.496,2.013-4.496,4.496v21.55c0,2.483,2.013,4.496,4.496,4.496s4.496-2.013,4.496-4.496V29.844h2.335   c-0.005,0.128-0.01,0.257-0.01,0.387v22.171c0,2.938,1.363,5.555,3.488,7.259v23.128c0,2.482,2.013,4.496,4.496,4.496   c2.483,0,4.497-2.014,4.497-4.496V61.704h4.573v21.085c0,2.482,2.014,4.496,4.496,4.496s4.496-2.014,4.496-4.496V59.534   c0-0.158-0.008-0.313-0.024-0.468c1.736-1.69,2.815-4.051,2.815-6.664V30.231c0-0.13-0.004-0.259-0.01-0.387h2.024v19.612   c0,2.483,2.013,4.496,4.496,4.496s4.496-2.013,4.496-4.496v-21.55C69.225,25.422,67.21,23.41,64.728,23.41z M50.52,12.092H36.456   c-2.024,0-3.666-1.642-3.666-3.666c0-2.024,1.642-3.666,3.666-3.666H50.52c2.024,0,3.666,1.641,3.666,3.666   C54.186,10.451,52.544,12.092,50.52,12.092z" />
      </g>
    </svg>
  );
}
