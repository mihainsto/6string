/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { Card, CardContent, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import Modal from 'react-modal'

type PlaygroundInformationModalProps = {
  open: boolean
  onClose: () => void
}
export const PlaygroundInformationModal: FC<PlaygroundInformationModalProps> = ({
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
          <Typography variant="h5">Information</Typography>
          <div
            css={css`
              margin-top: 10px;
            `}
          >
            <Typography variant="subtitle1">
              Use arrow keys for camera movement
            </Typography>
            <Typography variant="subtitle1">
              Use Q W E A S D keys for string playing
            </Typography>
            <Typography variant="subtitle1">
              Use the chord selector to select the chord
            </Typography>
            <Typography variant="subtitle1">
              To change the chord selector tab use scroll
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Modal>
  )
}
