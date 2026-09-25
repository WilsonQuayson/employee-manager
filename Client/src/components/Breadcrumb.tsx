import { NavLink } from "react-router-dom";

type BreadcrumbProms = {
    page: string;
}

const Breadcrumb = ({page}: BreadcrumbProms) => {
    return(
        <section className="flex gap-4">
            <NavLink to={"/"} className="text-ring">Northwind</NavLink>
            <p className="text-ring">{'>'}</p>
            <p>{page}</p>
        </section>
    )
}

export default Breadcrumb;