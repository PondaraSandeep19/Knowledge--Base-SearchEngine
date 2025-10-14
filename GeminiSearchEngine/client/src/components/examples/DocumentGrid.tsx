import DocumentGrid from '../DocumentGrid'

export default function DocumentGridExample() {
  const mockDocuments = [
    { id: '1', filename: 'employee_handbook.pdf', fileSize: '2.4 MB', uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
    { id: '2', filename: 'technical_specs.txt', fileSize: '128 KB', uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 5) },
    { id: '3', filename: 'project_requirements.docx', fileSize: '1.8 MB', uploadDate: new Date(Date.now() - 1000 * 60 * 30) },
  ]

  return (
    <DocumentGrid
      documents={mockDocuments}
      onDeleteDocument={(id) => console.log('Delete document:', id)}
    />
  )
}
