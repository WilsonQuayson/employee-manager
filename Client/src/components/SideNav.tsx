import DepartmentsIcon from "../assets/icons/DepartmentsIcon";
import EmployeesIcon from "../assets/icons/EmployeesIcon";
import ReportsIcon from "../assets/icons/ReportsIcon";
import SettingsIcon from "../assets/icons/SettingsIcon";
import WalletIcon from "../assets/icons/WalletIcon";
import WindowIcon from "../assets/icons/WindowIcon";
import NavItem from "./NavItem";

const menuItemsOne = [
    { label: "Dashboard", icon: WindowIcon, to: "#" },
    { label: "Employees", icon: EmployeesIcon, to: "#" },
    { label: "Departments", icon: DepartmentsIcon, to: "#" }
];

const menuItemsTwo = [
    { label: "Payroll", icon: WalletIcon, to: "#" },
    { label: "Reports", icon: ReportsIcon, to: "#" },
    { label: "Settings", icon: SettingsIcon, to: "#" }
];

const SideNav = () => {
    return(
        <section className="p-3 border-r border-border w-60 h-screen bg-secondary">
            <section className="flex gap-2 items-center">
                <div className="flex items-center justify-center rounded-full bg-green-700 size-8">
                    <p className="text-white text-xs">HR</p>
                </div>
                <div className="text-xs">
                    <h1 className="font-medium">Northwind HR</h1>
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
    )
}

export default SideNav;