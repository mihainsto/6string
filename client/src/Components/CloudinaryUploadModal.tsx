/** @jsxImportSource @emotion/react **/

import { css } from '@emotion/react'
import { DropzoneDialog } from 'material-ui-dropzone'
import React, { useState } from 'react'
import { FC } from 'react'

import { useFileUpload } from '../Hooks/useFileUpload'

type CloudinaryUploadModalProps = {
  open: boolean
  onSubmit: (cloudinaryId: string) => void
  onClose: () => void
}
export const CloudinaryUploadModal: FC<CloudinaryUploadModalProps> = ({
  open,
  onSubmit,
  onClose,
}) => {
  const uploadFile = useFileUpload()
  const handleSave = async (files: File[]) => {
    const response = await uploadFile(files[0])
    onSubmit(response.public_id)
  }

  return (
    <div>
      <DropzoneDialog
        filesLimit={1}
        dialogTitle={'Upload Image'}
        open={open}
        onSave={handleSave}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={onClose}
      />
    </div>
  )
}
