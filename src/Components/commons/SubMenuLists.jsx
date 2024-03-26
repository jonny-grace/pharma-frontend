import React from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import { Tooltip } from "@mui/material";

const SubMenuLists = ({
  showChild,
  onClick,
  icon,
  title,
  childs,
  toggleDrawer,
}) => {
  return (
    <>
      <div
        className="flex justify-start w-full items-center border-b-[1] border-gray-400 px-7 gap-3 shadow-sm py-1 cursor-pointer h-min text-gray-800"
        onClick={onClick}
      >
        <div className="flex items-center">
          <span>{icon}</span>
        </div>
        <div className="flex items-center">
          <h1 className="whitespace-nowrap">{title}</h1>

          {showChild ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
        </div>
      </div>
      {showChild ? (
        <>
          {childs.map((child, index) => (
            <Link
              key={child.link}
              href={`${child.link}`}
              className="shadow-sm pl-5 py-2"
              onClick={() => toggleDrawer("left", false)}
            >
              <div className="flex items-center border-b-[1] border-gray-400 px-6 gap-1">
                <span>{child.icon}</span>
                <h2 className="text-small whitespace-nowrap">{child.title}</h2>
              </div>
            </Link>
          ))}
        </>
      ) : null}
    </>
  );
};

export default SubMenuLists;
