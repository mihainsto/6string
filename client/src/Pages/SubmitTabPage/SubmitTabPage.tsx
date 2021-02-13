/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'
import React, { FC, useState } from 'react'
import { toast } from 'react-hot-toast'

import { PageLayout } from '../../Components/Layouts/PageLayout'
import { Difficulty, GuitarStyle } from '../../generated/graphql'
import { useFileUpload } from '../../Hooks/useFileUpload'

export const SubmitTabPage: FC = () => {
  const uploadFile = useFileUpload()

  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    'Enter your song details',
    'Upload Guitar Pro file',
    'Review your song inside the playground',
    'Submit your song for review',
  ]

  const [songTitle, setSongTitle] = useState('')
  const [songArtist, setSongArtist] = useState('')
  const [songDifficulty, setSongDifficulty] = useState('')
  const [songTuning, setSongTuning] = useState('')
  const [songStyle, setSongStyle] = useState('')

  const [file, setFile] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const validateSongDetails = () => {
    if (songTitle === '') {
      toast.error('You need to input the title.')
      return false
    }
    if (songArtist === '') {
      toast.error('You need to input the artist.')
      return false
    }
    if (songDifficulty === '') {
      toast.error('You need to select the difficulty.')
      return false
    }
    if (songTuning === '') {
      toast.error('You need to select the tuning.')
      return false
    }
    if (songStyle === '') {
      toast.error('You need to select the style.')
      return false
    }
    return true
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleFormCompleted = async () => {
    if (!file) return
    const response = await uploadFile(file)
    const fileId = response.public_id

    console.log(fileId)
  }

  return (
    <PageLayout>
      <div
        css={css`
          margin-top: 40px;
          display: flex;
          justify-content: center;
        `}
      >
        <div>
          <Stepper
            activeStep={activeStep}
            css={css`
              width: 1000px;
            `}
          >
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: { optional?: React.ReactNode } = {}

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>

          {activeStep === 0 && (
            <div
              css={css`
                display: flex;
                justify-content: center;
              `}
            >
              <div
                css={css`
                  width: 800px;
                `}
              >
                <div
                  css={css`
                    margin-top: 40px;
                  `}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Title"
                    fullWidth
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                  />
                </div>
                <div
                  css={css`
                    margin-top: 25px;
                  `}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Artist"
                    fullWidth
                    value={songArtist}
                    onChange={(e) => setSongArtist(e.target.value)}
                  />
                </div>
                <div
                  css={css`
                    margin-top: 25px;
                  `}
                >
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                      value={songDifficulty}
                      onChange={(e) =>
                        setSongDifficulty(e.target.value as string)
                      }
                    >
                      <MenuItem value={Difficulty.Easy}>Easy</MenuItem>
                      <MenuItem value={Difficulty.Medium}>Medium</MenuItem>
                      <MenuItem value={Difficulty.Hard}>Hard</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div
                  css={css`
                    margin-top: 25px;
                  `}
                >
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Tuning</InputLabel>
                    <Select
                      value={songTuning}
                      onChange={(e) => setSongTuning(e.target.value as string)}
                    >
                      <MenuItem value="STANDARD">Standard</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div
                  css={css`
                    margin-top: 25px;
                  `}
                >
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Style</InputLabel>
                    <Select
                      value={songStyle}
                      onChange={(e) => setSongStyle(e.target.value as string)}
                    >
                      <MenuItem value={GuitarStyle.Strum}>Strum</MenuItem>
                      <MenuItem value={GuitarStyle.Fingerpick}>
                        Fingerpick
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div
                  css={css`
                    margin-top: 35px;
                  `}
                >
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (validateSongDetails()) handleNext()
                    }}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div
              css={css`
                margin-top: 40px;
              `}
            >
              <DropzoneArea
                filesLimit={1}
                // onSave={handleSave}
                acceptedFiles={['.gp5']}
                showPreviews={true}
                maxFileSize={5000000}
                onChange={(files) => {
                  if (files.length === 1) {
                    setFile(files[0])
                  } else {
                    setFile(undefined)
                  }
                }}
              />
              <div
                css={css`
                  margin-top: 35px;
                `}
              >
                <Button onClick={handleBack}>Back</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleNext()
                    setLoading(true)
                    handleFormCompleted()
                  }}
                  disabled={!file}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div
              css={css`
                margin-top: 40px;
              `}
            >
              {loading && (
                <div>
                  <Typography>
                    Please wait, we are processing your song!
                  </Typography>
                  <CircularProgress
                    size={100}
                    css={css`
                      margin-top: 25px;
                    `}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
