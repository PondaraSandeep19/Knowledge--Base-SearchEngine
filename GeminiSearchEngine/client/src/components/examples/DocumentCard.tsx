import DocumentCard from '../DocumentCard'

export default function DocumentCardExample() {
  return (
    <div className="max-w-md">
      <DocumentCard
        id="1"
        filename="company_handbook.pdf"
        fileSize="2.4 MB"
        uploadDate={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)}
        onDelete={(id) => console.log('Delete document:', id)}
      />
    </div>
  )
}
