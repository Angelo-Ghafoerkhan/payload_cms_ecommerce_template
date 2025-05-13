interface TabsBlockProps {
  tabPosition: 'left' | 'middle' | 'right'
  tabs: Tab[]
}

type Tab = {}

const TabsBlock: React.FC<TabsBlockProps> = () => {
  return (
    <div>
      <div>Tabs Block</div>
    </div>
  )
}

export default TabsBlock
