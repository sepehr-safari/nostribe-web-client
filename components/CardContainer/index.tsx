import { PropsWithChildren } from 'react';

export default function CardContainer({ children }: PropsWithChildren) {
  return (
    <div className="card bg-gradient-to-r from-base-200 to-base-100 shadow-lg shadow-black">
      {children}
    </div>
  );
}
