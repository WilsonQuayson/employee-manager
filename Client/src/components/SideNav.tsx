import DepartmentsIcon from "../assets/icons/DepartmentsIcon";
import EmployeesIcon from "../assets/icons/EmployeesIcon";
import SettingsIcon from "../assets/icons/SettingsIcon";
import WindowIcon from "../assets/icons/WindowIcon";
import NavItem from "./NavItem";
import { useCurrentUser } from "../hooks/useAuth";

const menuItemsOne = [
    { label: "Dashboard", icon: WindowIcon, to: "/" },
    { label: "Employees", icon: EmployeesIcon, to: "employees" },
    { label: "Departments", icon: DepartmentsIcon, to: "departments" }
];

const menuItemsTwo = [
    { label: "Settings", icon: SettingsIcon, to: "#" }
];

const SideNav = () => {
    const { data: user } = useCurrentUser();

    const organizationInitials = user?.organizationName
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "HR";

    return (
        <section className="p-3 border-r border-border w-60 h-screen bg-secondary">
            <section className="flex gap-2 items-center">
                <div className="flex shrink-0 items-center justify-center rounded-full bg-green-700 size-8">
                    <p className="text-white text-xs">{organizationInitials}</p>
                </div>
                <div className="min-w-0 text-xs">
                    <h1 className="font-medium truncate" title={user?.organizationName}>
                        {user?.organizationName ?? "Employee Manager"}
                    </h1>
                    <p>Workforce suite</p>
                </div>
            </section>

            <nav className="mt-8">
                <ul>
                    <li className="px-2 text-muted-foreground text-xs">
                        <span>Workspace</span>
                    </li>
                    {menuItemsOne.map((item) => (
                        <NavItem key={item.label} {...item} />
                    ))}
                </ul>

                <ul className="mt-6">
                    <li className="px-2 text-muted-foreground text-xs">
                        <span>Operations</span>
                    </li>
                    {menuItemsTwo.map((item) => (
                        <NavItem key={item.label} {...item} />
                    ))}
                </ul>
            </nav>
        </section>
    );
};

export default SideNav;
