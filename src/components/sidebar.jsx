import { useContext } from "react";
import { navItems,collapsedNavItems } from "../utils/constants"
import { Link } from "react-router-dom";
import { SidebarContext } from "../context/sidebar-context";

const Sidebar = () => {

  // SidebarContext İLE 
  const {isCollapsed}=useContext(SidebarContext)



  // navbar küçükse
  if (isCollapsed) {
    return  <aside className="w-20 h-[calc(100vh-56px)] overflow-auto sticky top-14  " >
      <div className="py-y-3">
          {collapsedNavItems.map((item, key) => (
            <Link
              to={item.path}
              key={key}
              className="flex flex-col items-center justify-center py-4 px-2 mx-2 rounded-lg transition hover:bg-grey"
            >
              <span className="text-xl mb-2">{item.icon}</span>
              <span className="text-[10px] text-center leading-tight">{item.name}</span>
            </Link>
          ))}

        

      </div>
    </aside>
  }


  
  return (
    <>

      <div className='w-20 max-sm:hidden' ></div>

      <aside className='w-60 h-[calc(100vh-56px)] overflow-y-auto fixed top-14 bg-black ' >
        
        <div className='py-3' >
          {navItems.map((category,key)=>(<div key={key} className="border-b border-grey p-4 px-3" >

            { category.title && <h2 className="font-semibold mb-2"  > {category.title} </h2>}

            <div>
              {category.items.map((item,key)=> <Link to={item.path} key={key} className="flex gap-6
              items-center p-2 hover-bg-[#272727] rounded-lg "   >

              <span className="text-xl" > {item.icon} </span>
              <span className="whitespace-nowrap" > {item.name} </span>
        
              
              </Link> )}
            </div>


          </div>))}
        </div>
        </aside>

    </>

  )
}

export default Sidebar
