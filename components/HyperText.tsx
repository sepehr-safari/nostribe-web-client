import React from 'react';
import reactStringReplace from 'react-string-replace';

import { allEmbeds } from './embed';

const HyperText = ({ children }: { children: string }) => {
  let processedChildren: React.ReactNode[] = [children];

  allEmbeds.forEach((embed) => {
    processedChildren = reactStringReplace(processedChildren, embed.regex, (match, i) => {
      console.log('match', match);
      return embed.component({ match, index: i })
    }) as React.ReactNode[];
  });

  return <>{processedChildren}</>;
};

export default HyperText;
