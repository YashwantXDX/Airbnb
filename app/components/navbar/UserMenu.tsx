"use client";
import Avatar from "../Avatar";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModel from "@/app/hooks/useRentModel";
import { signOut } from "next-auth/react";
// import { SafeUser } from "@/app/types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  // currentUser? : SafeUser | null
  currentUser?: User | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const rentModal = useRentModel();
  const [isOpen, setisOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setisOpen((value) => !value);
  }, []);

  console.log(currentUser);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return LoginModal.onOpen();
    }
    //open Rent Modal
    rentModal.onOpen();
  }, [currentUser, LoginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer"
        >
          CozyHut your home
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition

                "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem onClick={() => router.push('/favorites')} label="My Favorites" />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My Reservations"
                />
                <MenuItem onClick={() => {}} label="My Properties" />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label="CozyHut your Home"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={LoginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
