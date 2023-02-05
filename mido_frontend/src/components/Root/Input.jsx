

const Input = ({ type, value, onChange, placeholder, name }) => {
    return (
        <input 
            className='py-2 px-4 my-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
            placeholder={placeholder}
            type={type}
            name={name} 
            value={value} 
            required
            onChange={onChange} 
        />
    )
}

export default Input