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
import AnimatedBlockWrapper from '@/fields/Animation/AnimatedBlockWrapper'

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
      <AnimatedBlockWrapper animation={node.fields.animation as any}>
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      </AnimatedBlockWrapper>
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,

    cta: ({ node }) => <CallToActionBlock {...node.fields} />,

    formBlock: ({ node }: { node: SerializedBlockNode<FormBlockType> }) => (
      <AnimatedBlockWrapper animation={node.fields.animation as any}>
        <FormBlock {...node.fields} />
      </AnimatedBlockWrapper>
    ),

    googleMap: ({ node }: { node: SerializedBlockNode<GoogleMapBlockProps> }) => (
      <AnimatedBlockWrapper animation={node.fields.animation as any}>
        <GoogleMap {...node.fields} enableContainer={false} />
      </AnimatedBlockWrapper>
    ),

    infoCardBlock: ({ node }: { node: SerializedBlockNode<InfoCardBlockProps> }) => (
      <AnimatedBlockWrapper animation={node.fields.animation as any}>
        <InfoCardBlock {...node.fields} />
      </AnimatedBlockWrapper>
    ),
    imageLinkBlock: ({ node }: { node: SerializedBlockNode<ImageLinkBlockProps> }) => (
      <AnimatedBlockWrapper animation={node.fields.animation as any}>
        <ImageLinkBlock {...node.fields} />
      </AnimatedBlockWrapper>
    ),
    imageWithTextOverlayBlock: ({
      node,
    }: {
      node: SerializedBlockNode<ImageWithTextOverlayBlockProps>
    }) => (
      <AnimatedBlockWrapper animation={node.fields.animation as any}>
        <ImageWithTextOverlayBlock {...node.fields} />
      </AnimatedBlockWrapper>
    ),

    staffImageSpielBlock: ({ node }: { node: SerializedBlockNode<StaffImageSpielBlockProps> }) => (
      <AnimatedBlockWrapper animation={node.fields.animation as any}>
        <StaffImageSpielBlock {...node.fields} />
      </AnimatedBlockWrapper>
    ),

    subscriptionPlanBlock: ({
      node,
    }: {
      node: SerializedBlockNode<SubscriptionPlanBlockProps>
    }) => (
      <AnimatedBlockWrapper animation={node.fields.animation as any}>
        <SubscriptionPlanBlock {...node.fields} />
      </AnimatedBlockWrapper>
    ),
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
