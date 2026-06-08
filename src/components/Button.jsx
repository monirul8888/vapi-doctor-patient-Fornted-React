export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger'
  }[variant]

  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  )
}
