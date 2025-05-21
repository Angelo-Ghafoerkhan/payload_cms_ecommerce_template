import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import ImageWithTextOverlayBlock, {
  ImageWithTextOverlayBlockProps,
} from '@/blocks/ImageWithOverlayText'
import SubscriptionPlanBlock, {
  SubscriptionPlanBlockProps,
} from '@/blocks/SubscriptionPlanBlock/Component'
import InfoCardBlock, { InfoCardBlockProps } from '@/blocks/InfoCard/component'
import ImageLinkBlock, { ImageLinkBlockProps } from '@/blocks/ImageLink'
import StaffImageSpielBlock, {
  StaffImageSpielBlockProps,
} from '@/blocks/StaffImageSpielBlock/component'
import { GoogleMap, GoogleMapBlockProps } from '@/blocks/GoogleMap/component'
import { FormBlock, FormBlockType } from '@/blocks/Form/Component'
import ContactSection from '@/blocks/ContactSection/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | ImageWithTextOverlayBlockProps
      | SubscriptionPlanBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,

    cta: ({ node }) => <CallToActionBlock {...node.fields} />,

    formBlock: ({ node }: { node: SerializedBlockNode<FormBlockType> }) => (
      <FormBlock {...node.fields} />
    ),

    googleMap: ({ node }: { node: SerializedBlockNode<GoogleMapBlockProps> }) => (
      <GoogleMap {...node.fields} enableContainer={false} />
    ),

    infoCardBlock: ({ node }: { node: SerializedBlockNode<InfoCardBlockProps> }) => (
      <InfoCardBlock {...node.fields} />
    ),
    imageLinkBlock: ({ node }: { node: SerializedBlockNode<ImageLinkBlockProps> }) => (
      <ImageLinkBlock {...node.fields} />
    ),
    imageWithTextOverlayBlock: ({
      node,
    }: {
      node: SerializedBlockNode<ImageWithTextOverlayBlockProps>
    }) => <ImageWithTextOverlayBlock {...node.fields} />,

    staffImageSpielBlock: ({ node }: { node: SerializedBlockNode<StaffImageSpielBlockProps> }) => (
      <StaffImageSpielBlock {...node.fields} />
    ),

    subscriptionPlanBlock: ({
      node,
    }: {
      node: SerializedBlockNode<SubscriptionPlanBlockProps>
    }) => <SubscriptionPlanBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert h-full': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
