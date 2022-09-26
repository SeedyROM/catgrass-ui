import { useMemo } from 'react'

import { commonActions } from '../actions'
import { Action } from '../types'

export const useActions = (additionalActions?: Action[]): Action[] =>
  useMemo(
    () =>
      commonActions
        .concat(additionalActions ?? [])
        // Sort alphabetically.
        .sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        ),
    [additionalActions]
  )
