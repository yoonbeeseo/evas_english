import {
  IoBusinessOutline,
  IoEaselOutline,
  IoGridOutline,
  IoPeopleOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router";
import { useAtuh } from "../../providers/contexts/Auth.use";
import { twMerge } from "tailwind-merge";

const menus = [
  { name: "학생관리", Icon: IoSchoolOutline, to: "students" },
  { name: "학교관리", Icon: IoBusinessOutline, to: "schools" },
  { name: "대쉬보드", Icon: IoGridOutline, to: "/admin" },
  { name: "클래스관리", Icon: IoEaselOutline, to: "lessons" },
  { name: "학부모관리", Icon: IoPeopleOutline, to: "parents" },
];

const AdminLayout = () => {
  const { user } = useAtuh();
  const { pathname } = useLocation();

  return (
    <>
      <Outlet />
      {user && (
        <nav className="fixed bottom-0 left-0 w-full border-t bg-white dark:bg-black flex">
          {menus.map((menu) => (
            <Link
              to={`${menu.to}?bizinfo_id=${user.bizinfos[0].id}`}
              key={menu.to}
              className={twMerge(
                "flex-1 flex-col items-center text-Gray py-2 bg-transparent hover:text-primary gap-1",
                (menu.name === "대쉬보드"
                  ? pathname === "/admin"
                  : pathname.includes(menu.to)) && "text-primary"
              )}
            >
              <menu.Icon className="text-xl" />
              <p className="text-xs">{menu.name}</p>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default AdminLayout;
