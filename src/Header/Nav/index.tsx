import React from 'react'
import type { Header as HeaderType, Media, Setting } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Search } from '@/search/Component'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  const pathname = usePathname()

  return (
    <nav className="gap-x-6 items-center hidden lg:flex flex-wrap">
      {navItems.map((item, i) => {
        // Standard link
        if (item.itemType === 'standard') {
          return (
            <CMSLink
              key={i}
              {...item.link}
              // appearance="secondary"
              className={clsx(
                `font-header hover:transform hover:transition-transform hover:duration-500 hover:ease-in-out hover:animate-swoosh-up text-foreground min-w-max
                hover:text-primary transition-colors`,
              )}
            />
          )
        }

        // Dropdown Menu
        if (item.itemType === 'dropdown' && item.dropdown) {
          return (
            <div key={i} className="group relative">
              <CMSLink
                {...item.dropdown.link}
                className="hover:text-primary transition-colors cursor-pointer text-foreground flex items-center gap-1 font-header group-hover:transform group-hover:transition-transform group-hover:duration-500 group-hover:ease-in-out group-hover:animate-swoosh-up"
              >
                <ChevronDown className="group-hover:rotate-180 transition-transform" />{' '}
              </CMSLink>
              <div className="absolute hidden group-hover:flex bg-background shadow-lg p-4 py-6 rounded-lg w-max flex-col gap-2">
                {item.dropdown.children?.map((child, j) => (
                  <CMSLink
                    key={j}
                    {...child.link}
                    className="font-header bg-card hover:bg-primary hover:text-primary-foreground py-3 px-6 rounded-lg text-card-foreground"
                  />
                ))}
              </div>
            </div>
          )
        }

        // Mega Menu
        if (item.itemType === 'mega' && item.mega) {
          return (
            <div key={i} className="group">
              <span className="hover:text-primary transition-colors cursor-pointer text-foreground flex items-center gap-1 font-header group-hover:transform group-hover:transition-transform group-hover:duration-500 group-hover:ease-in-out group-hover:animate-swoosh-up">
                {item.mega.label}{' '}
                <ChevronDown className="group-hover:rotate-180 transition-transform" />{' '}
              </span>
              {/* Mega Menu Content */}
              <div className="container absolute left-1/2 -translate-x-1/2 z-[1] hidden group-hover:flex bg-background shadow-lg p-6 w-full flex-col gap-6 rounded-lg border">
                <div className="grid grid-cols-3 gap-6">
                  {item.mega.children?.map((megaChild, k) => {
                    // Mega Standard Section
                    if (megaChild.type === 'standard' && megaChild.standard) {
                      return (
                        <div
                          key={k}
                          className="flex flex-col items-start gap-2 bg-card p-8 rounded-lg hover:border border-border transition-colors"
                        >
                          {megaChild.standard.image && (
                            <Image
                              src={(megaChild.standard.image as Media).url as string}
                              alt="Mega Image"
                              className="w-16 h-16 object-cover"
                              width={64}
                              height={64}
                            />
                          )}
                          <CMSLink
                            {...megaChild.standard.link}
                            appearance="link"
                            className="text-card-foreground font-header my-4 text-2xl hover:text-primary"
                          />
                          <p className="text-base text-card-foreground">
                            {megaChild.standard.text}
                          </p>
                        </div>
                      )
                    }

                    // Mega Group Section
                    if (megaChild.type === 'group' && megaChild.group) {
                      return (
                        <div
                          key={k} // Ensure key is placed on the outermost element for correct reconciliation
                          className="bg-card p-8 rounded-lg hover:border border-border transition-colors"
                        >
                          <CMSLink
                            {...megaChild.group.link}
                            className="flex flex-col gap-2 group/mega text-card-foreground border-b pb-4"
                            hideLabel
                          >
                            <div className="">
                              <div className="flex gap-4">
                                {megaChild.group.image && (
                                  <div className="w-12 h-12 relative mb-4">
                                    <Image
                                      src={(megaChild.group.image as Media).url as string}
                                      alt="Group Mega Image"
                                      className="object-cover fill-gray-600 rounded-full"
                                      fill
                                    />
                                  </div>
                                )}
                                <div className="rounded-full w-12 h-12 flex justify-center items-center bg-white group-hover/mega:bg-primary relative overflow-hidden">
                                  <ArrowUpRight
                                    size={35}
                                    className="group-hover/mega:transform group-hover/mega:transition-transform group-hover/mega:duration-500 group-hover/mega:ease-in-out group-hover/mega:animate-swoosh stroke-black group-hover/mega:stroke-primary-foreground"
                                  />
                                </div>
                              </div>
                            </div>

                            <p className="font-header text-2xl font-semibold pt-2">
                              {megaChild.group.link.label}
                            </p>
                          </CMSLink>

                          <div className="flex flex-col gap-1 pt-4">
                            {megaChild.group.children?.map((groupChild, m) => (
                              <CMSLink
                                key={m} // Key is now correctly applied to individual children
                                {...groupChild.link}
                                className="text-base text-card-foreground hover:underline font-header hover:text-primary"
                              />
                            ))}
                          </div>
                        </div>
                      )
                    }

                    return null
                  })}
                </div>
              </div>
            </div>
          )
        }

        return null
      })}
    </nav>
  )
}
