import './GlassCard.css'

function GlassCard({children}) {
  return (
    <div className='glass-card col-10 col-md-9 col-lg-5 p-3'>
      {children}
    </div>
  )
}

export default GlassCard
