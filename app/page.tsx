import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>this is home</h1>
      <div className="row">
        <Link href={"/admin/blanks"}>Blanks</Link>
        <Link href={"/admin"}>Admin</Link>
      </div>
    </div>
  );
}
