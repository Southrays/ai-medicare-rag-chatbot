import mark from '../assets/medicare-mark.svg'

export default function Brand() {
  return (
    <div className="brand">
      <img src={mark} alt="" className="brand-mark" />
      <div>
        <div className="brand-name">AI Medicare</div>
        <div className="brand-subtitle">Your AI Medical Assistant</div>
      </div>
    </div>
  )
}