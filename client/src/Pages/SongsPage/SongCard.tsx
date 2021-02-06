/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  colors,
  Typography,
} from '@material-ui/core'
import { PlayCircleOutline } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { useState } from 'react'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Song } from '../../generated/graphql'

type SongCardProps = {
  song: Song
}
export const SongCard: FC<SongCardProps> = ({ song }) => {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const history = useHistory()

  return (
    <Accordion
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      expanded={expanded}
      onClick={(event) => {
        setExpanded(!expanded)
        event.stopPropagation()
      }}
      css={css`
        &:hover {
          background: ${colors.grey[100]} !important;
        }
        background: ${expanded ? colors.grey[100] : 'white'} !important;
      `}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
      >
        <Typography
          css={css`
            flex-basis: 5%;
            align-self: center;
          `}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          {(expanded || hovered) && (
            <PlayCircleOutline
              css={css`
                color: ${colors.grey[500]};
                &:hover {
                  color: ${colors.grey[700]};
                  font-size: 33px;
                  margin-top: -3px;
                }
              `}
              onClick={() => history.push(`/playsong/${song.id}`)}
            />
          )}
        </Typography>
        <Typography
          css={css`
            flex-basis: 33%;
          `}
        >
          {song.title}
        </Typography>
        <Typography
          css={css`
            flex-basis: 33%;
          `}
          color={'textSecondary'}
        >
          {song.artist}
        </Typography>
        <Typography color={'textSecondary'}>{song.difficulty}</Typography>
      </AccordionSummary>
      <AccordionDetails
        css={css`
          flex-direction: column;
        `}
      >
        <Typography color={'textSecondary'}>Tuning: {song.tuning}</Typography>
        <Typography color={'textSecondary'}>Style: {song.style}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}
