
"use client";

import { Button } from "flowbite-react";

export function Toolbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="px-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex gap-2 ">
            <Button>Condividi</Button>
            <Button>Crea Cartella</Button>
          </div>
          <div className="flex gap-2">
            <Button>Ordina</Button>
            <Button>Visualizza</Button>
            <Button>Dettagli</Button>
          </div>
      </div>
  </nav>
  );
}
