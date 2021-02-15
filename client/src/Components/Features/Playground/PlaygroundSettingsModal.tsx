/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Card, CardContent } from '@material-ui/core'
import React, { FC } from 'react'
import Modal from 'react-modal'

import { PlaygroundSettingsCardContent } from '../../../Pages/Settings/PlaygroundSettingsPage'

type PlaygroundSettingsModalProps = {
  open: boolean
  onClose: () => void
}
export const PlaygroundSettingsModal: FC<PlaygroundSettingsModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      style={{
        overlay: {
          backgroundColor: 'none',
        },
      }}
      isOpen={open}
      onRequestClose={() => onClose()}
      css={css`
        width: 600px;
        margin: 15% auto auto auto;
        border: none;
        outline: none;
      `}
    >
      <Card>
        <CardContent>
          <PlaygroundSettingsCardContent />
        </CardContent>
      </Card>
    </Modal>
  )
}
