'use client';

import { PropsWithChildren } from 'react';

export default function CardContainer({ children }: PropsWithChildren) {
  return (
    <div className="card">
      <div className="card-body gap-4 p-4">{children}</div>
    </div>
  );
}
