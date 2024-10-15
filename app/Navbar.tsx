import Link from "next/link";

type NavbarPropsT = {
    title: string,
}

const Navbar = (props: NavbarPropsT) => {
  return (
        <nav>
            <Link href="/">{props.title}</Link>
            <Link href="/brann">brann</Link>
        </nav>
  )
};

export default Navbar
