// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as ChordIllustrator from 'chord-illustrator'

import { Chord } from '../Babylon/types'

export const useChordIllustrator = () => {
  const ci = new ChordIllustrator(document.createElement('div'))

  const createChordSvg = (chord?: Chord): string => {
    const fingering = [
      chord &&
        chord.e && {
          fret: chord.e,
          string: 1,
        },
      chord && chord.B && { fret: chord.B, string: 2 },
      chord && chord.G && { fret: chord.G, string: 3 },
      chord && chord.D && { fret: chord.D, string: 4 },
      chord && chord.A && { fret: chord.A, string: 5 },
      chord && chord.E && { fret: chord.E, string: 6 },
      !chord && { fret: -1, string: 1 },
    ]
    const svg = ci.make({
      name: '',
      mutedStrings: ['no'],
      fingering: fingering.filter((e) => !!e),
    })

    return svg.toString()
  }
  return createChordSvg
}
