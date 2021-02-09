/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { FC } from 'react'

import { SettingsPageLayout } from '../../Components/Layouts/SettingsPageLayout'

export const PlaygroundSettingsPage: FC = () => {
  return (
    <SettingsPageLayout pageName="Playground">
      PlaygroundSettings
    </SettingsPageLayout>
  )
}
