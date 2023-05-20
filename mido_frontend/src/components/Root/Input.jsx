

const Input = ({ type, value, onChange, placeholder, name, label }) => {
    return (
        <>
            <label htmlFor={name} className='text-xs text-gray-700'>{label}</label>
            <input 
                className='py-2 px-4 mb-3 bg-gray-50 text-sm text-gray-700 border border-gray-300 rounded-md leading-tight focus:bg-white focus:outline-none'
                placeholder={placeholder}
                type={type}
                name={name} 
                id={name} 
                value={value} 
                required
                onChange={onChange} 
            />
        </>
        
    )
}

export default Input