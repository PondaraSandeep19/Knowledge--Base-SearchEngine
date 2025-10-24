import SourceReference from '../SourceReference'

export default function SourceReferenceExample() {
  return (
    <div className="space-y-2 max-w-4xl">
      <SourceReference
        documentName="company_handbook.pdf"
        excerpt="Our vacation policy allows 20 days per year..."
        fullContext="Our vacation policy allows 20 days per year for full-time employees. Part-time employees receive prorated vacation days based on their hours worked. All vacation requests must be submitted at least 2 weeks in advance."
      />
      <SourceReference
        documentName="technical_specs.txt"
        excerpt="The maximum upload size is 10MB per file..."
      />
    </div>
  )
}
