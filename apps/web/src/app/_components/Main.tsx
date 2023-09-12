import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

function Main(props: MainProps) {
  return <main className="main" {...props} />;
}

export type { MainProps };
export default Main;
