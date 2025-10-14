# Knowledge-base Search Engine - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Utility-Focused)

**Rationale:** This is a productivity tool where efficiency, clarity, and information hierarchy are paramount. Drawing inspiration from Linear's minimalist precision, Notion's document handling, and Perplexity's answer presentation.

**Core Principles:**
- Search-first interface with minimal distractions
- Clear information hierarchy for answers and sources
- Professional, trustworthy aesthetic for knowledge work
- Efficient document management workflows

---

## Color Palette

**Dark Mode (Primary):**
- Background: 222 15% 8% (deep charcoal)
- Surface: 222 15% 12% (elevated cards)
- Border: 222 10% 20% (subtle divisions)
- Primary: 220 90% 60% (vibrant blue for CTAs)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 65%
- Success: 142 70% 50% (document upload success)
- Accent: 270 75% 65% (AI-generated answer highlight)

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Border: 220 10% 85%
- Primary: 220 90% 50%
- Text Primary: 222 15% 15%
- Text Secondary: 222 10% 45%

---

## Typography

**Font Families:**
- Primary: 'Inter', system-ui, sans-serif (clean, readable)
- Mono: 'JetBrains Mono', monospace (for document names, metadata)

**Scale:**
- Hero/Page Title: text-4xl font-bold (36px)
- Section Headers: text-2xl font-semibold (24px)
- Answer Text: text-lg leading-relaxed (18px, generous line-height)
- Body/UI: text-base (16px)
- Metadata/Labels: text-sm text-secondary (14px)
- Code/Technical: text-sm font-mono (14px monospace)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 12 for consistent rhythm
- Micro spacing: p-2, gap-2
- Standard spacing: p-4, gap-4, m-4
- Section spacing: p-6, py-6
- Large sections: p-12, py-12

**Container Strategy:**
- Main content: max-w-4xl mx-auto (optimized for reading answers)
- Search bar: max-w-2xl mx-auto (focused, centered)
- Document grid: max-w-6xl mx-auto (wider for card layouts)

---

## Component Library

### 1. Header/Navigation
- Minimal top bar with logo/title on left
- Document count indicator (e.g., "12 documents indexed")
- Upload button (primary action) on right
- Sticky positioning for persistent access
- Height: h-16, with border-b

### 2. Search Interface (Hero Section)
- Centered search input as primary focal point
- Large search box: h-14 with rounded-lg borders
- Placeholder: "Ask anything about your documents..."
- Search icon on left, optional voice input icon on right
- Submit button integrated or Enter key submission
- Subtle shadow on focus: ring-2 ring-primary
- No large hero image - keep focus on functionality

### 3. Document Upload Area
- Drag-and-drop zone with dashed border (border-dashed border-2)
- Icon: Upload cloud icon (from Heroicons)
- States: Default, Hover (bg-surface-hover), Dragging (border-primary), Uploading (progress indicator)
- Supported formats badge: "PDF, TXT, DOCX"
- File size limit display: "Max 10MB per file"
- Success state: Green checkmark with filename

### 4. Document Management Grid
- Card-based layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
- Each card shows:
  - Document icon (file type specific)
  - Filename (truncated with tooltip)
  - File size and upload date (text-sm text-secondary)
  - Delete action (hover-reveal, destructive red)
- Card styling: bg-surface border rounded-lg p-4
- Hover state: subtle elevation with shadow

### 5. Answer Display
- Prominent answer card with distinct visual treatment
- Card structure:
  - AI indicator badge: "AI Generated Answer" with accent color
  - Answer text: Large, readable typography (text-lg leading-relaxed)
  - Source references section below answer
  - Regenerate button if needed
- Styling: bg-surface border-l-4 border-l-accent rounded-lg p-6
- Animation: Subtle fade-in on answer generation

### 6. Source References
- Compact list below each answer
- Each source shows:
  - Document name with file icon
  - Relevant excerpt (2-3 lines, italic, text-secondary)
  - Expandable for full context
- Layout: Stacked cards with gap-2
- Hover: Slight bg change to indicate clickability

### 7. Loading States
- Search query: Pulsing dots or skeleton loader
- Document upload: Linear progress bar with percentage
- Answer generation: Animated gradient background with "Analyzing documents..." text
- Spinner style: Simple rotating circle (from Heroicons)

### 8. Empty States
- No documents: Large upload icon with "Upload your first document to begin"
- No search results: "No relevant information found" with suggestion to refine query
- All states use centered layout with icon + text + CTA

### 9. Error States
- Upload errors: Red banner with error message and retry action
- Search errors: Inline message below search box
- Network errors: Toast notification (top-right)

---

## Animations

**Minimal & Purposeful:**
- Search focus: Smooth ring expansion (transition-all duration-200)
- Answer appearance: Fade-in only (opacity 0 to 1, duration-300)
- Card hover: Subtle scale (scale-[1.01]) and shadow transition
- No scroll animations, parallax, or decorative motion

---

## Icons

**Library:** Heroicons (via CDN)
- Search: MagnifyingGlassIcon
- Upload: CloudArrowUpIcon
- Document: DocumentTextIcon
- Delete: TrashIcon
- AI/Answer: SparklesIcon or LightBulbIcon
- Close: XMarkIcon

---

## Page Layout Structure

1. **Header** (h-16, sticky top-0)
2. **Search Section** (py-12, centered max-w-2xl)
3. **Answer Display Area** (max-w-4xl, conditional visibility)
4. **Document Management** (py-8, max-w-6xl, grid layout)
5. **Footer** (py-6, minimal, centered text-sm with GitHub link)

---

## Images

**No Hero Image:** This is a utility-first application - the search box IS the hero element. Keep the interface clean and functional without decorative imagery. Focus visual attention on the search input and answer display.

---

## Key UX Patterns

- **Progressive disclosure:** Show document upload area collapsed until needed
- **Instant feedback:** Real-time upload progress, immediate search response indicators
- **Clear hierarchy:** Search > Answer > Sources > Documents
- **Keyboard shortcuts:** Enter to search, Cmd/Ctrl+K to focus search
- **Persistent context:** Show number of indexed documents at all times

This design creates a focused, professional knowledge search tool that prioritizes speed, clarity, and efficient information retrieval.