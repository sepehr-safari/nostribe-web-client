import Link from 'next/link';

export default function Settings() {
  return (
    <div className="prose p-2">
      <h2>Account</h2>
      <p>
        <Link href="/logout" className="btn btn-primary">
          Log out
        </Link>
      </p>
    </div>
  );
}
