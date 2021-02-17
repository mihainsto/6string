/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react'
import { CardHeader, IconButton } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { Close } from '@material-ui/icons'
import { FC } from 'react'
import Draggable from 'react-draggable'
import SVG from 'react-inlinesvg'

import { useChordStore } from '../../../App'
import { useUpdatePlaygroundSettingsMutation } from '../../../generated/graphql'
import { useChordIllustrator } from '../../../Hooks/useChordIllustrator'
import { useIsLoggedIn } from '../../../Hooks/useIsLoggedIn'
import { useThemeStore } from '../../../State/ThemeState'

type CurrentChordWidgetProps = {
  page?: 'SONGPLAY' | 'PLAYGROUND'
}
export const CurrentChordWidget: FC<CurrentChordWidgetProps> = ({ page }) => {
  const createChordSvg = useChordIllustrator()
  const themeType = useThemeStore((state) => state.theme)
  const chord = useChordStore((state) => state.currentChord)
  const svg = createChordSvg(chord)

  const [
    updatePlaygroundSettingsMutation,
  ] = useUpdatePlaygroundSettingsMutation()
  const loggedIn = useIsLoggedIn()
  return (
    <Draggable>
      <Card
        css={css`
          width: 320px;
          height: 230px;
          position: absolute;
          bottom: ${page === 'PLAYGROUND' ? `20px` : `300px`};
          right: 20px;
        `}
        elevation={0}
      >
        <CardHeader
          css={css`
            margin-bottom: -30px;
          `}
          action={
            loggedIn && (
              <IconButton
                size="small"
                onClick={() =>
                  updatePlaygroundSettingsMutation({
                    variables: {
                      input: {
                        playgroundSettings: {
                          chordWidget: false,
                        },
                      },
                    },
                  })
                }
              >
                <Close />
              </IconButton>
            )
          }
        />
        <div
          css={css`
            filter: ${themeType === 'DARK' ? `invert(1)` : `invert(0)`};
          `}
        >
          <SVG src={svg} width={300} height="auto" />
        </div>
      </Card>
    </Draggable>
  )
}
