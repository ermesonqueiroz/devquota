export default function Sidebar() {
  return (
    <>
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="drawer" className="drawer-overlay" aria-label="Close menu"></label>
        <aside className="bg-base-100 min-h-screen w-[260px]">
          <h1 className="text-2xl px-4 navbar sticky tracking-tight font-medium">
            DevQuota
          </h1>
          <ul className="menu w-full px-4">
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path></svg>
                Horas
              </a>
            </li>
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="currentColor" viewBox="0 0 256 256"><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path></svg>
                Projetos
              </a>
            </li>
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="currentColor" viewBox="0 0 256 256"><path d="M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z"></path></svg>
                Clientes
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </>
  )
}
