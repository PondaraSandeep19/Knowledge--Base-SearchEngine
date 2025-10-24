import AnswerDisplay from '../AnswerDisplay'

export default function AnswerDisplayExample() {
  return (
    <AnswerDisplay
      answer="Based on your documents, employees receive 20 days of paid vacation per year. Full-time employees get the complete allocation, while part-time employees receive prorated days. All vacation requests should be submitted at least 2 weeks in advance for approval."
      sources={[
        {
          documentName: "employee_handbook.pdf",
          excerpt: "Our vacation policy allows 20 days per year...",
          fullContext: "Our vacation policy allows 20 days per year for full-time employees. Part-time employees receive prorated vacation days based on their hours worked."
        },
        {
          documentName: "hr_policies.txt",
          excerpt: "All vacation requests must be submitted 2 weeks in advance..."
        }
      ]}
      onRegenerate={() => console.log('Regenerate clicked')}
    />
  )
}
