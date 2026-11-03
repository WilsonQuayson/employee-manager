import { NavLink } from "react-router-dom";

type BreadcrumbProps = {
    page: string;
    parent?: {
        label: string;
        path: string;
    };
};

const Breadcrumb = ({ page, parent }: BreadcrumbProps) => {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-4 text-sm">
            <NavLink to="/" className="text-ring hover:text-emerald-600">
                Northwind
            </NavLink>

            <span className="text-ring">{'>'}</span>

            {parent && (
                <>
                    <NavLink to={parent.path} className="text-ring hover:text-emerald-600">
                        {parent.label}
                    </NavLink>
                    <span className="text-ring">{'>'}</span>
                </>
            )}

            <span aria-current="page">{page}</span>
        </nav>
    );
};

export default Breadcrumb;
