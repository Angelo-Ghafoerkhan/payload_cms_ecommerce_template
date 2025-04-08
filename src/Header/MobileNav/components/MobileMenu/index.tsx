'use client'

import { FC, useState } from 'react'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'
import { ChevronDown } from 'lucide-react'

const MobileMenu: FC<{ close: () => void; header: HeaderType }> = ({ close, header }) => {
  const navItems = header?.navItems || []

  // State to track which dropdown or mega menu is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Toggle function for dropdown or mega menu
  const toggleMenu = (itemId: string) => {
    if (openDropdown === itemId) {
      setOpenDropdown(null) // Close the menu if it's already open
    } else {
      setOpenDropdown(itemId) // Open the menu
    }
  }

  return (
    <nav className="container flex lg:hidden flex-col font-normal w-full max-w-[500px]">
      {navItems.map(({ itemType, dropdown, mega, link }, i) => {
        // Standard link
        if (itemType === 'standard') {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="text-lg text-primary-foreground hover:text-secondary py-3"
              onClick={() => close()}
            />
          )
        }

        // Dropdown Menu
        if (itemType === 'dropdown' && dropdown) {
          return (
            <div key={i} className="flex flex-col">
              <div
                onClick={() => toggleMenu(`dropdown-${i}`)}
                className="flex items-center justify-between cursor-pointer text-lg text-white hover:text-secondary py-2"
              >
                <CMSLink
                  {...dropdown.link}
                  className="text-lg text-primary-foreground hover:text-secondary"
                  appearance="link"
                />
                <ChevronDown
                  className={`transform transition-transform ${openDropdown === `dropdown-${i}` ? 'rotate-180' : ''}`}
                />
              </div>

              {openDropdown === `dropdown-${i}` && (
                <div className="pl-4 flex flex-col">
                  {dropdown.children?.map((child, j) => (
                    <CMSLink
                      key={j}
                      {...child.link}
                      appearance="link"
                      className="text-lg text-primary-foreground hover:text-secondary py-2"
                      onClick={() => close()}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        }

        // Mega Menu
        if (itemType === 'mega' && mega) {
          return (
            <div key={i} className="flex flex-col py-2">
              <div
                onClick={() => toggleMenu(`mega-${i}`)}
                className="flex items-center justify-between cursor-pointer text-lg text-white hover:text-secondary py-2"
              >
                <span className="font-semibold">{mega.label}</span>
                <ChevronDown
                  className={`transform transition-transform ${openDropdown === `mega-${i}` ? 'rotate-180' : ''}`}
                />
              </div>
              {openDropdown === `mega-${i}` && (
                <div className="pl-4 flex flex-col">
                  {mega.children?.map((megaChild, k) => {
                    // Mega Standard Section
                    if (megaChild.type === 'standard' && megaChild.standard) {
                      return (
                        <div key={k} className="flex items-start gap-4 py-2">
                          <CMSLink
                            {...megaChild.standard.link}
                            appearance="link"
                            className="text-lg text-white hover:text-secondary"
                            onClick={() => close()}
                          />
                        </div>
                      )
                    }

                    // Mega Group Section
                    if (megaChild.type === 'group' && megaChild.group) {
                      return (
                        <div key={k} className="py-2 rounded-lg">
                          <CMSLink
                            {...megaChild.group.link}
                            appearance="link"
                            className="flex flex-col gap-4 text-primary-foreground"
                            onClick={() => close()}
                            hideLabel
                          >
                            <p className="font-semibold pt-2 text-lg">
                              {megaChild.group.link.label}
                            </p>
                          </CMSLink>
                          <div className="flex flex-col gap-1 pt-4">
                            {megaChild.group.children?.map((groupChild, m) => (
                              <CMSLink
                                key={m}
                                {...groupChild.link}
                                appearance="link"
                                className="text-lg text-white py-2"
                                onClick={() => close()}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    }

                    return null
                  })}
                </div>
              )}
            </div>
          )
        }

        return null
      })}
    </nav>
  )
}

export default MobileMenu
