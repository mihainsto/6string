const url = 'https://api.cloudinary.com/v1_1/dizv2pxl0/auto/upload'

type cloudinaryReturn = {
  public_id: string
}

export const useFileUpload = () => {
  const uploadFile = async (file: File): Promise<cloudinaryReturn> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'project-sixstring-dev')
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })
    const data = response.json()
    return data
  }
  return uploadFile
}
