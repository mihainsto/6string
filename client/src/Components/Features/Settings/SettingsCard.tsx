/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Button, Card, CardContent, useTheme } from '@material-ui/core'
import React, { FC, ReactElement } from 'react'

type SettingsCardProps = {
  actions?: ReactElement
}

export const SettingsCard: FC<SettingsCardProps> = ({ actions, children }) => {
  const theme = useTheme()

  return (
    <Card
      variant="outlined"
      css={css`
        width: 900px;
      `}
    >
      <CardContent
        css={css`
          text-align: left;
        `}
      >
        {children}

        <div
          css={css`
            margin-top: 15px;
            border-top: 1px solid ${theme.palette.divider};
            padding-top: 15px;
            display: flex;
            justify-content: space-between;
          `}
        >
          <div />
          <div
            css={css`
              display: flex;
              gap: 10px;
            `}
          >
            {actions}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
