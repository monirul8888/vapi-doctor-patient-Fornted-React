export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="mt-2 block text-xs font-medium text-slate-400">{hint}</span>}
    </label>
  )
}

export function TextInput({ label, hint, ...props }) {
  return (
    <Field label={label} hint={hint}>
      <input className="input-field" {...props} />
    </Field>
  )
}
