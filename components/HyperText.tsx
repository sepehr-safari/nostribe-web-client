import React, { memo } from 'react';
import reactStringReplace from 'react-string-replace';
import { Event } from "nostr-tools";

import { allEmbeds } from './embed';

const HyperText = memo(({ children, event }: { children: string, event?: Event }) => {
  let processedChildren: React.ReactNode[] = [children];

  allEmbeds.forEach((embed) => {
    processedChildren = reactStringReplace(processedChildren, embed.regex, (match, i) => {
      console.log('match', match);
      return embed.component({ match, index: i, event })
    }) as React.ReactNode[];
  });

  return <>{processedChildren}</>;
});

HyperText.displayName = 'HyperText';

export default HyperText;
