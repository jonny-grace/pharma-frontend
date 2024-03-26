"use client";
import * as React from "react";
import Image from "next/image";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import Groups3Icon from "@mui/icons-material/Groups3";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import SubMenuLists from "./SubMenuLists";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SearchIcon from "@mui/icons-material/Search";

export default function AdminDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
  const [members, setMemebers] = useState(false);
  const [account, setAccount] = useState(false);
  const [gifts, setGifts] = useState(false);
  const [serviceCharge, setServiceCharge] = useState(false);
  const [registrationFee, setRegistrationFee] = useState(false);
  const [Message, setMessages] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            sx={{
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <Box
              sx={{
                width: 250,
                backgroundColor: "#fff",
                height: "100%",
              }}
              role="presentation"
              onKeyDown={toggleDrawer("left", false)}
            >
              <div className="h-full w-full ">
                <section className=" pt-5">
                  <div className="flex justify-center">
                    {/* <UserAvatar
                      image={user?.user_profile?.profile_pic ?? null}
                      firstName={user?.first_name}
                      lastName={user?.last_name}
                    /> */}
                  </div>
                  <div className="grid gap-y-3 mt-5">
                    <Link
                      href="/admin/dashboard"
                      className="mt-3 shadow-sm py-2 h-min"
                      onClick={toggleDrawer("left", false)}
                    >
                      <div className="flex justify-start items-center border-b-[1] border-gray-400 px-7 gap-3">
                        <DashboardIcon />
                        <h3>Dashboard</h3>
                      </div>
                    </Link>
                    <Link
                      href="/payment-settlement"
                      className="mt-3 shadow-sm py-2 h-min"
                      onClick={toggleDrawer("left", false)}
                    >
                      <div className="flex justify-start items-center border-b-[1] border-gray-400 px-7 gap-3">
                        <ReceiptIcon />
                        <h3>Pyament settlement</h3>
                      </div>
                    </Link>
                    <Link
                      href="/pharmacy-orders"
                      className="mt-3 shadow-sm py-2 h-min"
                      onClick={toggleDrawer("left", false)}
                    >
                      <div className="flex justify-start items-center border-b-[1] border-gray-400 px-7 gap-3">
                        <ReceiptIcon />
                        <h3>Pharmacy Orders</h3>
                      </div>
                    </Link>
                    <Link
                      href="/vital-signs"
                      className="mt-3 shadow-sm py-2 h-min"
                      onClick={toggleDrawer("left", false)}
                    >
                      <div className="flex justify-start items-center border-b-[1] border-gray-400 px-7 gap-3">
                        <MedicalServicesIcon />
                        <h3>Add Vital Signs</h3>
                      </div>
                    </Link>
                    <Link
                      href="/diagnos-medicine"
                      className="mt-3 shadow-sm py-2 h-min"
                      onClick={toggleDrawer("left", false)}
                    >
                      <div className="flex justify-start items-center border-b-[1] border-gray-400 px-7 gap-3">
                        <MedicalServicesIcon />
                        <h3>diagnos-medicine</h3>
                      </div>
                    </Link>
                    <Link
                      href="/customer-search"
                      className="mt-3 shadow-sm py-2 h-min"
                      onClick={toggleDrawer("left", false)}
                    >
                      <div className="flex justify-start items-center border-b-[1] border-gray-400 px-7 gap-3">
                        <SearchIcon />
                        <h3>Customer Search</h3>
                      </div>
                    </Link>
                    <SubMenuLists
                      toggleDrawer={() => toggleDrawer("left", false)}
                      showChild={account}
                      onClick={() => setAccount(!account)}
                      icon={<PeopleIcon />}
                      title="Users"
                      childs={[
                        {
                          title: "My Account",
                          link: "/admin/profile",
                          icon: <PersonIcon />,
                        },
                        {
                          title: "Users List",
                          link: "/admin/users",
                          icon: <Groups3Icon />,
                        },
                      ]}
                    />
                    {/* Additional                {/* Additional SubMenuLists components can be added here following the same structure */}
                  </div>
                </section>
              </div>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
