import { getSettings } from '@/Globals/Settings/Component'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { Fragment } from 'react'

const Favicon = async ({ head }: { head?: boolean }) => {
  const settings = await getSettings()

  const { favicon } = settings

  if (head) {
    return (
      <Fragment>
        <link href={(favicon as Media)?.url ?? '/favicon.ico'} rel="icon" sizes="32x32" />
        <link href={(favicon as Media)?.url ?? '/favicon.svg'} rel="icon" type="image/svg+xml" />
      </Fragment>
    )
  }

  return (
    <Image
      alt="Payload Logo"
      width={193}
      height={34}
      decoding="async"
      src={(favicon as Media)?.url ?? '/favicon.svg'}
    />
  )
}

export default Favicon
