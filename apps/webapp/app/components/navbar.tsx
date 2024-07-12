
"use client";

import { Navbar as UINavbar } from "flowbite-react";
import LoginButton from "./loginButton";

export function Navbar() {
  return (
    <UINavbar fluid rounded>
      <UINavbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">OnePlace</span>
      </UINavbar.Brand>
      <div className="flex md:order-2">
        <LoginButton/>
        <UINavbar.Toggle />
      </div>
      <UINavbar.Collapse>
        <UINavbar.Link href="#" active>
          Home
        </UINavbar.Link>
        <UINavbar.Link href="#">About</UINavbar.Link>
        <UINavbar.Link href="#">Services</UINavbar.Link>
        <UINavbar.Link href="#">Pricing</UINavbar.Link>
        <UINavbar.Link href="#">Contact</UINavbar.Link>
      </UINavbar.Collapse>
    </UINavbar>
  );
}
