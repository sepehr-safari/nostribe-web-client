"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { throttle } from 'lodash';
import Avatar from '@/components/Avatar';

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
export default function Searchbar() {
  const [searchResults, setSearchResults] = useState([] as SearchResult[]);
  const [searchTerm, setSearchTerm] = useState(''); // Add state for the search term

  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement[]>([]);

  const handleArrowKeys = useCallback(
    (event: KeyboardEvent) => {
      if (searchResults.length === 0) return;

      const focusedIndex = resultsRef.current.findIndex((el) => el === document.activeElement);
      if (event.key === 'ArrowDown') {
        const nextIndex = (focusedIndex + 1) % searchResults.length;
        resultsRef.current[nextIndex].focus();
      } else if (event.key === 'ArrowUp') {
        const prevIndex = (focusedIndex - 1 + searchResults.length) % searchResults.length;
        resultsRef.current[prevIndex].focus();
      }
    },
    [searchResults],
  );

  const selectResult = useCallback((index: number) => {
    setSearchTerm('');
    const npub = searchResults[index][2];
    router.push(`/profile/${npub}`);
  }, [searchResults]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchResults([]);
      } else if (event.key === 'Enter') {
        const focusedIndex = resultsRef.current.findIndex((el) => el === document.activeElement);
        if (focusedIndex !== -1) {
          selectResult(focusedIndex);
        }
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
        const res = await fetch(`https://eu.rbr.bio/search/${value}.json`);
        const data = await res.json();
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
        onInput={onInput}
        value={searchTerm}
        type="text"
        placeholder="Search ..."
        className="input-bordered rounded-full input input-sm w-full"
      />
      {searchResults.length > 0 && searchTerm.length > 0 && (
        <div className="absolute z-20 left-0 mt-2 w-full bg-gray-800 border border-gray-700 divide-y divide-gray-600 rounded shadow-lg">
          {searchResults.map(([_, result, npub], index) => (
            <div
              key={result.id}
              ref={(el) => {
                resultsRef.current[index] = el as HTMLDivElement;
              }}
              tabIndex={0}
              className="p-2 hover:bg-gray-700 cursor-pointer flex items-center"
              onFocus={() => {
                resultsRef.current[index].classList.add('bg-gray-700');
              }}
              onBlur={() => {
                resultsRef.current[index].classList.remove('bg-gray-700');
              }}
              onClick={() => selectResult(index)}
            >
              <Avatar url={result.content.picture} />
              <div className="ml-2">
                <div className="text-white">{result.content.name}</div>
                <div className="text-gray-400 text-sm">{result.content.about}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
