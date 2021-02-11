/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { FC, useState } from 'react'

import { PageLayout } from '../../Components/Layouts/PageLayout'

export const SubmitTabPage: FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const steps = [
    'Enter your song details',
    'Upload Guitar Pro file',
    'Review your song inside the playground',
    'Submit your song for review',
  ]

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
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
          <div>
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <TextField variant="outlined" size="small" label="Title" />
            </div>
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <TextField variant="outlined" size="small" label="Artist" />
            </div>
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <TextField variant="outlined" size="small" label="Difficulty" />
            </div>

            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <TextField variant="outlined" size="small" label="Tuning" />
            </div>

            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <TextField variant="outlined" size="small" label="Style" />
            </div>

            <div
              css={css`
                margin-top: 25px;
              `}
            >
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
