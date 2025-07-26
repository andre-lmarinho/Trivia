import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import type { Category } from '../../types';

interface Props {
  categories: Category[];
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export default function CategorySelector({ categories, value, onChange, error }: Props) {
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? categories
      : categories.filter((cat) => cat.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-[var(--text-color)]">Category</label>
      <Combobox<number>
        value={value}
        onChange={(val) => {
          if (val !== null) onChange(val);
        }}
      >
        <div className="relative bg-[var(--border-color)]">
          <Combobox.Input
            className="w-full rounded border border-[var(--border-color)] bg-transparent p-2 text-sm font-medium text-[var(--text-color)] placeholder:text-[var(--text-color)]"
            displayValue={(cat) => categories.find((c) => c.id === cat)?.name || ''}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Any Category"
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-20 mt-1 max-h-40 w-full overflow-auto rounded border border-[var(--border-color)] bg-[var(--content-bg)]">
              <Combobox.Option
                key={0}
                value={0}
                className={({ active, selected }) =>
                  `cursor-pointer px-3 py-2 text-sm ${
                    active ? 'bg-blue-100' : ''
                  } ${selected ? 'font-semibold' : ''}`
                }
              >
                Any Category
              </Combobox.Option>
              {filtered.map((cat) => (
                <Combobox.Option
                  key={cat.id}
                  value={cat.id}
                  className={({ active, selected }) =>
                    `cursor-pointer px-3 py-2 text-sm ${
                      active ? 'bg-blue-100' : ''
                    } ${selected ? 'font-semibold' : ''}`
                  }
                >
                  {cat.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
