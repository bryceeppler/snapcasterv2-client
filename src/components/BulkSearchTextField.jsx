import React from 'react'
import { useAtom } from 'jotai'
import { bulkCardInputAtom } from '../atoms'

export default function BulkSearchTextField() {
    const [bulkCardInput, setBulkCardInput] = useAtom(bulkCardInputAtom)

  return (
    <div>
        <div className="flex flex-col p-2">
            <label className="text-sm font-bold mb-2">
                Enter card names, one per line
            </label>
            {/* Create a text area with max 100 lines, but only show 20 lines at a time */}
            <div className="flex flex-col">
                {/* max number of lines we will accept is 100 */}
                <textarea
                    className="w-full rounded-md border border-gray-300 dark:border-darkBackground dark:bg-darkerBackground"
                    value={bulkCardInput}
                    rows="20"
                    onChange={(e) => {
                        // we want setBulkCardInput(e.target.value)}
                        // but we need to limit the number of lines to 100
                        // and replace any iOS apostrophes with regular apostrophes
                        const lines = e.target.value.split('\n')
                        if (lines.length > 100) {
                            return
                        }
                        const newBulkCardInput = lines
                            .map((line) => line.replace(/’/g, "'"))
                            .join('\n')
                        setBulkCardInput(newBulkCardInput)
                    }}
                />
                </div>
            </div>

    </div>
  )
}
