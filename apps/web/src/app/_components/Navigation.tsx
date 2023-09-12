import Link from 'next/link';

interface NavigationProps {
  isAuthenticated: boolean;
}

function Navigation(props: NavigationProps) {
  const { isAuthenticated } = props;

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link href="/users" className="navigation__link">
            Community
          </Link>
        </li>
      </ul>
      <ul className="navigation__list">
        {isAuthenticated ? (
          <li className="navigation__item">
            <Link href="/profile" className="navigation__link">
              My Profile
            </Link>
            <ul className="navigation__list">
              <li className="navigation__item">
                <Link href="/logout" className="navigation__link">
                  <span className="button button--primary">Logout</span>
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          <li>
            <Link href="/login" className="navigation__link">
              <span className="button button--primary">Login</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export type { NavigationProps };
export default Navigation;
