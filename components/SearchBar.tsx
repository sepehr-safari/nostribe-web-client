'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { throttle } from 'lodash';
import { BaseAvatar } from '@/components/Avatar';

type SearchResult = [
  followerCount: number,
  metaDataEvent: {
    id: string;
    kind: number;
    pubkey: string;
    tags: string[];
    created_at: number;
    content: any;
    sig: string;
  },
  npub: string
];

const MAX_ABOUT_LENGTH = 50;

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([] as SearchResult[]);
  const [searchTerm, setSearchTerm] = useState(''); // Add state for the search term
  const [focusedIndex, setFocusedIndex] = useState(-1); // Add state for the focused index
  const inputRef = useRef<HTMLInputElement>(null); // Add ref for the input element

  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement[]>([]);

  const handleArrowKeys = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (searchResults.length === 0 && event.key === 'ArrowDown') {
        setFocusedIndex(-1);
        return;
      }

      if (event.key === 'ArrowDown') {
        const nextIndex =
          focusedIndex + 1 >= searchResults.length ? -1 : focusedIndex + 1;
        setFocusedIndex(nextIndex);
      } else if (event.key === 'ArrowUp') {
        const prevIndex =
          focusedIndex - 1 < -1 ? searchResults.length - 1 : focusedIndex - 1;
        setFocusedIndex(prevIndex);
      }
    },
    [searchResults, focusedIndex]
  );

  const selectResult = useCallback(
    (index: number) => {
      setSearchTerm('');
      setSearchResults([]);
      if (index === -1) {
        router.push(`/search/${searchTerm}`);
      } else {
        const npub = searchResults[index][2];
        router.push(`/${npub}`);
      }
    },
    [searchResults, searchTerm, router]
  );

  useEffect(() => {
    if (searchResults.length > 0) {
      setFocusedIndex(-1); // Set the focused index to the first result
    } else {
      setFocusedIndex(-1); // Reset the focused index when there are no results
    }
  }, [searchResults]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const shortcutKey = isMac ? event.metaKey : event.ctrlKey;

    if (event.key === 'Escape') {
      setSearchTerm('');
      setSearchResults([]);
    } else if (event.key === 'Enter') {
      selectResult(focusedIndex);
    } else if (event.key === '/' || (event.key === 'k' && shortcutKey)) {
      if (
        event.target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)
      ) {
        return;
      }
      event.preventDefault();
      inputRef.current?.focus();
    } else {
      handleArrowKeys(event);
    }
  };

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchTerm(value); // Update search term when typing
    throttledSearch(value); // Call throttled search function
  };

  const throttledSearch = useCallback(
    throttle(async (value: string) => {
      value = value.trim().toLowerCase();
      try {
        let data: any = await Promise.race([
          new Promise(async (resolve) => {
            const r = await fetch(`https://eu.rbr.bio/search/${value}.json`);
            const data = await r.json();
            resolve(data);
          }),
          new Promise((resolve) => setTimeout(() => resolve(null), 1000)),
        ]);
        if (data === null) {
          const res = await fetch(`https://us.rbr.bio/search/${value}.json`);
          data = await res.json();
        }
        data.forEach((result: SearchResult) => {
          const [_, event, __] = result;
          event.content = JSON.parse(event.content);
        });
        setSearchResults(data);
      } catch (err) {
        console.log(err);
      }
    }, 300),
    []
  );

  return (
    <div className="relative">
      <input
        ref={inputRef}
        onInput={onInput}
        onKeyDown={handleKeyDown}
        value={searchTerm}
        type="text"
        placeholder="Search ..."
        className="input-bordered input input-sm w-full"
      />
      {(searchResults.length > 0 || searchTerm.length > 0) && (
        <div className="absolute z-20 left-0 mt-2 w-full bg-black border border-neutral-700 rounded shadow-lg">
          <div
            className={`p-2 cursor-pointer flex items-center ${
              focusedIndex === -1 ? 'bg-neutral-700' : ''
            }`}
            onClick={() => selectResult(-1)}
          >
            <div className="ml-2">
              <div className="text-white">{searchTerm}</div>
              <div className="text-neutral-400 text-sm">Search posts</div>
            </div>
          </div>
          {searchResults.map(([_, result, npub], index) => (
            <div
              key={result.id}
              ref={(el) => {
                resultsRef.current[index] = el as HTMLDivElement;
              }}
              tabIndex={0}
              className={`p-2 cursor-pointer flex items-center ${
                index === focusedIndex ? 'bg-neutral-700' : ''
              }`}
              onClick={() => selectResult(index)}
            >
              <BaseAvatar url={result.content.picture} />
              <div className="ml-2">
                <div className="text-white">
                  {result.content.display_name || result.content.name}
                </div>
                <div className="text-neutral-400 text-sm">
                  {result.content.about?.length > MAX_ABOUT_LENGTH
                    ? result.content.about.slice(0, MAX_ABOUT_LENGTH) + '...'
                    : result.content.about}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
