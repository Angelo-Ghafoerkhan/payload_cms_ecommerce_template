import clsx from 'clsx'

interface ItemLoaderShimmerProps {
  className?: string
  width?: number
  height?: number
}

const ItemLoaderShimmer: React.FC<ItemLoaderShimmerProps> = ({ className, width, height }) => {
  return (
    <div
      className={clsx('animated-background', className)}
      style={{ width: width, height: height }}
    />
  )
}

export default ItemLoaderShimmer
