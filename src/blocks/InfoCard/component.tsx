// import RenderIcon from '@/fields/IconSelector/RenderIcon'
import RichText from '@/components/RichText'
import AnimationType from '@/fields/Animation/types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import dynamic from 'next/dynamic'

const RenderIcon = dynamic(() => import('@/fields/IconSelector/RenderIcon'))

export interface InfoCardBlockProps {
  icon: any
  title: string
  text: SerializedEditorState
  animation?: AnimationType
}

const InfoCardBlock: React.FC<InfoCardBlockProps> = ({ icon, title, text }) => {
  return (
    <div
      key={title}
      className="h-full bg-card p-8 rounded-2xl shadow-uniform prose-h2:mb-0 prose-h2:mt-0"
    >
      <div className="flex gap-2 items-center mb-6">
        <RenderIcon icon={icon} />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="flex flex-col gap-4 text-lg font-body">
        <RichText data={text} enableProse={true} enableGutter={false} />
      </div>
    </div>
  )
}

export default InfoCardBlock
