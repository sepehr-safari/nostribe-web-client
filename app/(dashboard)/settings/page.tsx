import Link from 'next/link';

export default function Settings() {
  return (<div className="prose">
    <h2>Account</h2>
    <p>
      <Link href="/logout" className="btn btn-primary rounded-full capitalize">
        Log out
      </Link>
    </p>
  </div>);
}
