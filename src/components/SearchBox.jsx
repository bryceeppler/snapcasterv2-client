import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  singleCardResults,
  hideWelcomeMessage,
  sortedByAtom,
  sortOrderAtom,
  filteredSingleCardResults
} from '../atoms';
import axios from 'axios';
import { sortResults } from '../utils';

export default function SearchBox({ setSearchTerm }) {
  const dummydata = [
    {
      id: 1,
      name: 'Dockside Extortionist',
      set: 'Core Set 2021',
      price: 54.99,
      image:
        'https://cards.scryfall.io/png/front/5/7/571bc9eb-8d13-4008-86b5-2e348a326d58.png?1615499802',
      store: '401 Games',
      condition: 'NM',
      link: 'https://store.401games.ca/pages/search-results?q=dockside+extortionist',
    },
    {
      id: 2,
      name: 'Dockside Extortionist',
      set: 'Core Set 2021',
      price: 54.99,
      image:
        'https://cards.scryfall.io/png/front/5/7/571bc9eb-8d13-4008-86b5-2e348a326d58.png?1615499802',
      store: '401 Games',
      condition: 'NM',
      link: 'https://store.401games.ca/pages/search-results?q=dockside+extortionist',
    },
    {
      id: 3,
      name: 'Dockside Extortionist',
      set: 'Core Set 2021',
      price: 54.99,
      image:
        'https://cards.scryfall.io/png/front/5/7/571bc9eb-8d13-4008-86b5-2e348a326d58.png?1615499802',
      store: '401 Games',
      condition: 'NM',
      link: 'https://store.401games.ca/pages/search-results?q=dockside+extortionist',
    },
    {
      id: 4,
      name: 'Dockside Extortionist',
      set: 'Core Set 2021',
      price: 54.99,
      image:
        'https://cards.scryfall.io/png/front/5/7/571bc9eb-8d13-4008-86b5-2e348a326d58.png?1615499802',
      store: '401 Games',
      condition: 'NM',
      link: 'https://store.401games.ca/pages/search-results?q=dockside+extortionist',
    },
    {
      id: 5,
      name: 'Dockside Extortionist',
      set: 'Core Set 2021',
      price: 54.99,
      image:
        'https://cards.scryfall.io/png/front/5/7/571bc9eb-8d13-4008-86b5-2e348a326d58.png?1615499802',
      store: '401 Games',
      condition: 'NM',
      link: 'https://store.401games.ca/pages/search-results?q=dockside+extortionist',
    },
    {
      id: 6,
      name: 'Dockside Extortionist',
      set: 'Core Set 2021',
      price: 54.99,
      image:
        'https://cards.scryfall.io/png/front/5/7/571bc9eb-8d13-4008-86b5-2e348a326d58.png?1615499802',
      store: '401 Games',
      condition: 'NM',
      link: 'https://store.401games.ca/pages/search-results?q=dockside+extortionist',
    },
  ];

  const sortedBy = useAtomValue(sortedByAtom);
  const sortOrder = useAtomValue(sortOrderAtom);

  const [cardName, setCardName] = React.useState('');
  const [results, setResults] = useAtom(singleCardResults);
  const [hideWelcome, setHideWelcome] = useAtom(hideWelcomeMessage);
  const [loading, setLoading] = React.useState(false);
  const [filteredResults, setFilteredResults] = useAtom(filteredSingleCardResults);

  const handleSubmit = e => {
    e.preventDefault();
    // query the API using POST to /search/single
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_API_URI}/search/single/`, {
        cardName,
        websites: [
          'four01',
          'gauntlet',
          'fusion',
          'houseofcards',
          'kanatacg',
          'everythinggames',
          'magicstronghold',
          'facetoface',
          'connectiongames',
          'topdeckhero',
          'jeux3dragons',
        ],
      })
      .then(res => {
        // Set the raw results to the atom
        setResults(res.data);
        // Sort the results and set the shown FilteredResults
        const sortedResults = sortResults(res.data, sortedBy, sortOrder);
        setFilteredResults(sortedResults);
        setHideWelcome(true);
        setSearchTerm(cardName);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  // test
  return (
    <div className="mt-5">
      <form
        className="flex flex-row space-x-2 justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="card_search"
          className="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary outline-none"
          placeholder="Search for a card"
          required
          onChange={e => {
            // we want to setCardName(e.target.value) but we need to replace any
            // iOS apostrophes with regular apostrophes
            const cardName = e.target.value.replace(/’/g, "'");
            setCardName(cardName);
          }}
          // no autocomplete
          autoComplete="off"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {/* Loading spinner */}
      {/* Center the content horizontally */}
      {loading && (
        <div role="status" className="flex justify-center mt-5">
          <svg
            className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}
