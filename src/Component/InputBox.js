
export function InputBox({ label, placeholder, onChange }) {
  return <div>
    <div className="text-sm font-medium text-left">
      {label}
    </div>
    <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-0 border rounded border-slate-200" />
  </div>
}