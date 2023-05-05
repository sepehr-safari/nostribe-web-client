"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
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
  npub: string,
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
    (event: KeyboardEvent) => {
      if (searchResults.length === 0) return;

      if (event.key === 'ArrowDown') {
        const nextIndex = (focusedIndex + 1) % searchResults.length;
        setFocusedIndex(nextIndex);
      } else if (event.key === 'ArrowUp') {
        const prevIndex = (focusedIndex - 1 + searchResults.length) % searchResults.length;
        setFocusedIndex(prevIndex);
      }
    },
    [searchResults, focusedIndex],
  );

  const selectResult = useCallback((index: number) => {
    setSearchTerm('');
    const npub = searchResults[index][2];
    router.push(`/profile/${npub}`);
  }, [searchResults]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setFocusedIndex(0); // Set the focused index to the first result
    } else {
      setFocusedIndex(-1); // Reset the focused index when there are no results
    }
  }, [searchResults]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const shortcutKey = isMac ? event.metaKey : event.ctrlKey;

      if (event.key === 'Escape') {
        setSearchResults([]);
      } else if (event.key === 'Enter') {
        if (focusedIndex !== -1) {
          selectResult(focusedIndex);
        }
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

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleArrowKeys, searchResults, router]);

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchTerm(value); // Update search term when typing
    throttledSearch(value); // Call throttled search function
  };

  const throttledSearch = useCallback(
    throttle(async (value: string) => {
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
    [],
  );

    return (
    <div className="relative">
      <input
        ref={inputRef}
        onInput={onInput}
        value={searchTerm}
        type="text"
        placeholder="Search ..."
        className="input-bordered input input-sm w-full"
      />
      {searchResults.length > 0 && searchTerm.length > 0 && (
        <div className="absolute z-20 left-0 mt-2 w-full bg-black border border-gray-700 rounded shadow-lg">
          {searchResults.map(([_, result, npub], index) => (
            <div
              key={result.id}
              ref={(el) => {
                resultsRef.current[index] = el as HTMLDivElement;
              }}
              tabIndex={0}
              className={`p-2 cursor-pointer flex items-center ${
                index === focusedIndex ? 'bg-gray-700' : ''
              }`}
              onClick={() => selectResult(index)}
            >
              <BaseAvatar url={result.content.picture} />
              <div className="ml-2">
                <div className="text-white">{result.content.display_name || result.content.name}</div>
                <div className="text-gray-400 text-sm">
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
