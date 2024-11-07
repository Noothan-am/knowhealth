"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineMoveToInbox } from "react-icons/md";
import AdminCards from "@/app/admin-dashboard/AdminCards";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [open, setOpen] = useState(true);
  const Menus = [{ title: "Inbox", src: "Chat" }];

  return (
    <>
      <div className="flex">
        <div
          className={` ${
            open ? "w-52" : "w-20"
          } border-r-2 border-black h-screen p-5  pt-8 relative duration-300`}
        >
          <IoChevronBack
            className={`absolute cursor-pointer h-6 w-6 -right-3 top-9 bg-white border-2 border-black rounded-full p-1 transform duration-200
             ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />

          <div className="flex gap-x-4 items-center">
            <h1
              className={`text-black origin-left font-bold text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Designer
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-slate-300 text-black text-lg items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <MdOutlineMoveToInbox />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-screen flex-1 p-7">
          <h1 className="text-xl font-semibold ">Home Page</h1>
          <AdminCards />
          <AdminCards />
          <AdminCards />
        </div>
      </div>
    </>
  );
}
