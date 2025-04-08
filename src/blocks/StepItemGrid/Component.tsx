import RichText from '@/components/RichText'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

interface StepItem {
  richText: SerializedEditorState<SerializedLexicalNode> // Replace `any` with the actual type of `richText` if known
}

interface StepItemGridProps {
  items: StepItem[]
}

const StepItemGrid: React.FC<StepItemGridProps> = ({ items }) => {
  return (
    <section className="container grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
      {items.map((item, index) => {
        const displayIndex = (index + 1).toString().padStart(2, '0')
        return (
          <div key={index} className="flex flex-col">
            <p className="text-5xl mb-2 font-body text-transparent [-webkit-text-stroke:1px_hsl(var(--primary))] font-black">
              {displayIndex}
            </p>
            <RichText
              data={item.richText}
              className="bg-card rounded-2xl shadow-uniform p-6 grow"
              enableGutter={false}
            />
          </div>
        )
      })}
    </section>
  )
}

export default StepItemGrid
