'use client';

import { PropsWithChildren } from 'react';

export default function CardContainer({ children }: PropsWithChildren) {
  return (
    <div className="card rounded-none">
      <div className="card-body p-4">{children}</div>
    </div>
  );
}
