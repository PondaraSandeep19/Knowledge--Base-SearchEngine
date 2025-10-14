import DocumentUpload from '../DocumentUpload'

export default function DocumentUploadExample() {
  return (
    <DocumentUpload
      onFileSelect={(files) => console.log('Files selected:', files)}
    />
  )
}
