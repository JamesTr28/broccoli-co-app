

const Header = (props) => {
  return (
    <div className='d-flex bg-success justify-items-start'>
        <h1 className='text-white px-2 py-2'> 
          { props.title } 
        </h1>           
    </div>
  )
}

export default Header