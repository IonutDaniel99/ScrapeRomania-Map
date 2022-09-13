import React, { useState } from "react";
import { BsHouse } from "react-icons/bs";
import { GiHighShot } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { RiSettings3Line } from "react-icons/ri";
import { UserAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function NavBar() {
  const { logOut, user } = UserAuth();
  const [active, setActive] = useState(2);
  const handleSignOut = async () => {
    try {
      await logOut();
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const Menus = [
    { name: "Rank", icon: <GiHighShot fontSize={25} />, dis: "translate-x-0" },
    {
      name: "Profile",
      icon: <CgProfile fontSize={25} />,
      dis: "translate-x-16",
    },
    { name: "Home", icon: <BsHouse fontSize={25} />, dis: "translate-x-32" },
    {
      name: "Settings",
      icon: <RiSettings3Line fontSize={25} />,
      dis: "translate-x-48",
    },
    { name: "LogOut", icon: <FiLogOut fontSize={25} />, dis: "translate-x-64" },
  ];

  return (
    user && (
      <div className="bg-slate-100 max-h-[4.4rem] px-6 rounded-xl absolute bottom-14 bg-opacity-80 scale-110">
        <ul className="flex relative">
          <span
            className={`bg-green-500 duration-500 ${Menus[active].dis} border-2 border-blue-800 h-14 w-14 absolute left-1 -top-[25px] rounded-full blur-[6px] `}
          ></span>
          <li key={1} className="w-16 z-10">
            <a
              className="flex items-center flex-col text-center pt-6"
              onClick={() => setActive(0)}
            >
              <span
                className={`text-xl cursor-pointer max-w-fit duration-500 ${
                  0 === active && "-mt-[34px] text-white"
                }`}
              >
                {Menus[0].icon}
              </span>
              <span
                className={`font-bold ${
                  active === 0
                    ? "translate-y-5 duration-700 opacity-100"
                    : "opacity-0 translate-y-10 "
                }`}
              >
                {Menus[0].name}
              </span>
            </a>
          </li>
          <li key={2} className="w-16 z-10">
            <a
              className="flex items-center flex-col text-center pt-5"
              onClick={() => setActive(1)}
            >
              <img
                src={user?.photoURL}
                className={`text-xl cursor-pointer max-w-fit duration-500 w-[30px] h-[30px] rounded-full ${
                  1 === active && "-mt-[30px] text-white"
                }`}
              ></img>
              <span
                className={`font-bold ${
                  active === 1
                    ? "translate-y-4 duration-700 opacity-100"
                    : "opacity-0 translate-y-10 "
                }`}
              >
                {Menus[1].name}
              </span>
            </a>
          </li>
          <li key={3} className="w-16 z-10">
            <a
              className="flex items-center flex-col text-center pt-6"
              onClick={() => setActive(2)}
            >
              <span
                className={`text-xl cursor-pointer max-w-fit duration-500 ${
                  2 === active && "-mt-[34px] text-white"
                }`}
              >
                {Menus[2].icon}
              </span>
              <span
                className={`font-bold ${
                  active === 2
                    ? "translate-y-5 duration-700 opacity-100"
                    : "opacity-0 translate-y-10 "
                }`}
              >
                {Menus[2].name}
              </span>
            </a>
          </li>
          <li key={4} className="w-16 z-10">
            <a
              className="flex items-center flex-col text-center pt-6"
              onClick={() => setActive(3)}
            >
              <span
                className={`text-xl cursor-pointer max-w-fit duration-500 ${
                  3 === active && "-mt-[34px] text-white"
                }`}
              >
                {Menus[3].icon}
              </span>
              <span
                className={`font-bold ${
                  active === 3
                    ? "translate-y-5 duration-700 opacity-100"
                    : "opacity-0 translate-y-10 "
                }`}
              >
                {Menus[3].name}
              </span>
            </a>
          </li>
          <li key={5} className="w-16 z-10">
            <a
              className="flex items-center flex-col text-center pt-6"
              onClick={() => handleSignOut()}
            >
              <span
                className={`text-xl cursor-pointer max-w-fit duration-500 ${
                  4 === active && "-mt-[34px] text-white"
                }`}
              >
                {Menus[4].icon}
              </span>
              <span
                className={`font-bold ${
                  active === 4
                    ? "translate-y-5 duration-700 opacity-100"
                    : "opacity-0 translate-y-10 "
                }`}
              >
                {Menus[4].name}
              </span>
            </a>
          </li>
        </ul>
      </div>
    )
  );
}

export default NavBar;
