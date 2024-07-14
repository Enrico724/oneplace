"use client";

import { Button } from "flowbite-react";

export function Toolbar() {
  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 px-0">
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
