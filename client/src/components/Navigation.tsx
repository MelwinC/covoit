const Navigation = () => {
  const pathname = window.location.pathname;
  const isAuthPage = pathname === "/auth" || pathname === "/login";

  if (isAuthPage) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-12">
          <a href="/" className="font-semibold text-lg">
            AlloCovoit
          </a>
          <ul className="flex items-center gap-6">
            <li>
              <a href="/">Trajet</a>
            </li>
            <li>
              <a href="/">Mes trajets</a>
            </li>
            <li>
              <a href="/">Messages</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <a
            href="/auth"
            className="text-white px-4 py-2.5 bg-black text-sm rounded-md"
          >
            Connexion
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
