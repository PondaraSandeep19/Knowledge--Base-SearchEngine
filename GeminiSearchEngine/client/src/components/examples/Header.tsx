import Header from '../Header'

export default function HeaderExample() {
  return (
    <Header 
      documentCount={12} 
      onUploadClick={() => console.log('Upload clicked')} 
    />
  )
}
