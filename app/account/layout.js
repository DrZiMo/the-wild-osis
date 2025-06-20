import SideNavigation from '../_components/SideNavigation'

export default function Layout({ children }) {
  return (
    <div className='h-full grid grid-cols-[16rem_1fr] gap-12'>
      <SideNavigation />
      <div>{children}</div>
    </div>
  )
}
